// Storing products in 'Product' database

var mongoose = require('mongoose');
// Schema: the blueprints/plans for how this is being built
// grabbing Schema object from mongoose
var Schema = mongoose.Schema;

// if we hadnt created the "Schema" variable, we wont be able to use the "new" js constructor syntax
var product = new Schema({
	// define data with the type you want
	title: String,
	price: Number,
	likes: {type: Number, default: 0}
});

// module.exports : a node thing, allows us to export something from our file that other file can import
// mongoose.model: .model is a mongoose's reserved function, which you pass in the name of the model itself 'Product' (this is what actually its gonna store into the database)
// what you write here is gonna go into Mongo (the actual database)!
// So, when you're doing a query from mongo shell, you type 'db.products.find()'
module.exports = mongoose.model('Product',product);
