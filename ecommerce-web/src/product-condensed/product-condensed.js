// creating single line items
// copied from "wishlist.js"
import React, {Component} from 'react'
import './product-condensed.css'

// Data Service
import DataService from '../services/data-service'

let ds = new DataService();

class ProductCondensed extends Component {

	constructor(props) {
		super(props);

		// Bind Funtion
		this.removeProduct = this.removeProduct.bind(this);
	}

	removeProduct = () => {
		ds.removeWishListItem(this.props.product);
	}

	render() {
		return (<li className="list-group-item pc-condensed">
			{/* outline -> doesnt fill out solid color */}
			<a href="#" className="btn btn-outline-danger" onClick={() => this.removeProduct()}>x</a>
			{this.props.product.title}
			|
			<b>${this.props.product.price}</b>
		</li>);
	}
};

export default ProductCondensed;
