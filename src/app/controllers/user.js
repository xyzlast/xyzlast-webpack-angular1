'use strict';

export default class UserController {
  constructor() {
    this.username = (new Date()).toString();
    console.log('UserController.init');
  }

  getUserName() {
    return this.username;
  }

  getElement() {
    // const angular = require('angular');
    console.log(angular.element('#div'));
  }
}
