class shipWarsGame {
    constructor() {

        //Initialisation du tableau représentant la carte du jeu.
        //Tableau de 100 cases (10x10) de caractères : V pour Vide, B pour bateau, T pour Touché, R pour raté
        this.GameMapPlayer0 = new Array(100)
        this.GameMapPlayer1 = new Array(100)

        this.playerTurn = 0;
        this.winner = undefined;


        this.attackMode = "Missile";


        //Booléen permettant de savoir si le joueur a déjà utilisé chaque capacité spéciale -> False = non utilisé (donc disponible)
        this.player0Radar = false;
        this.player0Torpille = false;
        this.player0Bombe = false;

        this.player1Radar = false;
        this.player1Torpille = false;
        this.player1Bombe = false;



        //Initialisation des cartes
        this.initializeRandomMap(this.GameMapPlayer0);
        this.initializeRandomMap(this.GameMapPlayer1);
        //console.log(this.GameMapPlayer0);
        //console.log(this.GameMapPlayer1);

    }


    //Fonction pour créer une carte de 10x10 avec des bateaux placés aléatoirement.
    initializeRandomMap(GameMap) {
        //Initialisation du tableau en un ensemble de cases vide (= cases d'ocean)
        for (let i = 0; i < 100; i++) {
            GameMap[i] = "V";
        }

        //Création de tous les bateaux
        GameMap.shipList = new Array(5);
        GameMap.shipList[0] = new ship(5);
        GameMap.shipList[1] = new ship(4);
        GameMap.shipList[2] = new ship(3);
        GameMap.shipList[3] = new ship(3);
        GameMap.shipList[4] = new ship(2);

        //Pour établir la position et l'orientation de chaque bateau
        for (let i = 0; i < GameMap.shipList.length; i++) {
            //50% de chance pour chaque orientation
            if (Math.random() > 0.5) { GameMap.shipList[i].setOrientation("D"); }
            else { GameMap.shipList[i].setOrientation("R"); }
            //Tant qu'on a pas de position valide pour le bateau
            while (GameMap.shipList[i].getHeadIndex() == undefined) {
                let tmp = Math.floor(Math.random() * 100);//On génère une position aléatoire dans le tableau
                //Si la position est valide :
                if (GameMap.shipList[i].isShipFree(GameMap, tmp)) {
                    GameMap.shipList[i].setHeadIndex(tmp);//On place la position de la tête et toutes les autres cases du bateau
                    switch (GameMap.shipList[i].getOrientation()) {
                        case "D":
                            for (let j = tmp; j < tmp + (GameMap.shipList[i].getSize() * 10); j += 10) {
                                GameMap[j] = "B";
                                GameMap.shipList[i].addInTilesIndex(j);
                            }
                            break;

                        case "R":
                            for (let j = tmp; j < tmp + GameMap.shipList[i].getSize(); j++) {
                                GameMap[j] = "B";
                                GameMap.shipList[i].addInTilesIndex(j);
                            }
                            break;
                    }
                }
            }
            //console.log(GameMap.shipList[i].getTilesIndex());
        }
    }


