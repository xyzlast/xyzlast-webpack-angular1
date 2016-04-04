'use strict';

import angular from 'angular';
import routing from './routes';
import uirouter from 'angular-ui-router';

import restangular from 'restangular-umd';
import homeController from './controllers/home';
import userController from './controllers/user';

import CodeService from './services/CodeService';

import NameButton from './directives/nameButton';

const app = angular.module('app', [
  uirouter,
  restangular
])
.config(routing)
.service('CodeService', CodeService)
.controller('HomeController', homeController)
.controller('UserController', userController)
.directive('nameButton', NameButton)
;

