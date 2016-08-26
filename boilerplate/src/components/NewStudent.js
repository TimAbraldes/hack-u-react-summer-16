import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ActionCreators } from '../reducer';

@withRouter
@connect(
  null,
  dispatch => ({
    submitNewStudent: () => {
      dispatch(ActionCreators.submitNewStudent());
    },
    updateNewStudentName: (name) => {
      dispatch(ActionCreators.newStudentChangeName(name));
    },
  }),
)

export default class NewStudent extends Component {
  static propTypes = {
    submitNewStudent: React.PropTypes.func.isRequired,
    updateNewStudentName: React.PropTypes.func.isRequired,
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitNewStudent();
    this.props.router.push('/');
  }

  handleNameChange(event) {
    this.props.updateNewStudentName(event.target.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Name: <input type='text' onChange={this.handleNameChange.bind(this)} /></label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}