    //Pour gérer l'attaque du joueur
    playerAttack(index, GameMap) {
        switch (this.attackMode) {
            case "Missile":
                //Si le joueur tir sur une case valide (c'est à dire une case où il n'a pas déjà tiré)
                if (GameMap[index] != "R" && GameMap[index] != "T") {
                    switch (GameMap[index]) {
                        case "B"://Si c'est un bateau, on indique qu'on a touché dans le tableau -> T
                            GameMap[index] = "T";
                            console.log("Touché !")
                            this.findWhichShipIsAttacked(GameMap, index).tileHasBeenDestroyed(index);
                            if (this.findWhichShipIsAttacked(GameMap, index).isShipDestroyed() == true) {
                                console.log("Coulé !")
                            }
                            break;
                        case "BR"://Si c'est un bateau, on indique qu'on a touché dans le tableau -> T
                            GameMap[index] = "T";
                            console.log("Touché !")
                            this.findWhichShipIsAttacked(GameMap, index).tileHasBeenDestroyed(index);
                            if (this.findWhichShipIsAttacked(GameMap, index).isShipDestroyed() == true) {
                                console.log("Coulé !")
                            }
                            break;
                        case "V"://Si c'est une case vide, on indique qu'on a raté -> R et le tour passe au joueur adverse
                            GameMap[index] = "R";
                            console.log("Raté !")
                            this.changePlayerTurn();
                            break;
                        case "VR"://Si c'est une case vide, on indique qu'on a raté -> R et le tour passe au joueur adverse
                            GameMap[index] = "R";
                            console.log("Raté !")
                            this.changePlayerTurn();
                            break;
                    }
                }
                else {
                    console.log("Tir impossible sur cette case !");
                }
                break;


            case "Radar":
                if (this.isWeaponAvailable(this.getPlayerTurn(), "Radar")) {
                    for (let i = -1; i < 2; i++) {
                        for (let j = -1; j < 2; j++) {
                            switch (GameMap[index + (i * 10) + j]) {
                                case "B":
                                    GameMap[index + (i * 10) + j] = "BR"
                                    break;
                                case "V":
                                    GameMap[index + (i * 10) + j] = "VR"
                                    break;
                            }
                        }
                    }
                    this.weaponUsed(this.getPlayerTurn(), "Radar");
                    this.changePlayerTurn();
                }
                else { console.log("Plus de charge pour cette arme !") }
                break;


            case "Torpille":
                if (this.isWeaponAvailable(this.getPlayerTurn(), "Torpille")) {
                    if (GameMap[index] == "B" || GameMap[index] == "BR" || GameMap[index] == "T") {
                        if (this.findWhichShipIsAttacked(GameMap, index).getTilesIndex().length - this.findWhichShipIsAttacked(GameMap, index).getTilesDestroyedIndex().length <= 2) {
                            this.findWhichShipIsAttacked(GameMap, index).destroyShip();
                            for (let i = 0; i < this.findWhichShipIsAttacked(GameMap, index).getTilesIndex().length; i++) {
                                GameMap[this.findWhichShipIsAttacked(GameMap, index).getTilesIndex()[i]] = "T";
                            }
                            console.log("Coulé !")
                        }

                        else {
                            switch (GameMap[index]) {
                                case "B"://Si c'est un bateau, on indique qu'on a touché dans le tableau -> T
                                    GameMap[index] = "T";
                                    console.log("Touché !")

                                    break;
                                case "BR"://Si c'est un bateau, on indique qu'on a touché dans le tableau -> T
                                    GameMap[index] = "T";
                                    console.log("Touché !");

                                    break;
                                case "V"://Si c'est une case vide, on indique qu'on a raté -> R et le tour passe au joueur adverse
                                    GameMap[index] = "R";
                                    console.log("Raté !");

                                    break;
                                case "VR"://Si c'est une case vide, on indique qu'on a raté -> R et le tour passe au joueur adverse
                                    GameMap[index] = "R";
                                    console.log("Raté !");

                                    break;
                            }
                        }
                    }
                    else {
                        GameMap[index] = "R";
                    }
                    this.weaponUsed(this.getPlayerTurn(), "Torpille");
                    this.changePlayerTurn();
                }
                else { console.log("Plus de charge pour cette arme !") }
                break;

            case "Bombe":
                if (this.isWeaponAvailable(this.getPlayerTurn(), "Bombe")) {
                    for (let i = -10; i <= 10; i += 10) {
                        switch (GameMap[index + i]) {
                            case "B"://Si c'est un bateau, on indique qu'on a touché dans le tableau -> T
                                GameMap[index + i] = "T";
                                console.log("Touché !")
                                break;
                            case "BR"://Si c'est un bateau, on indique qu'on a touché dans le tableau -> T
                                GameMap[index + i] = "T";
                                console.log("Touché !")
                                break;
                            case "V"://Si c'est une case vide, on indique qu'on a raté -> R et le tour passe au joueur adverse
                                GameMap[index + i] = "R";
                                console.log("Raté !")
                                break;
                            case "VR"://Si c'est une case vide, on indique qu'on a raté -> R et le tour passe au joueur adverse
                                GameMap[index + i] = "R";
                                console.log("Raté !")
                                break;
                        }
                    }

                        switch (GameMap[index - 1]) {
                            case "B"://Si c'est un bateau, on indique qu'on a touché dans le tableau -> T
                                if ((index - 1) % 10 != 9) {
                                    GameMap[index - 1] = "T";
                                    console.log("Touché !")
                                }
                                break;
                            case "BR"://Si c'est un bateau, on indique qu'on a touché dans le tableau -> T
                                if ((index - 1) % 10 != 9) {
                                    GameMap[index - 1] = "T";
                                    console.log("Touché !");
                                }
                                break;
                            case "V"://Si c'est une case vide, on indique qu'on a raté -> R et le tour passe au joueur adverse
                                if ((index - 1) % 10 != 9) {
                                    GameMap[index - 1] = "R";
                                    console.log("Raté !");
                                }
                                break;
                            case "VR"://Si c'est une case vide, on indique qu'on a raté -> R et le tour passe au joueur adverse
                                if ((index - 1) % 10 != 9) {
                                    GameMap[index - 1] = "R";
                                    console.log("Raté !");
                                }
                                break;
                        }
                        switch (GameMap[index + 1]) {
                            case "B"://Si c'est un bateau, on indique qu'on a touché dans le tableau -> T
                                if ((index + 1) % 10 != 0) {
                                    GameMap[index + 1] = "T";
                                    console.log("Touché !")
                                }
                                break;
                            case "BR"://Si c'est un bateau, on indique qu'on a touché dans le tableau -> T
                                if ((index + 1) % 10 != 0) {
                                    GameMap[index + 1] = "T";
                                    console.log("Touché !");
                                }
                                break;
                            case "V"://Si c'est une case vide, on indique qu'on a raté -> R et le tour passe au joueur adverse
                                if ((index + 1) % 10 != 0) {
                                    GameMap[index + 1] = "R";
                                    console.log("Raté !");
                                }
                                break;
                            case "VR"://Si c'est une case vide, on indique qu'on a raté -> R et le tour passe au joueur adverse
                                if ((index + 1) % 10 != 0) {
                                    GameMap[index + 1] = "R";
                                    console.log("Raté !");
                                }
                                break;
                        }
                    
                    this.weaponUsed(this.getPlayerTurn(), "Bombe");
                    this.changePlayerTurn();
                }
                else { console.log("Plus de charge pour cette arme !") }
                break;
        }
    }

