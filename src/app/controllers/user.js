'use strict';

export default class UserController {
  constructor($scope) {
    this.$scope = $scope;
    this.$scope.username = (new Date()).toString();
    console.log('UserController.init');
  }

  getUserName() {
    return this.$scope.username;
  }
}
