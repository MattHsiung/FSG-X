import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';
import './app.sass';
import './deleteMe.sass';

angular.module('app', [
  uiRouter,
  Common.name,
  Components.name
])
.config(($urlRouterProvider, $locationProvider) => {
  "ngInject";
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.when('/auth/:provider', () => window.location.reload());
})

.component('app', AppComponent)

.run(function ($rootScope, AuthFactory, $state) {
  "ngInject";
  $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {

    if (toState.requireAuth && !AuthFactory.isAuthenticated()){
      $state.go("login");
      event.preventDefault();
    };
  });
});