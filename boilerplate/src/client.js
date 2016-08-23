import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import AttendanceOverview from './components/AttendanceOverview';
import NewStudent from './components/NewStudent';
import StudentInfo from './components/StudentInfo';

ReactDOM.render(
  (
  <Router history={browserHistory} >
    <Route path='/' component={App}>
      <IndexRoute component={AttendanceOverview} />
      <Route path='newStudent' component={NewStudent} />
      <Route path='student/:id' component={StudentInfo} />
    </Route>
  </Router>
  ),
  document.getElementById('content'),
);
