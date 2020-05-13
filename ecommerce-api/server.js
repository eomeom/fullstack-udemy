var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// connects to database
var db = mongoose.connect('mongodb://localhost/eCommerce');
var Product = require('./model/product');
var Wishlist = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Access control
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Creating end point API
// works even after server dies

app.post('/product', function(request, response) {

	var product = new Product();
	product.title = request.body.title;
	product.price = request.body.price;
	product.save(function(err, savedProduct) {
		if (err) {
			response.status(500).send({error: "Could not save product"});
		} else {
			// only sending the newly created product so that you dont have to refresh the whole list to see whether the newly created product is there or needs to add it
			// response.send(savedProduct) and response.json(savedProduct) give you the same result
			response.status(200).send(savedProduct);
		}
	});

	//  is the same as
	// var product = new Product (request.body);
	//  and
	// var product = new Product({
	// 	title: request.body.title,
	// 	price: request.body.price,
	// });

});

// "get" usually works after you "post" something in there
app.get('/product', function(request, response) {
	// .find: just like in mongo shell to list out all the objects
	// after finding all the objects in "Product" database, it will go to the function (err, products)
	Product.find({}, function(err, products) {
		if (err) {
			response.status(500).send({error: "Could Not fetch Products"})
		} else {
			response.send(products);
		}
	});
	//  what I wrote (wrong)
	// var product = Product();
	//  product.title = request.body.title;
	//  product.price = request.body.price;
	// response.send(product);
});

app.delete('/product/:id', (req, res) =>
Product.deleteOne({
	_id: req.params.id
}, (err, product) => {
	if (err) {
		res.send('error removing')
	} else {
		console.log(product);
		res.status(204);
	}
}));

app.post('/wishlist', function(request, response) {
	var wishList = new Wishlist();
	// you can add "Air handing" here before requesting
	wishList.title = request.body.title;

	wishList.save(function(err, newWishList) {
		if (err) {
			response.status(500).send({error: "Could not create Wishlist"})
		} else {
			response.send(newWishList);
		}
	});
});

// updating wishlists
app.put('/wishlist/product/add', function(request, response) {
	// find one particular item with the id passed up from the client
	Product.findOne({
		_id: request.body.productId
	}, function(err, product) {
		if (err) {
			response.status(500).send({error: "could not add item to wishlist"});
		} else {
			// .update: updates the "Wishlist" model
			// syntax is kinda like when you're using mongodb shell
			// the product data in the "Wishlist" database is in array, so gotta grab the product to update by its id i.e. product._id
			Wishlist.update({
				_id: request.body.wishlistId
			}, {
				$addToSet: {
					products: product._id
				}
			}, function(err, wishlist) {
				if (err) {
					response.status(500).send({error: "could not add item to wishlist"});
				} else {
					response.send("Successfully added product id into wishlist!");
				}
			});
		}
	});

});

//  this will only gives you the "ObjectId" of the product, which doesnt make sense
// app.get('/wishlist', function(request, response) {
// 	Wishlist.find({}, function(err, wishlists) {
// 		if (err) {
// 			response.status(500).send({error:"Could not fetch wishlist"})
// 		} else {
// 			response.send(wishlists)
// 		}
// 	});
//
// });

// to populate the data in product, i.e. showing all data item instead of just the id
app.get('/wishlist', function(request, response) {
	// find all the wishlist, path: go to that criteria i.e. products and populate it with the data that is in "Product" model
	Wishlist.find({}).populate({path: 'products', model: 'Product'}).exec(function(err, wishlists) {
		if (err) {
			response.status(500).send({error: "Could not populate the wishlist with products"})
		} else {
			response.send(wishlists)
		}
	});
});

app.listen(3000, function() {
	console.log("eCommerce API running on port 3000...");
});
