'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    template: require('../public/home.html'),
    controller: 'HomeController',
    controllerAs: 'home'
  }).state('user', {
    url: '/user',
    template: require('../public/user.html'),
    controller: 'UserController'
  });
};
