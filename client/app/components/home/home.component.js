import template from './home.html';
//supports jade also
// import template from './home.jade';
import controller from './home.controller';
import './home.sass';

let homeComponent = {
  restrict: 'E',
  bindings: {
  	user: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default homeComponent;
