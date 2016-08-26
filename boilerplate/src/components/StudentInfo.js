import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(
  (state, ownProps) => ({
    student: state.students.find((student) => {
      return student.id === ownProps.params.id;
    }),
  }),
)

export default class About extends Component {
  render() {
    console.log(this.props.student);
    return (
      <h1>Student info for { this.props.params.id } in console</h1>
    );
  }
}
