import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import App from './components/App';
import AttendanceOverview from './components/AttendanceOverview';
import NewStudent from './components/NewStudent';
import StudentInfo from './components/StudentInfo';

import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(
  ReduxThunk,
));

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory} >
        <Route path='/' component={App}>
          <IndexRoute component={AttendanceOverview} />
          <Route path='newStudent' component={NewStudent} />
          <Route path='student/:id' component={StudentInfo} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('content'),
);
