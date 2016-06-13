import angular from 'angular';
import Navbar from './navbar/navbar';
import Auth from './auth/auth';
import './common.sass';

let commonModule = angular.module('app.common', [
  Navbar.name,
  Auth.name
]);

export default commonModule;