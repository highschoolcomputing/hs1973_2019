const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
const apiEndpoints = require('./apiendpoints');

const {
  BaseResponseError,
  StandardResponseError,
  NonStandardResponseError,
} = require('./general/error');
const {
  Payload,
  Params,
} = require('./general/requestresponse');

app.use(express.static(path.resolve('public')));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(cors());
app.options('*', cors());

const apiResponse = (
  res,
  status,
  error_exists,
  payload,
  error_title = '',
  error_msg = ''
) => {
  if (!res.headersSent) {
    res.status(status);
    res.json({
      data: payload,
      error_exists,
      error_title,
      error_msg,
    });
  }
};

const errorHandler = (res, err) => {
  console.log('Error caught', err);
  let title = 'General error';
  let message = '';
  let status = 500;
  if (err instanceof BaseResponseError) {
    title = err.title;
    message = err.message;
    if (err instanceof StandardResponseError) {
      status = 200;
    } else if (err instanceof NonStandardResponseError) {
      status = err.statusCode;
    }
  }
  apiResponse(res, status, true, {}, title, message);
};

const startHandler = (req, res) => {
  req.payload = new Payload();
  req.params = new Params(req);
};

const endHandler = (req, res) =>
  apiResponse(res, 200, false, req.payload.output);

const buildApiChain = endpoint => {
  let fn_chain = [startHandler];
  const { middleware, terminal } = apiEndpoints[endpoint];

  if (middleware) {
    fn_chain = fn_chain.concat(middleware);
  }
  if (terminal) {
    fn_chain.push(terminal);
  }
  fn_chain.push(endHandler);
  return fn_chain;
};

/*app.use('*', (req, res, next) =>
  res.sendFile(path.resolve('public', 'index.html'))
);*/

// Setup all api endpoints automatically
Object.keys(apiEndpoints).forEach(endpoint => {
  // This is a closure so that endpoint is wrapped into

  const fn_chain = buildApiChain(endpoint);

  // Wrap in the execute function
  const wrapped_chain = [];
  for (const fn of fn_chain) {
    wrapped_chain.push(async (req, res, next) => {
      try {
        const return_payload = await fn(req, res, req.params);
        req.payload.merge(return_payload);
        if (fn !== endHandler) {
          next();
        }
      } catch (err) {
        errorHandler(res, err);
      }
    });
  }
  app.all(`/api/${endpoint}`, wrapped_chain);
});

const port = 8080;
app.listen(
  port,
  () => console.log(`Pearler running at localhost:${port}`)
);