    //Fonction pour changer le tour entre les joueurs
    changePlayerTurn() {
        if (this.playerTurn == 0) {
            this.playerTurn = 1
        }
        else {
            this.playerTurn = 0;
        }
    }

    getPlayerTurn() {
        return this.playerTurn;
    }

    weaponUsed(player, weapon) {
        if (player == 0) {
            switch (weapon) {
                case "Radar":
                    this.player0Radar = true;
                    break;
                case "Torpille":
                    this.player0Torpille = true;
                    break;

                case "Bombe":
                    this.player0Bombe = true;
                    break;
            }
        }
        if (player == 1) {
            switch (weapon) {
                case "Radar":
                    this.player1Radar = true;
                    break;
                case "Torpille":
                    this.player1Torpille = true;
                    break;

                case "Bombe":
                    this.player1Bombe = true;
                    break;
            }
        }
    }

    isWeaponAvailable(player, weapon) {
        if (player == 0) {
            switch (weapon) {
                case "Radar":
                    if (this.player0Radar == false) {
                        return true;
                    }
                    break;
                case "Torpille":
                    if (this.player0Torpille == false) {
                        return true;
                    }
                    break;

                case "Bombe":
                    if (this.player0Bombe == false) {
                        return true;
                    }
                    break;
            }
        }
        if (player == 1) {
            switch (weapon) {
                case "Radar":
                    if (this.player1Radar == false) {
                        return true
                    }
                    break;
                case "Torpille":
                    if (this.player1Torpille == false) {
                        return true;
                    }
                    break;

                case "Bombe":
                    if (this.player1Bombe == false) {
                        return true;
                    }
                    break;
            }
        }
    }


    isMapFinished(GameMap) {
        //On vérifie s'il reste des cases bateau dans le tableau
        for (let i = 0; i < GameMap.length; i++) {
            if (GameMap[i] == "B") {
                return false; //Si oui, alors la partie n'est pas terminé pour ce joueur
            }
        }
        return true;
    }

    //On vérifie les deux cartes pour voir si la partie est terminée
    isGameFinished() {
        if (this.isMapFinished(this.GameMapPlayer0) || this.isMapFinished(this.GameMapPlayer1)) {
            return true
        }
        else {
            return false;
        }
    }

    //Pour réinitialiser la partie
    resetGame() {
        this.initializeRandomMap(this.GameMapPlayer0);
        this.initializeRandomMap(this.GameMapPlayer1);
        this.playerTurn = 0;
        this.winner = undefined;
    }


    //On vérifie chaque carte, si la carte du joueur 1 est finie (= il n'y a plus de bateau), alors le joueur 0 gagne et inversement
    getWinner() {
        if (this.isMapFinished(this.GameMapPlayer0)) {
            this.winner = 1; //Le gagnant est le joueur 1
            return this.winner;
        }

        if (this.isMapFinished(this.GameMapPlayer1)) {
            this.winner = 0; //Le gagnant est le joueur 0
            return this.winner;
        }

        this.winner = undefined //Sinon, il n'y a pas de gagnant
    }

    //Pour obtenir la carte du joueur 0
    getGameMapPlayer0() {
        return this.GameMapPlayer0;
    }

    //Pour obtenir la carte du joueur 1
    getGameMapPlayer1() {
        return this.GameMapPlayer1;
    }

    //Pour savoir c'est au tour de quel joueur de jouer
    getPlayerTurn() {
        return this.playerTurn;
    }

    changeAttackMode(newMode) {
        this.attackMode = newMode;
    }

    getAttackMode() {
        return this.attackMode;
    }

    findWhichShipIsAttacked(GameMap, index) {
        for (let i = 0; i < GameMap.shipList.length; i++) {
            for (let j = 0; j < GameMap.shipList[i].getTilesIndex().length; j++) {
                if (GameMap.shipList[i].getTilesIndex()[j] == index) {
                    return GameMap.shipList[i];
                }
            }
        }
    }

}





