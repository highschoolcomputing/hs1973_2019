const { StandardResponseError } = require('./general/error');

let global_name = '';

const middlewareExample = async (req, res, params) => {
  console.log('Middleware');
};

const nameSet = async (req, res, params) => {
  console.log('Terminal set', params.all());
  global_name = params.get('name');
  return {
    name: global_name,
  }
};

const nameGet = async (req, res, params) => {
  console.log('Terminal get', params.all());
  return {
    name: global_name,
  }
};

module.exports = {
  /*
   * Simple echo endpoint that will return what you passed in.
   * Used to test if system is functioning correctly
   */
  'name/set': { // http://localhost:8081/api/name/set
    type: 'GET',
    middleware: [ middlewareExample ],
    terminal: nameSet,
  },

  'name/get': {
    type: 'GET',
    middleware: [ middlewareExample ],
    terminal: nameGet,
  },
};
