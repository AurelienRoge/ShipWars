class Player{
    constructor(id){
        this.id = id;

        //Booléen permettant de savoir si le joueur a déjà utilisé chaque capacité spéciale -> False = non utilisé (donc disponible)
        this.radar = false;
        this.torpille = false;
        this.bombe = false;

        this.attackMode = "Missile";
    }


    getID(){
        return this.id;
    }

    weaponHasBeenUsed(weapon){
        switch(weapon){
            case "Radar":
                this.radar = true;
                break;
            
            case "Torpille":
                this.torpille = true;
                break;
            
            case "Bombe":
                this.bombe = true;
                break;
        }
    }

    getWeaponUsed(){
        return{
            radar : this.radar,
            torpille : this.torpille,
            bombe : this.bombe
        };
    }

    isWeaponUsed(weapon){
        switch(weapon){
            case "Missile":
                return false; //On autorise tt le temps à tirer à l'arme de base
            case "Radar":
                return this.radar;
            
            case "Torpille":
                return this.torpille;
            
            case "Bombe":
                return this.bombe;
        }
    }

    getAttackMode(){
        return this.attackMode;
    }

    changeAttackMode(newMode) {
        this.attackMode = newMode;
        console.log("Player " + this.id + "changed weapon to " + newMode);
    }
}


module.exports = Player;