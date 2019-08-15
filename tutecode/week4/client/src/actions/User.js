import * as types from './actionTypes';

export function getName() {
  return {
    type: types.USER_NAME_GET,
    fetch: {
      url: `/api/name/get`,
      body: {
      },
    },
  };
}

export function setName(name) {
  return {
    type: types.USER_NAME_SET,
    fetch: {
      url: `/api/name/set`,
      body: {
        name,
      },
    },
  };
}
