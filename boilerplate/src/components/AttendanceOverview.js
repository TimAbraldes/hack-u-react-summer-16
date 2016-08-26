import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

@connect(
  state => ({
    students: state.students,
  }),
)
export default class AttendanceOverview extends Component {
  render() {
    console.log(`students: ${this.props.students}`);
    return (
      <ul>
        {
          this.props.students.map((student) => {
            return (<li key={student.id}><Link to={`/student/${student.id}`}>{student.name}</Link></li>);
          })
        }
      </ul>
    );
  }
}
