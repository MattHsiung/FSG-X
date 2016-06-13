import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loginComponent from './login.component';

let loginModule = angular.module('login', [
  uiRouter
])

.config(($stateProvider) => {
    "ngInject";
    $stateProvider
        .state('login', {
            url: '/login',
            template: `
            <section id="login-page">
            	<login></login>
            </section>`
    });
})

.component('login', loginComponent);

export default loginModule;
