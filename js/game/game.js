/**
*
* Game.
*
* Loop events belong to game progress. Game progress communicates
* with game engine object, which is prototype linked to this.
*
*/

var Game = {

    /**
     * Init game
     * 
     * @return void
     */
    init: function() {
        // init players.
        this.initPlayers();
    },

    /**
     * Init players
     * 
     * Create both human player and cpu player
     * and update screen data with init data.
     * 
     * @return void
     */
    initPlayers: function() {

        // create human player.
        const data = {
            id : 0,
            name : 'David Guerreiro',
        };
        var player1 = Player( data );
        console.log( player1 );

        // create cpu player.
    },
};

document.onreadystatechange = function () {
    if ( document.readyState == "interactive" ) {    
        // init game.
        game.init();
    }
}