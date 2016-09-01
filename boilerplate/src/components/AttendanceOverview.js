import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

@connect(
  state => ({
    students: state.students,
    creatingStudent: state.creatingStudent,
  }),
)
export default class AttendanceOverview extends Component {
  static propTypes = {
    students: React.PropTypes.array.isRequired,
    creatingStudent: React.PropTypes.shape({
      name: React.PropTypes.string,
    }),
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
            </tr>
          </thead>
          <tbody>
            {
              this.props.students.map((student) => {
                return (
                  <tr key={student.id}>
                    <td>
                      <Link to={`/student/${student.id}`}>{student.name}</Link>
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
                  </tr>)
                : (<tr display='none' />)
            }
          </tbody>
        </table>
      </div>
    );
  }
}
