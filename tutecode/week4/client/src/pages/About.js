/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as User from '../actions/User';

import Header from '../components/Header';

import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div>Name: {this.props.name}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.user.name,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(
  Home
);
