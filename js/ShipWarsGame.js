class shipWarsGame{
    constructor(){

        //Initialisation du tableau représentant la carte du jeu.
        //Tableau de 100 cases (10x10) de caractères : V pour Vide, B pour bateau, T pour Touché, R pour raté
        this.GameMapPlayer0 =  new Array(100)
        for(let i = 0; i < 100; i++){
            this.GameMapPlayer0[i] = "V";
        }

        this.GameMapPlayer1 =  new Array(100)
        for(let i = 0; i < 100; i++){
            this.GameMapPlayer1[i] = "V";
        }
        


        this.playerTurn = 0;

        this.initializeRandomMap(this.GameMapPlayer0);
        this.initializeRandomMap(this.GameMapPlayer1);
        console.log(this.GameMapPlayer0);
        console.log(this.GameMapPlayer1);
       
    }


    initializeRandomMap(GameMap){
        for(let i = 0; i < GameMap.length; i++){
            if(Math.floor(Math.random() * 100) % 5 == 0){
                GameMap[i] = "B"
            }
        }
    }

    playerAttack(index, GameMap){
        if(GameMap[index] != "R" && GameMap[index] != "T"){
            switch(GameMap[index]){
                case "B":
                    GameMap[index] = "T";
                    break;
                case "V":
                    GameMap[index] = "R";
                    this.changePlayerTurn();
            }
        }
        else{
            console.log("Tir impossible sur cette case !");
        }
    }

    changePlayerTurn(){
        if(this.playerTurn == 0){
            this.playerTurn = 1
        }
        else{
            this.playerTurn = 0;
        }
    }
}





/*shipWarsGame.prototype.tileOnClickEvent = function(){
    console.log(self);
}

EventListeners(){
        for(let i = 0; i < this.TilesTab.length; i++){
            this.TilesTab[i].addEventListener('click', this.tileOnClickEvent.bind(this.TilesTab[i]));
        }
    }
 Pour la partie view */