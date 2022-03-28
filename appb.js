

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require("express-session")({
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
})
app.set("view engine", "ejs")



const sharedsession = require("express-socket.io");
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');
const { Session } = require('inspector');
const res = require('express/lib/response');
const Pool = require('mysql/lib/Pool');

if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    session.cookie.secure = true
}

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "leaderboard"
});

var path = require('path');
const { Server } = require('http');
app.use(express.static(path.join(__dirname)));
app.get("/leaderboard.html", (req, res) => {
    let leaderboard = [];
    let Scoreboard = [];
    con.query("SELECT Pseudo as Pseudo, Score as Score FROM components ORDER BY Score DESC", (err, result) => {
        if (err) throw err;
        console.log(result);
        result.forEach(element => {
            leaderboard.push(element.Pseudo)
            Scoreboard.push(element.Score)
        });
        console.log(leaderboard);
        res.render(path.join(__dirname, "views", "leaderboard"), {
            top_1: leaderboard[0],
            S_1: Scoreboard[0],

            top_2: leaderboard[1],
            S_2: Scoreboard[1],

            top_3: leaderboard[2],
            S_3: Scoreboard[2],

            top_4: leaderboard[3],
            S_4: Scoreboard[3],

            top_5: leaderboard[4],
            S_5: Scoreboard[4],

            top_6: leaderboard[5],
            S_6: Scoreboard[5],

            top_7: leaderboard[6],
            S_7: Scoreboard[6],

            top_8: leaderboard[7],
            S_8: Scoreboard[7],

            top_9: leaderboard[8],
            S_9: Scoreboard[8],

            top_10: leaderboard[9],
            S_10: Scoreboard[9]

        });
    });
})
http.listen(3000, function () {
    console.log('Server Started. Listening on *:' + 3000);
});

app.get('/index.html', function (req, res) {
    res.sendFile('views/index.html', {
        root: __dirname
    });
});
app.get('/play.html', function (req, res) {
    res.sendFile('views/play.html', {
        root: __dirname
    });
});
app.get('/leaderboard.html', function (req, res) {
    res.sendFile('views/leaderboard.html', {
        root: __dirname
    });
});
app.get('/inscription.html', function (req, res) {
    res.sendFile('views/inscription.html', {
        root: __dirname
    });
});
