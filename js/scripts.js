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

/**
*
* Game Engine
*
* Base game logic and funcionality should be placed here.
* This is the base object and every component of the game
* should be prototype linked to this object.
*
*/

var Engine = {

  /**
   * Generates a random number betweebn 0 and 100.
   * 
   * @return {number} number
   */
  generateRandomNumber : function() {
    let min = 0;
    let max = 100;
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
  },

  /**
   * Reads local JSON file
   * 
   * @param {string} file
   * @param {function} callback
   * @return {object} data
   */
  readJsonFile : function( file, callback ) {
    let rawFile = new XMLHttpRequest();

    rawFile.overrideMimeType( 'application/json' );
    rawFile.open( 'GET', file, true );
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState == 4 && rawFile.status == '200' ) {
        callback(rawFile.responseText);
      }
    }
    rawFile.send(null);
  },
  
  /*
  Usage: -- Remove after development.
  readTextFile("/Users/Documents/workspace/test.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
  });
  Origin : https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript
  */

  /**
   * Sort percentage options from max to min.
   * This is used to calculate AI response in every game
   * loop.
   * 
   * @param {object} options
   * @return {array} Array_options
   */
  sortOptions : function( options ) {
    let arrayOptions = [];

    for( let key in options[0] ) {
      arrayOptions.push( [key, options[0][key] ] );
    }

    // sort array.
    arrayOptions.sort( function( a, b ){ 
      return a[1] - b[1];
    });

    return arrayOptions;
  },

  /**
   * Create ranges from 0 to 100 based which probablilities the
   * enemy has to choose an option.
   * This is used to calculate which option the enemy will choose
   * every game loop.
   * 
   * @param {object} stats
   * @return {object} ranges
   */
  getOptionsRanges : function( stats ) {
    let ranges  = [];
    let range_1 = {};
    let range_2 = {};
    let range_3 = {};

    // calculate and reassing ranges
    range_1.text  = stats[2][0];
    range_1.value = Number( stats[2][1] );

    range_2.text  = stats[1][0];
    range_2.value = Number( stats[2][1] + stats[1][1] );

    range_3.text  = stats[0][0];
    range_3.value = 100;

    ranges.push( ...[range_1, range_2, range_3] );
    return ranges;
  },

  /**
   * Get action based on action code.
   * 
   * @param {string} actionCode Action code
   * @return {string} actionName
   */
  getActionName : function( actionCode ) {
    let actions = {
      'rock' : 'Rock',
      'scrss' : 'Scisors',
      'paper' : 'Paper',
    };

    return actions[ actionCode ];
  },

  /**
   * Checks if any percentage overpass the min/max parameters and 
   * make ajustments if required.
   * 
   * @param {number} value
   * @return {number} value
   */
  checkMinMax : function( value ) {
    let min = 0;
    let max = 99.99;

    if ( value < min ) {
      value = min;
    }

    if ( value > max ) {
      value = max;
    }

    return value;
  },

  /**
   * Check which player wins a round
   * 
   * @param {string} player_option
   * @param {string} cpu_option
   * @return {boolean}
   */
  hasPlayerWonRound: function( playerOption, cpuOption ) {  
    let result = {
      'rock' : {
        'paper' : 1,
        'scrss' : 2,
        'rock'  : false,
      },
      'scrss' : {
        'rock'  : 1,
        'paper' : 2,
        'scrss' : false,
      },
      'paper' : {
        'scrss' : 1,
        'rock'  : 2,
        'paper' : false,
      },
    };
    
    return result[ playerOption ][ cpuOption ];
  },

  /**
   * Refresh interface with players data.
   * This method is used when the game is init and
   * once after every game loop.
   * 
   * @param {object} winner Round winner data
   * @param {object} looser Round looser data
   * @param {string} playerAction Player action
   * @param {string} enemyAction Enemy action
   * @return void
   */
  refreshInterface : function( winner, looser, playerAction, enemyAction ) {
    let gameLoopElement = document.getElementsByClassName('game-loop');
    let winnerText = document.getElementById('winner-text');
    let looserText = document.getElementById('looser-text');
    gameLoopElement = gameLoopElement[0];

    // update action screen.
    document.getElementById('player-selected-action').innerHTML = this.getActionName( playerAction );
    document.getElementById('enemy-selected-action').innerHTML = this.getActionName( enemyAction );

    // update results text.
    if ( Object.keys( winner ) == 0 && Object.keys( looser ) == 0 ) {
      // tie.
      winnerText.innerHTML = 'Game is Tied !';
      looserText.innerHTML = 'Nobody looses a life this time ha !';
    } else {
      winnerText.innerHTML = winner.name + ' has won this match';
      looserText.innerHTML = looser.name + ' has lost a life';
    }

    // display game progress interface if not displayed.
    if ( gameLoopElement.style.display !== 'block' ) {
      gameLoopElement.style.display = 'block';
    }

    // update players data.
    this.refreshPlayersData();
  },

  /**
   * Refresh players data on the screen.
   * 
   * @return void
   */
  refreshPlayersData : function() {
    // refresh player 1 data.
    document.getElementById('player-life').innerHTML = player1.currentLife;

    // refresh enemy data.
    document.getElementById('enemy-life').innerHTML = cpuPlayer.currentLife;
  },

  /**
   * Inits game loop.
   * 
   * This method is tiggered every time an users
   * selects an option to play.
   * 
   * @return void
   */
  play : function() {
    var winner = {};
    var looser = {};
    var playerChoice = this.id;
    var cpuChoice = cpuPlayer.getOption();
    var result = Engine.hasPlayerWonRound( playerChoice, cpuChoice );
    let noTie  = ( typeof result == 'number' ) ? true : false;
    
    if ( noTie && result == 2 ) {
      cpuPlayer.currentLife--;
      winner.name   = player1.name;
      winner.action = playerChoice;
      looser.name   = cpuPlayer.name;
      looser.action = cpuChoice;
    } else if ( noTie && result == 1 ) {
      player1.currentLife--;
      winner.name   = cpuPlayer.name;
      winner.action = cpuChoice;
      looser.name   = player1.name;
      looser.action = playerChoice;
    }

    // update screen data.
    Engine.refreshInterface( winner, looser, playerChoice, cpuChoice );

    // check if game over.
    if ( player1.currentLife == 0 || cpuPlayer.currentLife == 0 ) {
      Engine.gameOver();
    }
  },

  /**
   * Game over.
   * 
   * Game over is checked at the end of every
   * game loop and tiggered if any player or enemy
   * has no more life.
   * 
   * @return void
   */
  gameOver : function() {
    let gameLayout = document.getElementsByClassName('game-layout');
    let gameResultsElement = document.getElementsByClassName('game-loop__notification');
    let gameConclusionElement = document.getElementsByClassName('game-conclusion');
    let text = ( player1.currentLife > 0 ) ? player1.name + ' has won the game !! Congratulations !!' : player1.name + ' has lost the game ! :( Try again !';

    // hide action screen and loop notifications.
    for ( let i = 0; i < gameResultsElement.length; i++ ) {
      gameResultsElement[ i ].style.display = 'none';
    }
    gameLayout[0].style.display = 'none';
    
    // update conclusion interface element.
    document.getElementById('game-over-notification').innerHTML = text;
    gameConclusionElement[0].style.display = 'block';
  },
};

