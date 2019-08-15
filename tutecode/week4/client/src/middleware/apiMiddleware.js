import queryString from 'query-string';
import fetch from 'isomorphic-fetch';

export class ServerError {
  constructor(json, request) {
    this.code = json ? json.code : '';
    this.json = json;
    this.status = request.status;
    this.request = request;
  }
}

const toJSON = response => response.json();

function raise(json, request) {
  throw new ServerError(json, request);
}

function requestFromAction(action, next) {
  let { method, url, body } = action.fetch;
  const { query, files, headers = {} } = action.fetch;

  method = method ? method.toUpperCase() : 'POST';
  if (method === 'POST' && !headers['Content-Type'] && !files) {
    headers['Content-Type'] = 'application/json';
  }

  if (query) {
    url += `?${queryString.stringify(query)}`;
  }

  if (files) {
    body = new FormData();
    const values = action.fetch.body;
    if (values) {
      Object.keys(values).map(name => body.append(name, values[name]));
    }

    for (let i = 0; i < files.length; ++i) {
      body.append(`file${i}`, files[i]);
    }
  } else if (typeof body === 'object') {
    body = JSON.stringify(body);
  }

  return fetch('http://localhost:8080' + url, {
    method,
    body,
    headers,
    // credentials: 'include'
  }).then(response => {
    const { status } = response;
    if (status >= 200 && status < 300) {
      return toJSON(response).then(json => {
        next({ ...action, response, body: json });
      });
    }

    return toJSON(response).then(
      json => raise(json, response),
      error => raise(null, response)
    );
  });
}

export const apiMiddleware = store => next => action =>
  action.fetch ? requestFromAction(action, next) : next(action);
