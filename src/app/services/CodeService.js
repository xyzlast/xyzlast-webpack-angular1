'use strict';

import BaseService from './BaseService';

export default class CodeService extends BaseService {
  constructor() {
    super();
  }

  getCodes(id) {
    console.log(super.http());
    const q = Promise.resolve({
      data: {
        name: 'OK'
      }
    });
    return super.process(q);
  }
}

