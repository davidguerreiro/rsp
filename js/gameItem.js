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
