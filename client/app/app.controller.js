class AppController {
	constructor(AuthFactory) {
		this.auth = null;
		this.AuthFactory = AuthFactory;
	}

	$onInit() {
      	this.auth = this.AuthFactory.getLoggedInUser();
      	if (this.AuthFactory.isAuthenticated()) this.AuthFactory.getUser();
    }
};

AppController.$inject = ['AuthFactory'];

export default AppController;