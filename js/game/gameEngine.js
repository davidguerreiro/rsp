
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
   * @return void
   */
  refreshInterface : function() {
    // init player 1 data.
    document.getElementById('player-name').innerHTML = player1.name;
    document.getElementById('player-life').innerHTML = player1.maxLife;

    // init cpu player data.
    document.getElementById('enemy-name').innerHTML = cpuPlayer.name;
    document.getElementById('enemy-life').innerHTML = cpuPlayer.maxLife;
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
    console.log(this.id);
  },
};
