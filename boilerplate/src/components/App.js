import React, { Component } from 'react';

export default class App extends Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  state = {
    students: [],
  };

  render() {
    return (
      <div className='container'>
        { this.props.children }
      </div>
    );
  }
}
