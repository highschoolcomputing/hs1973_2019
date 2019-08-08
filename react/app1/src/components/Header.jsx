import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link> - <Link to="/about">About</Link>
        <h1>Hello!</h1>
      </div>
    );
  }
}

export default Header;
