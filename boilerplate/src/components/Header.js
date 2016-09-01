import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';

const paths = [
  [ '/', 'Home', true],
  [ '/newStudent', 'New Student', false ],
];

@withRouter
export default class Header extends Component {
  static propTypes = {
    router: React.PropTypes.object,
  };

  link([path, text, isIndex]) {
    const isActive = this.props.router.isActive(path, isIndex);
    return (
      <li key={path} role='presentation' className={isActive ? 'active' : ''}><Link to={path}>{text}</Link></li>
    );
  }

  render() {
    return (
      <ul className='nav nav-pills'>
        {
          paths.map(this.link.bind(this))
        }
      </ul>
    );
  }
}
