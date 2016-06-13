// import template from './secretStash.jade';
import template from './secretStash.html';
import controller from './secretStash.controller';
import './secretStash.sass';

let secretStashComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default secretStashComponent;