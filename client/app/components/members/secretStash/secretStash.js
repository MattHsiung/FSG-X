import angular from 'angular';
import uiRouter from 'angular-ui-router';
import secretStashComponent from './secretStash.component';

let secretStashModule = angular.module('secretStash', [
  uiRouter
])

.component('secretStash', secretStashComponent);

export default secretStashModule;
