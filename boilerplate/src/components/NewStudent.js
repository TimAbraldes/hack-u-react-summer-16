import React, { Component } from 'react';

@connect(
  state => ({}),
  dispatch => ({
    createStudent: (studentData) => {
      dispatch({
        type: STUDENT_CREATE,
      });
    },
  }),
)

export default class NewStudent extends Component {
  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Name: <input type='text' /></label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}
