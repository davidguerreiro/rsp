
/**
*
* Game Engine
*
* Build with vanilla js.
*
*/


// GENERATE CPU OPTION RESPONSE

/**
*
* This function generates a random number beetwen 0 and 100. This is supposed to be used to calculate which option is being used by the CPU player
*
* @return {number} number
*/
function generate_random_number() {

  let number = 0;
  let min    = 0;
  let max    = 100;

  number = Math.floor( Math.random() * ( max - min + 1 ) + min );

  return number;

}

/**
*
* This function reads a local JSON file
*
* @param {Sting} file_name
* @return {Object} data
*/
function read_json_file( file_name ) {

  let file_name = './../json/' + file_name + '.json';
  let data      = $.getJSON( file_name );

  return data;

}

/**
*
* This function sorts the option percentages from max to min
*
* @param {object} options
* @return {Array} options_array
*/
function sort_options( options ) {

  let array_options = [];

  for( var key in options )
    array_options.push( [ key, options[key] ] );

  // sort array
  array_options.sort( function( a, b ) {
    return a[1] - b[1];
  });

  return array_options;

}

/**
*
* Create range from 0 to 100 based on options probabilities
*
* @param {object} stats
* @return {object} ranges
*/
function get_options_ranges( stats ) {

  let ranges  = [];
  let range_1 = {};
  let range_2 = {};
  let range_3 = {};

  // calculate and reassing ranges
  range_1.text  = stats[2][0];
  range_1.value = parseInt( stats[2][1] );

  range_2.text  = stats[1][0];
  range_2.value = parseInt( stats[2][1] + stats[1][1] );

  range_3.text  = stats[0][0];
  range_3.value = 100;

  ranges.push( ...[range_1, range_2, range_3] );

  return ranges;

}

/**
*
* Returns option choosen by CPU
*
* @param {object} current
* @return {String} cpu_option
*/
function get_cpu_option( current ) {

  // TODO: Retrieve CPU player data from JSON object

  let cpu_option      = '';
  let random_number   = generate_random_number();
  let options         = sort_options( current );
  options             = get_options_ranges( options );

  // check random number value and
  if( random_number <= options[0].value )
    cpu_option = options[0].text;
  else if( random_number <= options[1].value )
    cpu_option = options[1].text;
  else
    cpu_option = options[2].text;

  return cpu_option;

}

/**
 * Game Updating
 */

/**
*
* Modify the player percentage of options. All the unmodified options will be automatically recalculated to balance the result
*
* @param  {String} item - The option we want to increase.
* @param  {number} qt - The amount we want to increase our choosen percentage option
* @return {object} response - Object which contains all the status data
*/
function add_percentage( item,  qt ) {

  let response = {
    status : 'error',
    message : ''
  };

  // item should be a valid choice
  if( item !== 'rock' && item !== 'paper' && item !== 'scrss' ) {
    response.message = 'Invalid item / choice parameter';
    return response;
  }

  // quantity should be a valid value
  if( qt < 0 || qt > 99.99 ) {
    response.message = 'Invalid quantity. This should be higer than 0 and less than 99.99';
    return response;
  }

  // init state of each choice
  let current = {
    rock : 33.33,
    paper : 33.33,
    scrss : 33.33
  };

  let to_divide = parseFloat( qt / 2 );

  // recalculating rest of the options to balance the percentages
  for( var key in current ) {

    if( key == item )
      current[key] = parseFloat( current[key] + qt );
    else
      current[key] = parseFloat( current[key] - to_divide );

    //check min / max
    current[key] = check_min_max( current[key] );

  }

  response.current     = current;
  response.percentages = parseFloat( current.rock + current.paper + current.scrss );

  if( response.percentages < 100 )
    response.status = 'success';

  return response;

}

/**
*
* This function checks if any percentage overpass the min/max parameters and ajust them
*
* @param {number} value
* @return {number} value
*/
function check_min_max( value ) {

  let min = 0;
  let max = 99.99;

  if( value < min )
    value = min;

  if( value > max )
    value = max;

  return value;

}

// GAME LOGIC

/**
*
* This function checks which player wins a round
*
* @param  {String} player_option
* @param  {String} cpu_option
* @return {String} winner
*/
function check_round_winner( player_option, cpu_option ) {

  let winner = '';

  //check tie
  if( player_option === cpu_option )
    winner = 'tie';
  else {

    // check rock
    if( player_option === 'rock' ) {

        switch( cpu_option) {
          case 'paper':
            winner = 'cpu';
            break;
          case 'scrss':
            winner = 'player';
            break;
        }

    }// end rock check
    else if( player_option === 'paper' ) {

      switch( cpu_option ) {
        case 'rock':
          winner = 'player';
          break;
        case 'scrss':
          winner = 'cpu';
          break;
      }

    } // end paper check
    else {

      switch( cpu_option ) {
        case 'rock':
          winner = 'cpu';
          break;
        case 'paper':
          winner = 'player';
          break;
      }

    } // end scrss check

  }// end tie check

  return winner;

}

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

$(document).ready( function() {

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
 
  var json_file = read_json_file( 'cpu_players' );
  console.log( json_file );




/**
 * Events displayed trought user interaction
 */


});
