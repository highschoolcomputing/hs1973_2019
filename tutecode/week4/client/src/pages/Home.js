/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as User from '../actions/User';

import Header from '../components/Header';

import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.updateText = this.updateText.bind(this);
    this.props.getName();
    //setInterval(, 1000);
  }

  updateText(e) {
    this.setState({
      name: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <Header />
        <input type="text" onChange={this.updateText} />
        <div>Name: {this.state.name}</div>
        <button onClick={() => this.props.setName(this.state.name)}>Click me</button>
        <div>Name: {this.props.name}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.user.name,
});

const mapDispatchToProps = dispatch => ({
  setName: (name) => dispatch(User.setName(name)),
  getName: () => dispatch(User.getName()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  Home
);
