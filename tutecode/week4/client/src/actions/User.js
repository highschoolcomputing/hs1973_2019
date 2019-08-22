import {
  USER_NAME_GET,
  USER_NAME_SET
} from './actionTypes';

export function getName() {
  return {
    type: USER_NAME_GET,
    fetch: {
      url: `/api/name/get`,
      body: {
      },
    },
  };
}

export function setName(name) {
  return {
    type: USER_NAME_SET,
    fetch: {
      url: `/api/name/set`,
      body: {
        name,
      },
    },
  };
}
