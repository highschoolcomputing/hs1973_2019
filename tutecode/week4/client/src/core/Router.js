import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Christmas from '../pages/Christmas';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home {...props} />
            )}
          />
          <Route
            exact
            path="/about"
            render={props => (
              <About {...props} />
            )}
          />
          <Route
            exact
            path="/christmas"
            render={props => (
              <Christmas {...props} />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