/**
*
* Game Item
*
* Defines item objects.
* 
* Each item as method usage which does not belong to the model.
* TODO: Load init object data dinamically form JSON file.
*/

var Item = {

    /**
     * Item init method
     * 
     * @param {object} data Data
     * @return void
     */
    init : function( itemData ) {
        this.id = itemData.id || 0;
        this.name = itemData.name || 'default';
        this.rate = itemData.rate || 50;
        this.icon =  itemData.icon || '';
    }
};
var Items = {};

// init potion.
// TODO: Replace this by dynamic data comgin from items JSON file.
var itemData = {
    id : 0,
    name : 'Potion',
    description : 'Recovers one hearth',
    rate : 50,
    icon : 'fa fa-flask',
};

Items.potion = Object.create( Item );
Items.potion.init( itemData );

/**
 * Potion usage method.
 * 
 * @param {object} player Player object
 * @return void
 */
Items.potion.useItem = function( player ) {
    if ( player.currentLife === player.totalLife ) {
        return;
    }
    player.currentLife++;
}

// init scanner.
var itemData = {
    id : 1,
    name : 'Scanner',
    description : 'Reveals how your enemy plays',
    rate : 20,
    icon : 'fa fa-tablet',
};

Items.scanner = Object.create( Item );
Items.scanner.init( itemData );

