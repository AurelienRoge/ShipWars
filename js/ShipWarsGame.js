class shipWarsGame{
    constructor(){

        //Initialisation du tableau représentant la carte du jeu.
        //Tableau de 100 cases (10x10) de caractères : V pour Vide, B pour bateau, T pour Touché, R pour raté
        this.GameMapPlayer0 =  new Array(100)
        this.GameMapPlayer1 =  new Array(100)

        this.playerTurn = 0;
        this.winner = undefined;

        this.initializeRandomMap(this.GameMapPlayer0);
        this.initializeRandomMap(this.GameMapPlayer1);
        console.log(this.GameMapPlayer0);
        console.log(this.GameMapPlayer1);
       
    }


    initializeRandomMap(GameMap){
        for(let i = 0; i < 100; i++){
            GameMap[i] = "V";
        }

        GameMap.shipList = new Array(5);
        GameMap.shipList[0] = new ship(5);
        GameMap.shipList[1] = new ship(4);
        GameMap.shipList[2] = new ship(3);
        GameMap.shipList[3] = new ship(3);
        GameMap.shipList[4]= new ship(2);

        for(let i = 0; i < GameMap.shipList.length; i++){
            if(Math.random() > 0.5){GameMap.shipList[i].setOrientation("D");}
            else{GameMap.shipList[i].setOrientation("R");}
            while(GameMap.shipList[i].getHeadIndex() == undefined){
                let tmp = Math.floor(Math.random() * 100);
                if(GameMap.shipList[i].isShipFree(GameMap, tmp)){
                    GameMap.shipList[i].setHeadIndex(tmp);
                    switch(GameMap.shipList[i].getOrientation()){
                        case "D":
                            for(let j = tmp; j < tmp + (GameMap.shipList[i].getSize() * 10); j+= 10){
                                GameMap[j] = "B";
                            }
                            break;
                        
                        case "R":
                            for(let j = tmp; j < tmp + GameMap.shipList[i].getSize(); j++){
                                GameMap[j] = "B";
                            }
                            break;
                    }
                }
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

    resetGame(){
        this.initializeRandomMap(this.GameMapPlayer0);
        this.initializeRandomMap(this.GameMapPlayer1);
        this.playerTurn = 0;
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





