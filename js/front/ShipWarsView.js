class shipWarsView {
    constructor() {

        this.gridThisPlayer = new Array(100);

        this.gridFromOpponent = new Array(100);

        for (let i = 0; i < 100; i++) {
            this.gridThisPlayer[i] = "V";
        }
        for (let i = 0; i < 100; i++) {
            this.gridFromOpponent[i] = "V";
        }

        //On récupère les tableaux de l'html
        this.tabThisPlayer = new Array();
        for (let i = 0; i < 100; i++) {
            this.tabThisPlayer.push(document.getElementById("gametablePlayer0").getElementsByClassName("gametile")[i]);
        }
        this.tabOpponent = new Array();
        for (let i = 0; i < 100; i++) {
            this.tabOpponent.push(document.getElementById("gametablePlayer1").getElementsByClassName("gametile")[i]);
        }

        this.weaponButtons = new Array();
        for (let i = 0; i < 4; i++) {
            this.weaponButtons.push(document.getElementsByClassName("weaponBtn")[i])
        }


        //Initialisation des event listeners sur chaque case de chaque tableau
        this.EventListeners();
        this.linkTabToGraph();
    }


    //Pour ajouter les listeners de chaque case de chaque tableau
    EventListeners() {
        for (let i = 0; i < this.tabOpponent.length; i++) {
            this.tabOpponent[i].addEventListener('click', function () { sendShot(i) });
        }


        //Listeners des boutons des armes
        for (let i = 0; i < this.weaponButtons.length; i++) {
            this.weaponButtons[i].parent = this;
        }

        this.weaponButtons[0].addEventListener('click', function () { changeWeapon("Missile") });
        this.weaponButtons[1].addEventListener('click', function () { changeWeapon("Radar") });
        this.weaponButtons[2].addEventListener('click', function () { changeWeapon("Torpille") });
        this.weaponButtons[3].addEventListener('click', function () { changeWeapon("Bombe") });
    }

    //Fonction pour les actions du joueur 0 lorsqu'il clic sur une case du tableau adverse

    clickOnOpponentTabEvent(index) {
        sendShot(index);
        /*if (gameMapClickedOn.game.getPlayerTurn() == 1) {//Si c'est à son tour
            gameMapClickedOn.game.playerAttack(index, gameMapClickedOn.game.getGameMapPlayer1());//Effectuer l'attaque sur la case cliquée
            if (gameMapClickedOn.game.isGameFinished() == true) {//Si la partie est terminée
                console.log("Partie terminée");
            }
            gameMapClickedOn.parent.linkTabToGraph();//Mise à jour des textures
            console.log("Action effectuée");
        }*/
    }

    //Mise à jour des grilles suite à un envoi du serveur
    updateGrids(selfGrid, opponentGrid) {
        this.gridThisPlayer = selfGrid;
        this.gridFromOpponent = opponentGrid;
        console.log("selfGrid");
        console.log(selfGrid);
        console.log("Opponent Grid");
        console.log(opponentGrid);
    }

    //Fonction pour mettre à jour les textures
    linkTabToGraph() {
        for (let i = 0; i < 100; i++) {
            switch (this.gridThisPlayer[i]) {
                case "B":
                    this.tabThisPlayer[i].innerHTML = "B";
                    break;
                case "R":
                    this.tabThisPlayer[i].innerHTML = "R";
                    break;
                case "T":
                    this.tabThisPlayer[i].innerHTML = "T";
                    break;
                case "BR":
                    this.tabThisPlayer[i].innerHTML = "BR"
                    break;
                case "VR":
                    this.tabThisPlayer[i].innerHTML = "VR"
                    break;
            }
        }
        for (let i = 0; i < 100; i++) {
            switch (this.gridFromOpponent[i]) {
                case "R":
                    this.tabOpponent[i].innerHTML = "R";
                    break;
                case "T":
                    this.tabOpponent[i].innerHTML = "T";
                    break;
                case "BR":
                    this.tabOpponent[i].innerHTML = "BR"
                    break;
                case "VR":
                    this.tabOpponent[i].innerHTML = "VR"
                    break;
            }
        }

    }






    setGameOver() {
        /*if(isWinner) {// AMODIFIER
            $('#turn-status').removeClass('alert-opponent-turn').removeClass('alert-your-turn')
                    .addClass('alert-winner').html('You won! <a href="#" class="btn-leave-game">Play again</a>.');
          } else {
            $('#turn-status').removeClass('alert-opponent-turn').removeClass('alert-your-turn')
                    .addClass('alert-loser').html('You lost. <a href="#" class="btn-leave-game">Play again</a>.');
          }*/
        $('.btn-leave-game').click(sendLeaveRequest);
    }
}
