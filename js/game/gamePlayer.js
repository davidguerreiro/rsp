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