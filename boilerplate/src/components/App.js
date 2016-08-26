import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ActionCreators } from '../reducer';

import Header from './Header';

@connect(
  null,
  dispatch => ({
    getStudents: () => {
      dispatch(ActionCreators.getStudents());
    },
  })
)
export default class App extends Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  componentDidMount() {
    this.props.getStudents();
  }

  render() {
    return (
      <div className='container'>
        <Header />
        { this.props.children }
      </div>
    );
  }
}
