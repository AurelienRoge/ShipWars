class shipWarsGame{
    constructor(){
        this.TilesTab =  new Array()
        for(let i = 0; i < 100; i++){
            this.TilesTab.push(document.getElementsByClassName("gametile")[i]);
        }
        console.log(this.TilesTab)
        this.EventListeners();
    }

    EventListeners(){
        for(let i = 0; i < this.TilesTab.length; i++){
            this.TilesTab[i].addEventListener('click', this.tileOnClickEvent.bind(this.TilesTab[i]));
        }
    }
}


shipWarsGame.prototype.tileOnClickEvent = function(){
    console.log(self);
}