import template from './app.html';
import controller from './app.controller'
let appComponent = {
  template,
  controller,
  restrict: 'E',
  bindings: {},
  controllerAs: 'vm'
};

export default appComponent;