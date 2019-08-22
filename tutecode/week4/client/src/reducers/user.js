import {
  USER_NAME_SET,
  USER_NAME_GET,
} from '../actions/actionTypes';

const initial_state = {
  name: '',
};

const user = (state = initial_state, action) => {
  console.log('reducer', state, action);
  switch (action.type) {
    case USER_NAME_SET:
      return Object.assign({}, initial_state, {
        name: action.body.data.name,
      });
    case USER_NAME_GET:
      return Object.assign({}, initial_state, {
        name: action.body.data.name,
      });
    default:
      return state;
  }
}

export default user;