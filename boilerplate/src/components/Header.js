import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';

@withRouter
export default class Header extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div>
        <Link to='/'>Home</Link>
        <Link to='/newStudent'>New Student</Link>
      </div>
    );
  }
}
