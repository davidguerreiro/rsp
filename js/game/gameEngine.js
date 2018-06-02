
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
