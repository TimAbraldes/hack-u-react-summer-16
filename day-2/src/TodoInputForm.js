import React, { Component } from 'react';

export default class TodoInputForm extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = TodoInputForm.submitHandler.bind(this);
  }

  static submitHandler(event) {
    event.preventDefault();
    this.props.addFn({ todo: 'an added item', isDone: false });
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input type='text' />
        <input type='submit' value='submit' />
      </form>
    );
  }
}
