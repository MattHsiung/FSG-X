class AppController {
	constructor(AuthFactory) {
		this.auth = null;
		this.AuthFactory = AuthFactory;
	}

	$onInit() {
      	this.auth = this.AuthFactory.getLoggedInUser();
      	this.AuthFactory.getUser();
    }
};

AppController.$inject = ['AuthFactory'];

export default AppController;