import { assert } from 'chai';
import ReactDOM from 'react-dom';
import React from 'react';

import reducer, { NEW_STUDENT_FETCH } from './reducer';
import CrazyButton from './components/CrazyButton';

describe('The reducer', function() {
  describe('NEW_STUDENT', function() {
    it('fetching a new student sets loading to true', function() {
      const initialState = { loading: false };
      const action = { type: NEW_STUDENT_FETCH };

      let newState = reducer(initialState, action);
      assert.isOk(newState.loading);

      newState = reducer(initialState, { type: 'FAKE ACTION' });
      assert.isNotOk(newState.loading);
    });
  });

  it.only('React Component', function() {
    // Create a sandbox
    const div = document.createElement('div');
    document.body.appendChild(div);

    ReactDOM.render(
      <CrazyButton/>,
      div
    );

    // Start asserting some stuff!
    const yay = document.getElementById('yay');
    assert.equal(yay.innerText, 'Welcome to CrazyButton');
  });
});
