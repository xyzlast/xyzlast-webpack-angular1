'use strict';

export default class BaseService {
  constructor(Restangular) {
    this.Restangular = Restangular;
  }

  http() {
    return this.restangular;
  }

  process(q) {
    return q.then(result => {
      return result.data;
    });
  }
}
