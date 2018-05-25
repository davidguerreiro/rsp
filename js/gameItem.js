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

    data : {
        id : 0,
        name : 'default',
        description : '',
        rate : 50,
        icon : '',
    },

    /**
     * Item init method
     * 
     * @param {object} data Data
     * @return void
     */
    init : function( data ) {
        if ( typeof data == 'object' && data.length > 0 ) {
            this.data = data;
        }
    }
};
var Items = {};

// init potion.
var itemData = {
    id : 0,
    name : 'Potion',
    description : 'Recovers one hearth',
    rate : 50,
    icon : 'fa fa-flask',
};

Items.potion = Object.create( Item );

// TODO: Replace this by dynamic data comgin from items JSON file.
Items.potion.init( itemData );

/**
 * Potion usage method.
 * 
 * @param {object} player Player object
 * @return void
 */
Items.potion.useItem = function( player ) {
    
}
