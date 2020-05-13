// copied from "product.js"
// for this case, not downloading from our api/database
import React, {Component} from 'react'
import './wishlist.css'
import ProductCondensed from '../product-condensed/product-condensed';

//Data Service
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ns = new NotificationService();

class Wishlist extends Component {

	constructor(props) {
		super(props);

		this.state = {
			wishList: []
		};

		// Bind functions
		this.createWishList = this.createWishList.bind(this);
		this.onWishListChanged = this.onWishListChanged.bind(this);
	}

	// Wishlist to "listen" when the button is clicked "componentDidMount" and "componentWillMount" are specific React functions that will be called when the component is about to load,
	// or when it is loaded on the screen,
	// it will do
	// 	something
	// we 're adding ourselves as observer here
	componentDidMount() {
		// NOTIF_WISHLIST_CHANGED : adding the name,
		// this: adding the object itself thats observing(us)
		// this.onWishListChanged : component callback that we wanna be called,
		// when its time to be notified.the callbacks are all different based on what notification you chose
		ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
	}

	// this is for when the component is unloaded we 're removing ourselves as observer there
	// if we dont remove ourselves as observer, we might have memory leak in our app, because the notification system is still holding on to the entire component, even though it is not on the screen anymore, it might stay there sucking the memory
	componentWillUnmount() {
		ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
	}

	// We want to listen to the list of items in the list and reset
	onWishListChanged(newWishList) {
		this.setState({wishList: newWishList});
	}

	createWishList = () => {
		const list = this.state.wishList.map((product) =>
		<ProductCondensed product={product} key={product._id}/>
	);
	return (list);
}

render() {
	return (<div className='card'>
		<div className="card-block">
			<h4 className="card-title">Wish List</h4>
			<ul className="list-group">
				{/* creating a new "component" just for the wishlist */}
				{this.createWishList()}
			</ul>
		</div>
	</div>);
}
}

export default Wishlist;
