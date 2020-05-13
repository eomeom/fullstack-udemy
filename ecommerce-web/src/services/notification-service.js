// Singleton set up
// let instance = null
//
// class SingletonService {
// 	constructor () {
// 		if (!instance) {
// 			instance = this;
// 		}
//
// 		return instance;
//
// 	}
// }

// To start posting notification in our data-service.js, we gonna need to have a central place where we can store them
// a global constant that can be accessed by anyone
// you dont want the developers who are using this notification-service, to accidently mispelled notification here and there
export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";

// very inefficient to make the observers in an array, because we have to loop through every single one
// instead create unique ids so it wont have to loop through
// the idea behind: when an observer wants to register, it should state which type of registeration it wants. and give it a name.
// and then we also pass in the function that we would like to be called when its time to register.
// this var will have "objects" full of arrays.
var observers = {};

let instance = null

// How Notification system or the observer pattern works:
// we store a list of observers (observer: a class or component, that would like to "listen", and so it registers, and when its time to be notified, it gets a notification)
// and when it detects a change, it will send out a notification
class NotificationService {

	constructor() {

		if (!instance) {
			instance = this;
		}

		return instance;

	}

	// in order to post a notification, it needs to know the name of the notification and what data you wanna pass into it (whether its a new wishlist or a new item or whatever it is that you want)
	// We need this "postNotification" whenever we added or removed a wishlist
	postNotification = (notifName, data) => {

		let obs = observers[notifName];

		// going through all the observers
		for (var x = 0; x < obs.length; x++) {

			var obj = obs[x];
			// and letting everybody know
			// "".callBack" is a function
			obj.callBack(data);
		}
	}

	// notifName: Name of the notification you would like to register for (the type)
	// observer: the component that wants to listen
	// callBack: a function that the observer wanna be called
	addObserver = (notifName, observer, callBack) => {

		// accessing the object ("observers") by its unique key ("notifName"),
		let obs = observers[notifName];

		// and if it doenst exist,
		if (!obs) {
			// the observers gives in an empty array, saying we have never registered that specific "notifName" before
			observers[notifName] = [];
		}

		let obj = {
			observer: observer,
			callBack: callBack
		};
		// if we have done the ".push" call without doing the "if(!obj)" call first, it will give you "null" after a break
		observers[notifName].push(obj);

	}

	removeObserver = (observer, notifName) => {
		var obs = observers[notifName];

		// dont need to go through if the "observer" list is null
		if (obs) {
			for (var x = 0; x < obs.length; x++) {
				// if the "observer" is the exact same one thats in memory
				// special case to use ""===" when comparing an object, comparing with the memory
				if (observer === obs[x].observer) {
					// then remove it
					obs.splice(x, 1);
					// and putting the array back, resetting the array back in the same slot, minus the one that has been removed "splice"
					observers[notifName] = obs;
					break;
				}
			}
		}
	}
};

export default NotificationService
