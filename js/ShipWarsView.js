class shipWarsView {
    constructor() {
        this.game = new shipWarsGame();//On créé une partie

        //On récupère les tableaux de l'html
        this.TilesTabPlayer0 = new Array();
        for (let i = 0; i < 100; i++) {
            this.TilesTabPlayer0.push(document.getElementById("gametablePlayer0").getElementsByClassName("gametile")[i]);
        }
        this.TilesTabPlayer1 = new Array();
        for (let i = 0; i < 100; i++) {
            this.TilesTabPlayer1.push(document.getElementById("gametablePlayer1").getElementsByClassName("gametile")[i]);
        }

        this.weaponButtons = new Array();
        for (let i = 0; i < 4; i++) {
            this.weaponButtons.push(document.getElementsByClassName("weaponBtn")[i]);
        }

        this.readyButton = document.getElementsByClassName("readyBtn")[0];
        console.log(this.readyButton);

        //Initialisation des event listeners sur chaque case de chaque tableau
        this.EventListeners();
        this.linkTabToGraph();
    }


    //Pour ajouter les listeners de chaque case de chaque tableau
    EventListeners() {
        for (let i = 0; i < this.TilesTabPlayer0.length; i++) {
            this.TilesTabPlayer0[i].addEventListener('click', this.tileOnClickEventPlayer0.bind(this.TilesTabPlayer0, this.TilesTabPlayer0[i], i));
            this.TilesTabPlayer0[i].game = this.game;
            this.TilesTabPlayer0[i].parent = this;

        }
        for (let i = 0; i < this.TilesTabPlayer1.length; i++) {
            this.TilesTabPlayer1[i].addEventListener('click', this.tileOnClickEventPlayer1.bind(this.TilesTabPlayer1, this.TilesTabPlayer1[i], i));
            this.TilesTabPlayer1[i].game = this.game;
            this.TilesTabPlayer1[i].parent = this;

        }


        //Listeners des boutons des armes
        for (let i = 0; i < this.weaponButtons.length; i++) {
            this.weaponButtons[i].parent = this;
        }

        this.weaponButtons[0].addEventListener('click', function () { this.parent.changeWeapon("Missile") });
        this.weaponButtons[1].addEventListener('click', function () { this.parent.changeWeapon("Radar") });
        this.weaponButtons[2].addEventListener('click', function () { this.parent.changeWeapon("Torpille") });
        this.weaponButtons[3].addEventListener('click', function () { this.parent.changeWeapon("Bombe") });

        this.readyButton.parent = this;
        this.readyButton.addEventListener('click', function () { this.parent.game.launchGame(); this.parent.linkTabToGraph() });
    }

    //Fonction pour les actions du joueur 0 lorsqu'il clic sur une case du tableau adverse
    tileOnClickEventPlayer0(gameMapClickedOn, index, TileClikedOn) {
        if (gameMapClickedOn.game.placementPhase) {
            //Ici il y aura les evenement de placement de bateau
        }
        else {
            if (gameMapClickedOn.game.getPlayerTurn() == 0) {//Si c'est à son tour
                gameMapClickedOn.game.playerAttack(index, gameMapClickedOn.game.getGameMapPlayer0());//Effectuer l'attaque sur la case cliquée
                if (gameMapClickedOn.game.isGameFinished() == true) {//Si la partie est terminée
                    console.log("Partie terminée");
                }
                gameMapClickedOn.parent.linkTabToGraph();//Mise à jour des textures
                console.log("Action effectuée");
            }
            if (gameMapClickedOn.game.isGameFinished()) {

            }
        }
    }

    tileOnClickEventPlayer1(gameMapClickedOn, index, TileClikedOn) {
        if (gameMapClickedOn.game.placementPhase) {
            //Ici il y aura les evenement de placement de bateau

        }
        else {
            if (gameMapClickedOn.game.getPlayerTurn() == 1) {//Si c'est à son tour
                gameMapClickedOn.game.playerAttack(index, gameMapClickedOn.game.getGameMapPlayer1());//Effectuer l'attaque sur la case cliquée
                if (gameMapClickedOn.game.isGameFinished() == true) {//Si la partie est terminée
                    console.log("Partie terminée");
                }
                gameMapClickedOn.parent.linkTabToGraph();//Mise à jour des textures
                console.log("Action effectuée");
            }
        }

    }

    //Fonction pour mettre à jour les textures
    linkTabToGraph() {
        for (let i = 0; i < 100; i++) {
            switch (this.game.getGameMapPlayer0()[i]) {
                case "R":
                    this.TilesTabPlayer0[i].innerHTML = "R";
                    break;
                case "T":
                    this.TilesTabPlayer0[i].innerHTML = "T";
                    break;
                case "BR":
                    this.TilesTabPlayer0[i].innerHTML = "BR"
                    break;
                case "VR":
                    this.TilesTabPlayer0[i].innerHTML = "VR"
                    break;
                case "B":
                    if (this.game.placementPhase) {
                        this.TilesTabPlayer0[i].innerHTML = "B"
                    }
                    else {
                        this.TilesTabPlayer0[i].innerHTML = ""
                    }
                    break;
            }
            switch (this.game.getGameMapPlayer1()[i]) {
                case "R":
                    this.TilesTabPlayer1[i].innerHTML = "R";
                    break;
                case "T":
                    this.TilesTabPlayer1[i].innerHTML = "T";
                    break;
                case "BR":
                    this.TilesTabPlayer1[i].innerHTML = "BR"
                    break;
                case "VR":
                    this.TilesTabPlayer1[i].innerHTML = "VR"
                    break;
                case "B":
                    if (this.game.placementPhase) {
                        this.TilesTabPlayer1[i].innerHTML = "B"
                    }
                    else {
                        this.TilesTabPlayer1[i].innerHTML = ""
                    }
                    break;
            }
        }
    }

    changeWeapon(weapon) {
        this.game.changeAttackMode(weapon);
        console.log(this.game.getAttackMode());
    }
}
