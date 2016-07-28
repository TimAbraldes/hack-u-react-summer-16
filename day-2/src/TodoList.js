import React, { Component } from 'react';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items.map((item) => {
        console.log(item.todo);
        return (
          <li key={window.performance.now()}><input type='checkbox' checked={item.isDone}></input>{item.todo}</li>
        );
      }),
    };
  }

  render() {
    return (
      <ul>
        {this.state.items}
      </ul>
    );
  }
}
