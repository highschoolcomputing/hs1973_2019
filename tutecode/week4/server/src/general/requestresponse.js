const { NonStandardResponseError } = require('./error');

module.exports.Payload = class Payload {
  constructor() {
    this._data = {};
  }

  merge(obj) {
    // TODO: Check for conflicts
    if (obj !== undefined) {
      Object.assign(this._data, obj);
    }
  }

  get output() {
    return this._data;
  }
};

module.exports.Params = class Params {
  constructor(req, type) {
    this._params = type === 'GET' ? req.query : req.body;
  }

  get(key) {
    if (!Object.prototype.hasOwnProperty.call(this._params, key)) {
      throw new NonStandardResponseError(
        400,
        'Vars error',
        `${key} not passed in`
      );
    }
    return this._params[key];
  }

  getOptional(key) {
    if (!Object.prototype.hasOwnProperty.call(this._params, key)) {
      return undefined;
    }
    return this._params[key];
  }

  all() {
    return this._params;
  }
};
