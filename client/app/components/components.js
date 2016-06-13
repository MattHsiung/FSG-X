import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Login from './login/login';
import Members from './members/members';

let componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Login.name,
  Members.name
]);

export default componentModule;
