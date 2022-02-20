class shipWarsGame{
    constructor(){

        //Initialisation du tableau représentant la carte du jeu.
        //Tableau de 100 cases (10x10) de caractères : V pour Vide, B pour bateau, T pour Touché, R pour raté
        this.GameMapPlayer0 =  new Array(100)
        this.GameMapPlayer1 =  new Array(100)

        this.playerTurn = 0;
        this.winner = undefined;

        //Initialisation des cartes
        this.initializeRandomMap(this.GameMapPlayer0);
        this.initializeRandomMap(this.GameMapPlayer1);
        console.log(this.GameMapPlayer0);
        console.log(this.GameMapPlayer1);
       
    }


    //Fonction pour créer une carte de 10x10 avec des bateaux placés aléatoirement.
    initializeRandomMap(GameMap){
        //Initialisation du tableau en un ensemble de cases vide (= cases d'ocean)
        for(let i = 0; i < 100; i++){
            GameMap[i] = "V";
        }

        //Création de tous les bateaux
        GameMap.shipList = new Array(5);
        GameMap.shipList[0] = new ship(5);
        GameMap.shipList[1] = new ship(4);
        GameMap.shipList[2] = new ship(3);
        GameMap.shipList[3] = new ship(3);
        GameMap.shipList[4]= new ship(2);

        //Pour établir la position et l'orientation de chaque bateau
        for(let i = 0; i < GameMap.shipList.length; i++){
            //50% de chance pour chaque orientation
            if(Math.random() > 0.5){GameMap.shipList[i].setOrientation("D");}
            else{GameMap.shipList[i].setOrientation("R");}
            //Tant qu'on a pas de position valide pour le bateau
            while(GameMap.shipList[i].getHeadIndex() == undefined){
                let tmp = Math.floor(Math.random() * 100);//On génère une position aléatoire dans le tableau
                //Si la position est valide :
                if(GameMap.shipList[i].isShipFree(GameMap, tmp)){
                    GameMap.shipList[i].setHeadIndex(tmp);//On place la position de la tête et toutes les autres cases du bateau
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

    
    //Pour gérer l'attaque du joueur
    playerAttack(index, GameMap){
        //Si le joueur tir sur une case valide (c'est à dire une case où il n'a pas déjà tiré)
        if(GameMap[index] != "R" && GameMap[index] != "T"){
            switch(GameMap[index]){
                case "B"://Si c'est un bateau, on indique qu'on a touché dans le tableau -> T
                    GameMap[index] = "T";
                    console.log("Touché !")
                    break;
                case "V"://Si c'est une case vide, on indique qu'on a raté -> R et le tour passe au joueur adverse
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

    //Fonction pour changer le tour entre les joueurs
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

    //On vérifie les deux cartes pour voir si la partie est terminée
    isGameFinished(){
        if(this.isMapFinished(this.GameMapPlayer0) || this.isMapFinished(this.GameMapPlayer1)){
            return true
        }
        else{
            return false;
        }
    }

    //Pour réinitialiser la partie
    resetGame(){
        this.initializeRandomMap(this.GameMapPlayer0);
        this.initializeRandomMap(this.GameMapPlayer1);
        this.playerTurn = 0;
        this.winner = undefined;
    }


    //On vérifie chaque carte, si la carte du joueur 1 est finie (= il n'y a plus de bateau), alors le joueur 0 gagne et inversement
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

    //Pour obtenir la carte du joueur 0
    getGameMapPlayer0(){
        return this.GameMapPlayer0;
    }

    //Pour obtenir la carte du joueur 1
    getGameMapPlayer1(){
        return this.GameMapPlayer1;
    }

    //Pour savoir c'est au tour de quel joueur de jouer
    getPlayerTurn(){
        return this.playerTurn;
    }
}





