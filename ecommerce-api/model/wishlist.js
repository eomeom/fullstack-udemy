// Storing wishlists in 'Wishlist' database

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var wishList = new Schema ({
	// you can add more than one option to the criteria
	/*when a user didnt give name to the title, it will show a default one*/
	title: {type: String, default: "Cool Wish List"},
	// we wanna reference the products from 'Product' database, using ObjectId and put them into this database object, because they want a "relationship"
	products: [{type: ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('Wishlist',wishList);
