const socket = io.connect();
let view = new shipWarsView();


$(function() {
    //Connecté au serveur
    socket.on('connect', function() {
      console.log('Connected to server.');
      $('#disconnected').hide();
      $('#waiting-room').show();   
    });
  
    //Déconnecté du serveur
    socket.on('disconnect', function() {
      console.log('Disconnected from server.');
      $('#waiting-room').hide();
      $('#game').hide();
      $('#disconnected').show();
    });
  
    
    //Un utilisateur a rejoint la partie
    socket.on('join', function(gameId) {
      //view.game.resetGame();
      $('#disconnected').hide();
      $('#waiting-room').hide();
      $('#game').show();
      $('#game-number').html(gameId);
    })
  
    //Mise a jour du tour de jeu
    socket.on('update', function() {
      //view.game.changePlayerTurn();
      //view.linkTabToGraph();
    });
  
    //Fin de partie (AMODIFIER POUR FAIRE APPARAITRE DES ELEMENTS SUR L HTML)
    socket.on('gameover', function(isWinner) {
      //view.game.setGameOver(isWinner);
    });
    
    //Quitter la partie et retour en file d'attente
    socket.on('leave', function() {
      $('#game').hide();
      $('#waiting-room').show();
    });
  
    
  
  });
  
  //Envoie de la requête de quitter la partie (bouton de fin pour retourner en file d'attente)
  function sendLeaveRequest(e) {
    e.preventDefault();
    socket.emit('leave');
  }
  
  //Envoie des coordonnées du tir au serveur
  function sendShot(index) {
    socket.emit('shot', index);
  }
  