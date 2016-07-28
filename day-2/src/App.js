import React, { Component } from 'react';
import MyButton from './MyButton';
import TodoInputForm from './TodoInputForm';
import TodoList from './TodoList';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {
  state = {
    items: [{ todo: 'initial item', isDone: false }],
    count: 0,
  }

  constructor(props) {
    super(props);

    this.add = App.add.bind(this);
    this.markAllDone = App.markAllDone.bind(this);
    this.incrementCount = App.incrementCount.bind(this);
  }

  static add(item) {
    console.log(`called add(${item.todo}, ${item.isDone})`);
    let items = this.state.items.map((originalItem) => originalItem);
    console.log('Hello', items);
    items.push(item);
    console.log('asfd', items);
    this.setState({ items: items });
  }

  static markAllDone() {
    console.log('called markAllDone');
    let items = this.state.items.map((item) => item);
    items.forEach((item) => {
      item.isDone = true;
    });
    this.setState({ items: items });
  }

  static incrementCount() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    this.state.items.forEach((item) => {
      console.log(`${item.todo}`);
    });
    return (
      <div>
        The count is {this.state.count}
        <TodoInputForm addFn={this.add} />
        <TodoList items={this.state.items} />
        <MyButton clickHandler={this.markAllDone} text='All as Done' />
        <MyButton customStyle ={{ borderColor: 'red' }} clickHandler={this.incrementCount} text='Increment count 1' />
        <MyButton clickHandler={this.incrementCount} isDisabled={this.state.count % 2 === 0} text='Increment count 2' />
      </div>
    );
  }
}

