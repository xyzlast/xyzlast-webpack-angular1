'use strict';

export default class HomeController {
  constructor(CodeService) {
    this.models = {

    };
    this.name = 'World';
    this.codeService = CodeService;
  }

  getName() {
    return this.name;
  }

  changeName() {
    this.codeService.getCodes('ykyoon').then(result => {
      console.log(result);
    });
  }
}
