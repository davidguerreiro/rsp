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

    // player base data.
    data : {
        id : 0,
        name : 'default',
        currentLife : 3,
        totalLife : 3,
        type : 'standard',
        stats : {
            rock : 33.33,
            paper : 33.33,
            scrss : 33.33,
        },
        tips : [],
        items : [],
    },

    /**
     * Init a player object.
     * 
     * @param {object} playerData Player data
     * @return void
     */
    init : function( playerData ) {
        if ( typeof playerData == 'object' && playerData.length > 0 ) {
            this.data = playerData;
        }
    },

    /**
     * Remove a life
     * 
     * @return void
     */
    removeLife : function() {
        this.data.currentlife--;

        if ( this.data.currentLife < 0 ) {
            this.data.currentLife = 0;
        }
    },

    /**
     * Add item
     * 
     * @param {number} item item to add
     * @return void
     */
    addItem : function( itemId ) {
        if ( this.data.items.hasOwnProperty( itemId ) ) {
            this.data.items[ itemId ]++;
        } else {
            this.data.items[ itemId ] = 1;
        }
    },

    /**
     * Remove item
     * 
     * @param {number} itemId
     * @return void
     */
    removeItem : function( itemId ) {
        if ( this.data.items.hasOwnProperty( itemID ) 
            && typeof this.data.items[ itemId ] !== 'undefined' 
            && this.data.items[ itemID ] > 0 ) {
                this.data.items[ itemId ]--;
        }
    },
    
};