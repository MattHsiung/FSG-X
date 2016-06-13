class HomeController {
  constructor(AuthFactory) {
    this.name = 'home';
  }
}

HomeController.$inject = ['AuthFactory']

export default HomeController;
