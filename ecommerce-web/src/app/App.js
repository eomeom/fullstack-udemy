// {}: importing a specific thing inside of the "React" package
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

// Components
import Product from '../product/product';
import Wishlist from '../wishlist/wishlist';

// Services
import HttpService from '../services/http-service';

// const: a ES6 thing, cant be modified, it can only be accessed; var can be modified
const http = new HttpService();

class App extends Component {
	// to get the "HttpService" class to load
	// part React part ES6 "constructor", it is the very first thing that is called when the class "App" and the "Component" loads
	constructor(props) {
		// super: super constructor
		super(props);

		//	  state: an object that holds different properties, current state of the component
		//	  every product that came from the database/api/internet will be stored in the "products:[]" "state"
		//	  we dont have to initialize the "state" of product as an empty array. the reason why its left empty here, is because it may not have data in the beginning and we dont want anything "null".
		//	  i.e. if there are no products, the component should just display 0; if its "null", it will have some problem
		this.state = {
			products: []
		};

		// in React, we HAVE to "bind" ES6 functions (more info go search ES6 bind or React ES6 bind)
		// binding the class with the "loadData" function
		// let these functions (loadData, productList), to bind with the "loadData" function below
		this.loadData = this.loadData.bind(this);
		this.productList = this.productList.bind(this);

		// after binding, we calls it!
		this.loadData();
		// this.productList();
	}

	// creating function in node (ES6) parameter
	loadData = () => {
		//	  before the "promise" is loaded we set a var for "this" here that could refer to our "Component"
		//	  Once we get into the "promise", "this" no longer reads the "this" from "constructor", it reads the "this" from the "promise"
		//	  GOTTA MAKE REFERENCE FIRST when "promise" exists inside the same function
		var self = this;
		//	  when "getProducts" is called its "return"ing a promise to us. its holding on to a memory
		//	  when the request is done and successful, ".then" calls the function "data", and list/download out the products; if not successful, ".then" calls the "err" function
		//	  same as .then(data,error) {} in js way
		//	  "data" variable contains stuff from "resolve" in http-service.js. in this case, a json response
		http.getProducts().then(data => {
			//		   when the browser loads, its gonna print out the "products" from localhost:3000/product in the console
			//		  console.log(products);
			//		  when we call the products through "getProducts" function from http-service.js
			//		  this.setState({products: data }): will read "this" from "Promise" function
			//		  everytime when ".setState" is called in React, it will reload that "Component", in this case, "Products" and all the components that are inside of it
			//		  *rule of thumb* setState: if you want anything to refresh, to update in your UI
			self.setState({products: data})
			// "err" variable contains stuff from "reject" in http-service.js. in this case, a json response
		}, err => {});
	}

	//   function that could display multiple "Product"
	//   iterate through the "products" that we get from json and we're going to create product attrubute
	productList = () => {
		//       for every item in "this.state.products" array, "map" each product item and spits it
		//       .products came form "this.state" from above
		//       goes through each product in the array and its gonna call the "product" function and pass it in and do something with it
		//       .map: a javascript function, which goes through every element in an array, and you can do something and then returns it into a list when its all done. for more information, search through "javascript map" online
		const list = this.state.products.map((product) =>
		//         we wanna create a "Product" "Component" every single time
		//         whenever we're working with "list" in React, we have to give a unique identifier "key" in our list, otherwise it wont function properly
		//         in our case, our data from mongoDB has a unique mongoDB id i.e. _id, so we can use that here as a unique id
		<div className="col-sm-4" key={product._id}>
			{/* adding the "Product" class from "product.js" file i.e. <Product /> */}
			{/* an entity or a component, has things that are changable (state) and things that are not changable (props) */}
			{/* props: short for property, an attribute that are read-only. come down from upper component to lower component. they never create themselves, they always come up from above. */}
			{/* price, title, imgUrl are all props, these key names are very important */}
			<Product product={product}/>
		</div>);
		// "return"ing the list
		return (list);
	}

	render() {
		return (<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo"/>
				<p>My first eCommerce website with React!</p>
			</header>
			<div className="container-fluid App-main">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							{/* calling the "productList" function from above */}
							{/* you could add items here manually but doesnt make sense if there are tons of items that are changing constantly from the database */}
							{this.productList()}
						</div>
					</div>
					<div className="row">
					<div className = "col-sm-6" >
						<Wishlist />
					</div>
					{/* You can also pass in a wishlist pointing to other data-service, which could be your mom's wishlist or dad's wishlist */}
					<div className = "col-sm-6" >
						<Wishlist />
					</div>
				</div>
			</div>
		</div>
	</div>
);
}
}

export default App;
