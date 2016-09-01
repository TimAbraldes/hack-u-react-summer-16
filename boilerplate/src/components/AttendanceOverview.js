import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { ActionCreators } from '../reducer';

@connect(
  state => ({
    students: state.students,
    creatingStudent: state.creatingStudent,
    removingStudent: state.removingStudent,
  }),
  dispatch => ({
    removeStudent: (id) => {
      dispatch(ActionCreators.removeStudent(id));
    },
  }),
)
export default class AttendanceOverview extends Component {
  static propTypes = {
    students: React.PropTypes.array.isRequired,
    creatingStudent: React.PropTypes.shape({
      name: React.PropTypes.string,
    }),
    removingStudent: React.PropTypes.string,
  };

  render() {
    return (
      <div className='panel panel-default'>
        <label className='panel-heading'>Attendance Overview</label>

        <div className='panel-body'>
          Click a student name for more information about that student.
        </div>

        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Id</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.students.map((student) => {
                return this.props.removingStudent === student.id
                  ? (<tr key={student.id}><td><em>{student.name}</em></td><td /><td /></tr>)
                  : (
                    <tr key={student.id}>
                      <td>
                        <Link to={`/student/${student.id}`}>{student.name}</Link>
                      </td>
                      <td>
                        {student.id}
                      </td>
                      <td>
                        <i className='fa fa-remove' aria-label='Remove student' style={{ cursor: 'pointer' }} onClick={this.props.removeStudent.bind(this, student.id)} />
                      </td>
                    </tr>
                    );
              })
            }
            {
              this.props.creatingStudent
                ? (
                  <tr key={1234}>
                    <td>
                      {this.props.creatingStudent.name}
                    </td>
                    <td />
                    <td />
                  </tr>)
                : (<tr display='none' />)
            }
          </tbody>
        </table>
      </div>
    );
  }
}