/**
 * Scanner usage method.
 * 
 * @param {object} Enemy Enemy object
 * @return {object} stats
 */
Items.scanner.useItem = function( Enemy ) {
    return Enemy.data.stats;
}

/**
*
* Game Players
*
* Defines the player objects in the game.
* Usually there should be two players for every game. The
* human main player and the cpu player, which is the enemy.
* Technically they are exactly the same.
*
*/

/**
*
* Game Players
*
* Defines the player objects in the game.
* Usually there should be two players for every game. The
* human main player and the cpu player, which is the enemy.
* Technically they are exactly the same.
*
*/

var Player = {

    /**
     * Init a player object.
     * 
     * @param {object} playerData Player data
     * @return void
     */
    player : function( playerData ) {
        this.id             = playerData.id || 0;
        this.name           = playerData.name || 'default',
        this.currentLife    = playerData.currentLife || 3;
        this.maxLife        = playerData.maxLife || 3;
        this.type           = playerData.type || 'standard';
        this.stats          = playerData.stats || {
                rock : 33.33,
                scrss : 33.33,
                paper : 33.33,
            };
        this.tips   = playerData.tips || [];
        this.items  = playerData.items || [];
    },

    /**
     * Remove a life
     * 
     * @return void
     */
    removeLife : function() {
        this.currentlife--;

        if ( this.currentLife < 0 ) {
            this.currentLife = 0;
        }
    },
    
};

/**
 * Define exclusive Human player methods.
 */
var Hero = Object.create( Player );

/**
 * Hero init method
 * 
 * @param {obejct} playerData Player Data
 * @return {object}
 */
Hero.init = function( playerData ) {
    this.player( playerData );
    return this;
}

/**
 * Add item
 * 
 * @param {number} item item to add
 * @return void
*/
Hero.addItem = function( itemId ) {
    if ( this.items.hasOwnProperty( itemId ) ) {
        this.items[ itemId ]++;
    } else {
        this.items[ itemId ] = 1;
    }
};

/**
 * Remove item
 * 
 * @param {number} itemId
 * @return void
 */
Hero.removeItem = function( itemId ) {
    if ( this.items.hasOwnProperty( itemId ) 
    && typeof this.items[ itemId ] !== 'undefined' 
    && this.items[ itemId ] > 0 ) {
        this.items[ itemId ]--;
    }
};

/**
 * Update player action percentages
 * 
 * @param {string} item Item to be updated - Can be rock, paper, scrss
 * @param {number} quantity Amount to update.
 * @return void
 */
Hero.updateActions = function( item, quantity ) {
    let toDivide = parseFloat( quantity / 2 );

    // recalculate rest of the options to balance the percentages.
    for ( let key in this.stats ) {
        
        if ( key == item ) {
          this.stats[ key ] = parseFloat( this.stats[ key ] + quantity ); 
        } else {
          this.stats[ key ] = this.stats[ key ] - toDivide;
        }
  
        this.stats[key] = Engine.checkMinMax( this.stats[key] );
    }
};

/**
 * Define Ememy exclusive actions
 */
var Enemy = Object.create( Player );

/**
 * Enemy init method
 * 
 * @param {obejct} playerData Player Data
 * @return {object}
 */
Enemy.init = function( playerData ) {
    this.player( playerData );
    return this;
}

/**
 * Generate Enemy action
 * 
 * @return {string} cpuOption
 */
Enemy.getOption = function() {
    let cpuOption     = '';
    let randonNumber  = Engine.generateRandomNumber();
    let options       = Engine.sortOptions( this.stats );
    options           = Engine.getOptionsRanges( options );
  
    if( randonNumber <= options[0].value )
      cpuOption = options[0].text;
    else if( randonNumber <= options[1].value )
      cpuOption = options[1].text;
    else
      cpuOption = options[2].text;
  
    return cpuOption;
};