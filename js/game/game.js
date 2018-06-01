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
        console.log( player1 );
        console.log( cpuPlayer );

        // init game interface.
        this.initInterface();
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
            maxLife : 4,
        };
        window.player1 = Object.create( Hero ).init( data );

        // create cpu player.
        window.cpuPlayer = Object.create( Enemy ).init( enemyData.enemies[1] );
    },

    /**
     * Init interface.
     * 
     * Add events to game interface so the game
     * becames playable
     * 
     * @return void
     */
    initInterface : function() {
        var options = document.getElementsByClassName('game-option');
        document.getElementById('player-name').innerHTML = player1.name;
        document.getElementById('player-loop-name').innerHTML = player1.name;
        document.getElementById('enemy-name').innerHTML = cpuPlayer.name;
        document.getElementById('enemy-loop-name').innerHTML = cpuPlayer.name;
        
        Engine.refreshPlayersData();
        
        for (let i = 0; i < options.length; i++) { 
            options[i].addEventListener('click', Engine.play);
        }
    }
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