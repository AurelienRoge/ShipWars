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

    areTilesAroundFree(GameMap, index) {
        for (let i = -1; i < 1; i++) {
            if (GameMap[index + i] != "V" || GameMap[index + 10 /*10 car taille d'une carte de bataille navale*/ + i] != "V" || GameMap[index - 10 + i] != "V") {
                console.log("Returned False")
                return false;
            }
        }
        return true;
    }


    isShipFree(GameMap, Headindex) {
        let j = 0;
        switch (this.orientation) {
            case "D":
                for (let i = 0; i < this.size; i++) {
                    if (this.areTilesAroundFree(GameMap, Headindex + j) == false) {
                        return false;
                    }
                    j += 10; //10 = taille d'une carte de bataille navale
                }
                return true;

            case "R":
                for (let i = 0; i < this.size; i++) {
                    if (this.areTilesAroundFree(GameMap, Headindex + j) == false) {
                        return false;
                    }
                    j += 1; //1 -> on regarde la case suivante
                }
                return true;
        }
    }
}