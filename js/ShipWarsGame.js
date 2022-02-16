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
        this.winner = undefined;

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
                    console.log("Touché !")
                    break;
                case "V":
                    GameMap[index] = "R";
                    console.log("Raté !")
                    this.changePlayerTurn();
                    break;
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

    isMapFinished(GameMap){
        //On vérifie s'il reste des cases bateau dans le tableau
        for(let i = 0; i < GameMap.length; i++){
            if(GameMap[i] == "B"){
                return false; //Si oui, alors la partie n'est pas terminé pour ce joueur
            }
        }
        return true;
    }

    isGameFinished(){
        if(this.isMapFinished(this.GameMapPlayer0) || this.isMapFinished(this.GameMapPlayer1)){
            return true
        }
        else{
            return false;
        }
    }


    getWinner(){
        if(this.isMapFinished(this.GameMapPlayer0)){
            this.winner = 1; //Le gagnant est le joueur 1
            return this.winner;
        }

        if(this.isMapFinished(this.GameMapPlayer1)){
            this.winner = 0; //Le gagnant est le joueur 0
            return this.winner;
        }

        this.winner = undefined //Sinon, il n'y a pas de gagnant
    }

    getGameMapPlayer0(){
        return this.GameMapPlayer0;
    }

    getGameMapPlayer1(){
        return this.GameMapPlayer1;
    }

    getPlayerTurn(){
        return this.playerTurn;
    }
}





