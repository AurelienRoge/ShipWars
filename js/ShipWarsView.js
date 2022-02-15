class shipWarsView{
    constructor(linkedGame){
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




    EventListeners(){
        for(let i = 0; i < this.TilesTabPlayer0.length; i++){
            this.TilesTabPlayer0[i].addEventListener('click', this.tileOnClickEvent.bind(this.TilesTabPlayer0, this.TilesTabPlayer0[i], i));
            this.TilesTabPlayer0[i].game = this.game;
        }
    }
    
    //Penser à instaurer le changement de joueur
    tileOnClickEvent(gameMapClickedOn, index, TileClikedOn){
        gameMapClickedOn.game.playerAttack(index,gameMapClickedOn.game.getGameMapPlayer0());
        console.log("Action effectuée");
    }
}
