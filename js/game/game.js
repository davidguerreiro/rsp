/**
*
* Game.
*
* Loop events belong to game progress. Game progress communicates
* with game engine object, which is prototype linked to this.
*
*/

// load enemy data globally.

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

        // create human player and add it to the global scope.
        var data = {
            id : 0,
            name : 'David Guerreiro',
        };
        window.player1 = Object.create( Hero ).init( data );
         
        console.log( player1 );
        console.log( enemyData );

        // create cpu player.
    },
};

document.onreadystatechange = function () {
    if ( document.readyState == "interactive" ) {   
        
        // TODO: Look for a more elegant solution to solve this.
        var readerCallback = function( text ) {
            let data = JSON.parse( text );
            window.enemyData = data;

            // init game.
            Game.init();
        };

        // load enemy data.
        Engine.readJsonFile( './json/cpu_players.json', readerCallback );
    }
}