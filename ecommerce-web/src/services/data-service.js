// Singleton : if there's only ever one instance in memory

// importing the global constant "NOTIF_WISHLIST_CHANGED"
import NotificationService, {NOTIF_WISHLIST_CHANGED} from './notification-service';

// normally when you do "new", it creates a new copy but here,
// it will only happen once. no matter how many times i would create a "new NotificationService" it still will be referencing the same one in memory. VERY IMPORTANT!!
// we want a notification whenever we're adding or removing a wishlist item.
// ns: "NotificationService" function
let ns = new NotificationService();

let instance = null;
var wishList = [];

class DataService {

	constructor() {

		// the very first time someone creates a data service i.e) "instance" is not null and the data is saved to "instance" permanently
		if (!instance) {
			instance = this;
		}

		// normally we will "return" with some new data stored but with singleton, it will just return that one data in "instance"
		return instance;

	}

	// when someone clicks the "Add to Wishlist!" button
	addWishListItem = item => {

		wishList.push(item);
		// We need (notifName, data) in our "postNotification" function
		ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);

	}

	// when someone click the x button it will call the "removeWishListItem" function
	// and the item that we click the x on will be passed into "item" parameter
	removeWishListItem = item => {

		// then we go through the entire wishlist to find the item that matches the one that we wanna get rid of
		// actually "for" loop is not a very effecient way, instead, we should probably use a dictionary and store objects with their unique ids.
		for (var x = 0; x < wishList.length; x++) {

			if (wishList[x]._id === item._id) {

				// remove one element in that index x, removes the item
				wishList.splice(x, 1);
				ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
				break;

			}
		}

	}

	itemOnWishList = item => {

		for (var x = 0; x < wishList.length; x++) {

			if (wishList[x]._id === item._id) {
				return true;
			}
		}
		// if it is not returning true i.e. if no item is on the wishlist
		return false;
	}
};

export default DataService;
