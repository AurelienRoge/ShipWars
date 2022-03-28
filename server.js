const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)
let shipWarsGame = require('./js/back/ShipWarsGame.js')

let users = {}
let gameIdCounter = 1;

app.use(express.static(__dirname))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});



io.on('connection', function (socket) {
  console.log('a user connected.');

  //Création d'objet user pour des données en plus
  users[socket.id] = {
    inGame: null,
    player: null,
    opponent: null
  };

  // Rejoint la file d'attente jusqu'à trouver un adversaire
  socket.join('queue');


  //Requete de l'utilisateur pour quitter la partie
  socket.on('leave', function () {
    console.log("User left");
    if (users[socket.id].inGame !== null) {
      leaveGame(socket);

      socket.join('queue');
      joinWaitingPlayers();
    }
  });

  //Déconnexion de l'utilisateur
  socket.on('disconnect', function () {
    console.log('user disconnected');
    leaveGame(socket);
    delete users[socket.id];
  });


  //recevoir le tir du côté client
  socket.on('shot', function (index) {
    let game = users[socket.id].inGame;
    let opponent;

    //Si le joueur est dans une partie
    if (game !== null) {
      // Si c'est son tour
      if (game.getPlayerTurn() === users[socket.id].player) {
        opponent = game.getPlayerTurn() === 0 ? 1 : 0;
        currentPlayer = game.getPlayerTurn();
        //Si son arme est valide (=il a encore une charge dedans)
        if (!game.getPlayer(users[socket.id].player).isWeaponUsed(game.getPlayer(users[socket.id].player).getAttackMode())) {
          if (!game.isGameFinished()) {
            game.playerAttack(index, game.getGameMap(opponent));

            // Update game grids on both clients
            io.to(game.getPlayerId(currentPlayer)).emit('update', game.getSelfGridOnlyBoats(currentPlayer), game.getOpponentGridWithShipsHidden(currentPlayer), currentPlayer, game.getPlayerTurn());
            io.to(game.getPlayerId(opponent)).emit('update', game.getSelfGridOnlyBoats(opponent), game.getOpponentGridWithShipsHidden(opponent), opponent, game.getPlayerTurn());

            if (game.isGameFinished()) {
              checkGameOver(game);
            }
          }
        }

      }
    }
  });


  socket.on('changeWeapon', function (weapon) {
    let game = users[socket.id].inGame;
    //Si le joueur est dans une partie
    if (game !== null) {

      game.changeAttackMode(users[socket.id].player, weapon);
    }
  })

  joinWaitingPlayers();
});


//Création d'une partie pour les joueur en file d'attente
function joinWaitingPlayers() {
  let players = getClientsInRoom('queue');

  if (players.length >= 2) {
    // 2 joueurs en attente, on créer une partie
    let game = new shipWarsGame(gameIdCounter++, players[0], players[1]);
    // on créer une room pour la partie
    io.sockets.sockets.get(players[0]).leave('queue');
    io.sockets.sockets.get(players[1]).leave('queue');
    io.sockets.sockets.get(players[0]).join('game' + game.getGameId());
    io.sockets.sockets.get(players[1]).join('game' + game.getGameId());
    users[players[0]].player = 0;
    users[players[1]].player = 1;
    users[players[0]].opponent = 1;
    users[players[1]].opponent = 0;
    users[players[0]].inGame = game;
    users[players[1]].inGame = game;

    io.to('game' + game.getGameId()).emit('join', game.getGameId());

    // on envoit la position des bateaux
    io.to(players[0]).emit('update', game.getGameMap(0), game.getGrid(1, 0), 0, game.getPlayerTurn());
    io.to(players[1]).emit('update', game.getGameMap(1), game.getGrid(0, 1), 1, game.getPlayerTurn());

    console.log((new Date().toISOString()) + " " + players[0] + " and " + players[1] + " have joined game ID " + game.getGameId());
  }
}

//Trouve tous les sockets dans la file d'attente
function getClientsInRoom(room) {
  let clients = [];
  tmp = io.sockets.adapter.rooms.get(room).values();
  for (let id of io.sockets.adapter.rooms.get(room)) {
    clients.push(tmp.next().value);
  }
  return clients;
}

//Quitte la partie de l'utilisateur
function leaveGame(socket) {
  if (users[socket.id].inGame !== null) {
    console.log((new Date().toISOString()) + ' ID ' + socket.id + ' left game ID ' + users[socket.id].inGame.getGameId());

    if (users[socket.id].inGame.getGameStatus() !== 2) {
      // La partie n'est pas terminée, on l'annule
      console.log("Game aborted");
      users[socket.id].inGame.abortGame(users[socket.id].player);
      console.log("users[socket.id]");
      console.log(users[socket.id]);
      io.to(users[socket.id].inGame.getPlayerId(users[socket.id].opponent)).emit('gameover', users[socket.id].inGame.getWinner(), users[socket.id].inGame.getWinner());
      checkGameOver(users[socket.id].inGame);
    }

    socket.leave('game' + users[socket.id].inGame.getGameId());

    users[socket.id].inGame = null;
    users[socket.id].player = null;

    io.to(socket.id).emit('leave');
  }
}

//Notifie le joueur si la partie est terminée
function checkGameOver(game) {
  if (game.getGameStatus() === 2) {
    console.log((new Date().toISOString()) + ' Game ID ' + game.getGameId() + ' ended.');
    io.to(game.getWinner()).emit('gameover', game.getWinner(), game.getWinner());
    io.to(game.getLoser()).emit('gameover', game.getLoser(), game.getWinner());
  }
}


http.listen(4444, () => {
  console.log('Serveur lancé sur le port 4444');
});
