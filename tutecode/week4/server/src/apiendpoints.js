const fs = require('fs');
const path = require('path');
  
const { StandardResponseError } = require('./general/error');

const filePath = path.resolve(__dirname, '../global_state.json');

let global_state = {};
try {
  const fileString = fs.readFileSync(filePath, 'utf8');
  global_state = JSON.parse(fileString);
} catch (err) {
  global_state = {
    suburbs: [ 'kensington', 'randwick', 'kingsford', ],
    students: [
      {
        'name' : 'Andrey',
        'age' : 16,
      },
      {
        'name' : 'Pasta',
        'age' : 15,
      }
    ],
    name: '',
  }  
}

const middlewareExample = async (req, res, params) => {
  console.log('Middleware');
};

const nameSet = async (req, res, params) => {
  //console.log('Terminal set', params.all());
  const json = JSON.stringify(global_state);

  global_state.name = params.get('name');
  console.log('global_state', global_state);
  fs.writeFileSync(filePath, json, 'utf8');

  return {
    name: global_state.name,
  }
};

const nameGet = async (req, res, params) => {
  //console.log('Terminal get', params.all());
  return {
    name: global_state.name,
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
