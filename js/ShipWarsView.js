class shipWarsView {
    constructor() {
        this.game = new shipWarsGame();

        this.TilesTabPlayer0 = new Array();
        for (let i = 0; i < 100; i++) {
            this.TilesTabPlayer0.push(document.getElementById("gametablePlayer0").getElementsByClassName("gametile")[i]);
        }
        this.TilesTabPlayer1 = new Array();
        for (let i = 0; i < 100; i++) {
            this.TilesTabPlayer1.push(document.getElementById("gametablePlayer1").getElementsByClassName("gametile")[i]);
        }

        console.log(this.TilesTabPlayer0);
        console.log(this.TilesTabPlayer1);
        console.log(this.game.getGameMapPlayer0());
        this.EventListeners();
    }


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
    }

    //Penser à instaurer le changement de joueur
    tileOnClickEventPlayer0(gameMapClickedOn, index, TileClikedOn) {
        if (gameMapClickedOn.game.getPlayerTurn() == 0) {
            gameMapClickedOn.game.playerAttack(index, gameMapClickedOn.game.getGameMapPlayer0());
            if (gameMapClickedOn.game.isGameFinished() == true) {
                console.log("Partie terminée");
            }
            gameMapClickedOn.parent.linkTabToGraph();
            console.log("Action effectuée");
        }
        if (gameMapClickedOn.game.isGameFinished()) {

        }
    }

    tileOnClickEventPlayer1(gameMapClickedOn, index, TileClikedOn) {
        if (gameMapClickedOn.game.getPlayerTurn() == 1) {
            gameMapClickedOn.game.playerAttack(index, gameMapClickedOn.game.getGameMapPlayer1());
            if (gameMapClickedOn.game.isGameFinished() == true) {
                console.log("Partie terminée");
            }
            gameMapClickedOn.parent.linkTabToGraph();
            console.log("Action effectuée");
        }
    }

    linkTabToGraph() {
        for (let i = 0; i < 100; i++) {
            switch (this.game.getGameMapPlayer0()[i]) {
                case "R":
                    this.TilesTabPlayer0[i].innerHTML = "R";
                    break;
                case "T":
                    this.TilesTabPlayer0[i].innerHTML = "T";
                    break;
                case "B":
                    this.TilesTabPlayer0[i].innerHTML = "B";
                    break;
            }
            switch (this.game.getGameMapPlayer1()[i]) {
                case "R":
                    this.TilesTabPlayer1[i].innerHTML = "R";
                    break;
                case "T":
                    this.TilesTabPlayer1[i].innerHTML = "T";
                    break;
            }
        }
    }
}
