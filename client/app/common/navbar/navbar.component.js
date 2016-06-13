import template from './navbar.html';
import controller from './navbar.controller';
import './navbar.sass';

let navbarComponent = {
  restrict: 'E',
  bindings: {
  	user: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default navbarComponent;
