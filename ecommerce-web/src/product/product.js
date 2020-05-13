// {}: importing a specific thing inside of the "React" package
// "prop"s are already here, because the parent "Component" from App.js has already pass them down to their child here
import React, {Component} from 'react';
import './product.css';
// Data Service
import DataService from '../services/data-service';
// Notification Service
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ds = new DataService();
let ns = new NotificationService();

// "Product" class that inherits features from the "React" "Component"
class Product extends Component {

	constructor(props) {
		super(props);
		//	  Boolean type state (to check if the button should change colors or not), for when the "product" is on the "wishlist"
		this.state = {
			onWishList: ds.itemOnWishList()
		};
		// Bind functions
		this.onButtonClicked = this.onButtonClicked.bind(this);
		this.onWishListChanged = this.onWishListChanged.bind(this);
	}

	//  To refresh list
	componentDidMount() {
		ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
	}

	componentWillUnmount() {
		ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
	}

	onWishListChanged(newWishList) {
		this.setState({
			onWishList: ds.itemOnWishList(this.props.product)
		});
	}

	onButtonClicked = () => {
		// changing the state of button when we add or removing something
		// this sends a notification to the data server saying something has changed which states in the To refresh list section
		if (this.state.onWishList) {
			ds.removeWishListItem(this.props.product);
		} else {
			ds.addWishListItem(this.props.product);
		}
	}

	// in React, whenever you wanna show something on the screen, you call the "render" function
	// "render" function is not available in a regular ES6, it is a specific function particular to the "Component"
	// "render" function has to "return" stuff
	render() {

		//	  React can write conditional logic based styling for our components (for "itemOnWishList" function )
		var btnClass;

		if (this.state.onWishList) {
			btnClass = "btn btn-danger";
		} else {
			btnClass = "btn btn-primary";
		}

		// you HAVE to "return" everything, otherwise it will not work
		// whenever you're "return" something, you always have to "return" a container element of some kind i.e. <div>.
		return (
		// the classNames are a bootstrap thing for card
		<div className="card product">
			{/* always have to incldude the ending tag, wont work if you dont */}
			{/* src= this.props.imgUrl: gets the "imgUrl" "prop" that has just passed down from the parent "Component" which is from "App.js",*/}
			{/* {}: allows us to insert javascript in between them */}
			<img className="card-img-top" src={this.props.product.imgUrl} alt="Product"></img>
			<div className="card-block">
				{/* the < h4 > title is coming from the "title" prop that we gave from parent "Component" in App.js " */
				}
				<h4 className="card-title">{this.props.product.title}</h4>
					<p className="card-text">Price: ${this.props.product.price}</p>
					{/* onClink: leads you to that function. "onclick" in html */
				} {/* btnClass: a conditional logic function created above */
				} {/*this.state.onWishList ? "Remove From Wishlist" : "Add To Cart": ternary operation, operation that does a condition and if its true it chooses the operation on the left, and if its false, it chooses the operation on the right */
				} {/* if its "true" that the item is on the wishlist, then state the title as "Remove From Wishlist" */
				} {/* if its "false" that the item is on the wishlist, then state the title as "Add To Cart" */
				}
				<a href="#" onClick={() => this.onButtonClicked()} className={btnClass}>{
						this.state.onWishList
							? "Remove From Wishlist"
							: "Add To Cart"
					}</a>
			</div>
		</div>);
	}
}

// exporting to be accessible by other files
export default Product;
