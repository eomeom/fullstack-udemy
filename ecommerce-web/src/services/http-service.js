// helps downloading contents from localhost:3000/product to localhost:3001 (react page)
// makes sure the data from localhost:3000/product is coming through our "server"
// should be the very first thing to do when building a web app

import 'whatwg-fetch';

// class: kinda like a function object, used when you wanna make a function using a function constructor object
// reusable class
// this class fetches a list of products from the api
// => this is how you write function in ES6
class HttpService {
	// "getProducts" function is "fetch"ing and "then" "response"ing to the "log"
	getProducts = () => {

		const url = "http://localhost:3000/product";

		// making promises (called first)
		// new Promise: new class named "Promise"
		var promise = new Promise((resolve, reject) => {
			// fetch: expects a url that we wanna pass in (where our api of our "product" is)
			// for more information about the syntax, go to www.npmjs.com/package/whatwg-fetch
			// (called second), making an asychronous request we dont know when its gonna come back
			fetch(url)
			// .then: function of fetch, fetch and .then come hand in hand (fetch.then), when fetch does its thing, its gonna call the .then
				.then(response => {
				// send back response as promised
				// (called fourth), request is not as fast as the browser can process\
				resolve(response.json());
				// if the request is not sucessful
				reject("It is rejected!")
				//  take the response and convert it into json
				// console.log(response.json());
			})
		});

		// (called third), we're returning the "promise" immediately back to whoever is asking for. That way, they can hold on to the promise and at some later point in time, that promise will be fulfilled.
		// ex) if you have a mortgage of a home, the bank holds the interests on the house until you're done paying off. You're promising that you are gonna pay and at some point of the time they will deliver you the deed to the house.
		return promise;

	}

};

// the ES6 way of writing "module.exports = HttpService"
export default HttpService;

//  side note
//  getProducts = param1 => /*for one parameter*/
// getProducts = (param1, param2) => {
//
// }
//  same notation as this in javascript
// var getProducts = function (param1, param2) {
//
// }
