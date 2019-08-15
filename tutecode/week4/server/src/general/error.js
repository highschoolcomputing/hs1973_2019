class BaseResponseError extends Error {
  constructor(status_code = 200, title = '', message = '', ...args) {
    super(...args);
    Error.captureStackTrace(this, BaseResponseError);
    this._status_code = status_code;
    this._title = title;
    this._message = message;
  }

  get statusCode() {
    return this._status_code;
  }

  get title() {
    return this._title;
  }

  get message() {
    return this._message;
  }
}

class StandardResponseError extends BaseResponseError {
  constructor(title, message, ...args) {
    super(200, title, message, ...args);
    Error.captureStackTrace(this, StandardResponseError);
  }
}

class NonStandardResponseError extends BaseResponseError {}

// Errors when handling orders to and from the user.
class OrdersError extends Error {
  constructor(title = '', message = '', ...args) {
    super(...args);
    Error.captureStackTrace(this, BaseResponseError);
    this._title = title;
    this._message = message;
  }


  get title() {
    return this._title;
  }

  get message() {
    return this._message;
  }
};


module.exports = {
  BaseResponseError,
  StandardResponseError,
  NonStandardResponseError,
  OrdersError,
};
