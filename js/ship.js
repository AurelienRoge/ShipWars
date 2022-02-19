class ship {
    constructor(size) {
        this.size = size;
        this.headIndex = undefined;
        this.orientation = undefined; // D = Down R = right. Pour l'orientation, la bateau continue dans le sens de l'orientation depuis la tête.
    }

    getSize() {
        return this.size;
    }

    setHeadIndex(headIndex) {
        this.headIndex = headIndex;
    }

    getHeadIndex() {
        return this.headIndex;
    }

    setOrientation(orientation) {
        this.orientation = orientation;
    }

    getOrientation() {
        return this.orientation;
    }


    isShipFree(GameMap, Headindex) {
        let j = 0;
        switch (this.orientation) {
            case "D":
                for (let i = 1; i <= this.size; i++) {
                    switch(i){
                        case 1:
                            if(GameMap[Headindex - 1 - 10] != "V" || GameMap[Headindex - 10] != "V" || GameMap[Headindex + 1 - 10] != "V" || GameMap[Headindex - 1] != "V" || GameMap[Headindex + 1] != "V"){
                                return false;
                            }
                            break;
                        case this.size:
                            if(GameMap[Headindex + j - 1 + 10] != "V" || GameMap[Headindex + j + 10] != "V" || GameMap[Headindex + j + 1 + 10] != "V" || GameMap[Headindex + j - 1] != "V" || GameMap[Headindex + j + 1] != "V"){
                                return false;
                            }
                            break;
                        default:
                            if(GameMap[Headindex + j - 1] != "V" || GameMap[Headindex + j + 1] != "V"){
                                return false;
                            }
                    }
                    j += 10; //10 = taille d'une carte de bataille navale
                }
                return true;

            case "R":
                for (let i = 1; i <= this.size; i++) {
                    switch(i){
                        case 1:
                            if(GameMap[Headindex - 1 - 10] != "V" ||  GameMap[Headindex - 1] != "V" || GameMap[Headindex - 1 + 10] != "V" ||  GameMap[Headindex - 10] != "V" || GameMap[Headindex + 10] != "V" || GameMap[Headindex + 1] != "V" || (Headindex + 1) % 10 == 0){
                                return false;
                            }
                            break;
                        case this.size:
                            if(GameMap[Headindex + j - 10] != "V" || GameMap[Headindex + j + 10] != "V" || GameMap[Headindex + j + 1 + 10] != "V" || GameMap[Headindex + j + 1] != "V" || GameMap[Headindex + j + 1 - 10] != "V"){
                                return false;
                            }
                            break;
                        default:
                            console.log("default");
                            if(GameMap[Headindex + j - 10] != "V" || GameMap[Headindex + j + 10] != "V" || GameMap[Headindex + 1] != "V" || (Headindex + j + 1) % 10 == 0){
                                return false;
                            }
                    }
                    j += 1; //1 = case de droite
                }
                return true;
        }
    }
}