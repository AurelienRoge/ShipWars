/**** Import npm libs ****/

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql');
const session = require("express-session")({
    // CIR2-chat encode in sha256
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000, //24H
        secure: false
    }
});
const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');



/**** Import project libs ****/

const states = require('./back/modules/states');
const Theoden = require('./back/models/Theoden'); //jsp pourquoi je l'ai gardé mais ok



/**** Project configuration ****/

const jsonParser = bodyParser.json(); //inutilisé finalement
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Init of express, to point our assets
app.use(express.static(__dirname + '/front/'));
app.use(urlencodedParser);
app.use(session);

// Configure socket io with session middleware
io.use(sharedsession(session, {
    // Session automatiquement sauvegardée en cas de modification
    autoSave: true
}));

// Détection de si nous sommes en production, pour sécuriser en https
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    session.cookie.secure = true // serve secure cookies
}


/**** Config BDD ****/
//init bdd
const batNavSQL = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "batnav"
})

//verif accès au lancement
batNavSQL.connect( err => {
    if (err) throw err;
    else console.log('Connexion à la base de donnée OK');
})

/**** Code ****/

app.get('/', (req, res) => {
    let sessionData = req.session;

    // Test des modules 
    states.printServerStatus();
    states.printProfStatus();
    let test = new Theoden();

    // Si l'utilisateur n'est pas connecté
    if (!sessionData.username) {
        res.sendFile(__dirname + '/front/html/login.html');
    } else {
        res.sendFile(__dirname + '/front/html/index.html');
    }
});

//login
app.post('/login', body('login'), (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    console.log("combinaison connexion test:",login,password);

    // Error management
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        //return res.status(400).json({ errors: errors.array() });
    } else {
        //Test des mdps
        let userExist = false; //si user existe
        batNavSQL.query("SELECT * FROM tab", function (err, result, fields) {
            if (err) throw err;
            let superi;
            for(i = 0; i < result.length; i++){//on trouve l'user
                if(result[i].User == login){
                    userExist = true;
                    superi = i;
                }
            }
            if(userExist){
                if(result[superi].MDP == password){ // l'user a le bon mdp
                    console.log("bonne combinaison");
                    req.session.username = login;
                    req.session.password = password;
                    req.session.save();
                    res.redirect('/');
                }
                else{
                    console.log("mauvaise combinaison user/mdp")
                }
            }
            else{
                console.log("cet utilisateur n'existe pas")
            }
        });
    }
});

//register
app.post('/register', body('register'), (req, res) => {
    const Rlogin = req.body.Rlogin;
    const Rpassword = req.body.Rpassword;
    const Rpassword2 = req.body.Rpassword2;
    console.log("combinaison inscription:",Rlogin,Rpassword,Rpassword2);

    // Error management
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Erreur validation');
        //return res.status(400).json({ errors: errors.array() });
    } else {
        //Test des mdps si les 2 inscrits sont ==
        if(Rpassword == Rpassword2){
            //verif si username déjà utilisé
            used = false;
            batNavSQL.query("SELECT * FROM tab", function (err, result, fields) {
                if (err) throw err;
                for(i = 0; i < result.length; i++){
                    if(result[i].User == Rlogin){ // /!\
                        used = true; 
                    }
                }

            //envois de l'insc seulement si username unused
            if(used == false){
                let sql = "INSERT INTO tab ( User, MDP, NbVic ) VALUES (?,?,0)";
                batNavSQL.query(sql,[Rlogin, Rpassword], (err, result) => {
                    if (err) throw err;
                    console.log("Nouveau utilisateur enregistré");
                    console.log(result);
                })
            }
            else{
                console.log("Nom d'utilisateur déjà prit ):");
            }
            });
        }
        else{
            console.log('MDPs non égaux');
        }
    }
});
//certaines interactions SQL peuvent être mieux optimisés mais bon


///*
io.on('connection', (socket) => {
    console.log('Quelqu\'un s\'est connecté');

    socket.on("login", () => {
        let srvSockets = io.sockets.sockets;
        srvSockets.forEach(user => {
            console.log(user.handshake.session.username);
        });
        io.emit('new-message', 'Utilisateur ' + socket.handshake.session.username + ' vient de se connecter');
    });

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        //Envoie le message pour tous!
        io.emit('new-message', socket.handshake.session.username + ' : ' + msg);
        //Autre alternative : envoyer le message à tous les autres socket ormis celui qui envoie
        //socket.broadcast.emit('new-message', msg);
    });

    socket.on('disconnect', () => {
        io.emit('new-message', 'Serveur : Utilisateur ' + socket.handshake.session.username + ' vient de se déconnecter');
        console.log('Quelqu\'un s\'est déconnecté');
    });
});
//*/

http.listen(4200, () => {
    console.log('Serveur lancé sur le port 4200');
});