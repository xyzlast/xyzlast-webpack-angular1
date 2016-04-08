require('./libs/kendo/styles/kendo.common.min.css');
require('./libs/kendo/styles/kendo.default.min.css');

import angular from 'angular';
window.angular = angular;
const kendo = require('kendo.all.js');
window.kendo = kendo;

import routing from './routes';
import uirouter from 'angular-ui-router';

import restangular from 'restangular-umd';
import homeController from './controllers/home';
import userController from './controllers/user';

import CodeService from './services/CodeService';
import NameButton from './directives/nameButton';

angular.module('app', [
  uirouter,
  restangular,
  'kendo.directives'
])
.config(routing)
.service('CodeService', CodeService)
.controller('HomeController', homeController)
.controller('UserController', userController)
.directive('nameButton', NameButton);
