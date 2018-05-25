
/**
*
* Game Engine
*
* Build with vanilla js.
*
*/


// GENERATE CPU OPTION RESPONSE

var engine = {

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
  * Modify the player options percentage.
  * All unmodify options will be automatically recalculated to balance
  * the result.
  * TODO: Add percentages as a dynamic parameter.
  * 
  * @param {string} item Option to increment
  * @param {number} amount Option will be increased this amount 
  * @return {object} response
  */
  addPercentage: function( item, quantity ) {
    let response = {
      status : 'error',
      message : '',
    };

    // item should be a valid choice
    if( item !== 'rock' && item !== 'paper' && item !== 'scrss' ) {
      response.message = 'Invalid item / choice parameter';
      return response;
    }

    // amount should be a valid value
    if ( quantity < 0 || quantity > 99.99 ) {
      response.message = 'Invalid quantity. This should be higer than 0 and less than 99.99';
      return response;
    }

    // TODO: Add this as a dinamy parameter
    let current = {
      rock : 33.33,
      paper : 33.33,
      scrss : 33.33,
    };

    let toDivide = parseFloat( quantity / 2 );

    // recalculate rest of the options to balance the percentages.
    for ( let key in current ) {
      
      if ( key == item ) {
        current[ key ] = parseFloat( current[ key ] + quantity ); 
      } else {
        current[ key ] = current[ key ] - toDivide;
      }

      current[key] = this.checkMinMax( current[key] );
    }

    response.current = current;
    response.status = 'success';
    
    return response;
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
        'paper' = false,
        'scrss' = true,
      ],
      'scrss' = [
        'rock'  = false,
        'paper' = true,
      ],
      'paper' = [
        'scrss' = false,
        'rock'  = true,
      ],
    ];
    
    return result[ playerOption ][ cpuOption ];
  }

};

/**
 * Game progression and status changes
 */

/**
*
* This function modifies the console text
*
* @param {Array} text
* @return void
*/
/*
function set_console_text( text_elements ) {

  let $console_text_element = $('#console-element');
  let length                = text.length();
  let text                  = ''; 
  var i                     = 0;

  //each text element is a paragraph
  for( i = 0; i < length; i++ ) {

    text += "<p class='console_p'>"
            + text_elements[i]
            + "</p>";

  }

  $console_text_element.html( text );

}
*/
  /*
  let current = {
    rock : 20.33,
    paper : 38.33,
    scrss : 33.33
  };

  let test = sort_options( current );
  //let test_2 = get_cpu_option();
  console.log( test );
  //console.log( test_2 );
  */
 
  /*
  var json_file = read_json_file( 'cpu_players' );
  console.log( json_file );
  */




/**
 * Events displayed trought user interaction
 */

/**
 * Game Updating
 */
var gameProgress = Object.create( engine );