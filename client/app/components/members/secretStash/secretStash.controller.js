class SecretStashController {
  constructor($http) {
    this.name = 'secretStash';
    this.$http = $http;
  }
  getStash() {
  	this.$http.get('api/members/secret-stash')
  		.then(({data}) => this.stash = data);
  }

  close() {
    this.stash = null;
	}
}

SecretStashController.$inject=['$http'];

export default SecretStashController;