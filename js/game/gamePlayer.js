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
    
        /**
         * Add item
         * 
         * @param {number} item item to add
         * @return void
         */
        addItem : function( itemId ) {
            if ( this.items.hasOwnProperty( itemId ) ) {
                this.items[ itemId ]++;
            } else {
                this.items[ itemId ] = 1;
            }
        },
    
        /**
         * Remove item
         * 
         * @param {number} itemId
         * @return void
         */
        removeItem : function( itemId ) {
            if ( this.items.hasOwnProperty( itemID ) 
                && typeof this.items[ itemId ] !== 'undefined' 
                && this.items[ itemID ] > 0 ) {
                    this.items[ itemId ]--;
            }
        },
        
};