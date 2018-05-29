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
    rawFile.onreadystatechange() = function() {
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

    for( let key in options ) {
      arrayOptions.push( [key, options[key] ] );
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
 * Returns option choosen by CPU
 * 
 * @param {object} current
 * @return {string} cpu_option
 */
 getCpuOption: function( current ) {
  // TODO: Retrieve CPT player data from JSON object

  let cpuOption     = '';
  let randonNumber  = this.generateRandomNumber();
  let options       = this.sortOptions( current );
  options           = this.getOptionsRanges( options );

  if( randonNumber <= options[0].value )
    cpuOption = options[0].text;
  else if( randonNumber <= options[1].value )
    cpuOption = options[1].text;
  else
    cpuOption = options[2].text;

  return cpuOption;
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
    let result = [
      'rock' = [
        'paper' = 1,
        'scrss' = 2,
        'rock'  = false,
      ],
      'scrss' = [
        'rock'  = 1,
        'paper' = 2,
        'scrss' = false,
      ],
      'paper' = [
        'scrss' = 1,
        'rock'  = 2,
        'paper' = false,
      ],
    ];
    
    return result[ playerOption ][ cpuOption ];
  }

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
    init : function( playerData ) {
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
    if ( this.items.hasOwnProperty( itemID ) 
    && typeof this.items[ itemId ] !== 'undefined' 
    && this.items[ itemID ] > 0 ) {
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