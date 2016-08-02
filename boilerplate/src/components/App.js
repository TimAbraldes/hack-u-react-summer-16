import React, { Component } from 'react';

const NUM_VALUES = 10;

export default class App extends Component {
  constructor(props) {
    super(props);

    let values = [];
    for (let i = 0; i < NUM_VALUES; i++) {
      values.push(0);
    }

    this.state = {
      values: values,
      sum: 0,
    };
  }

  add() {
    this.setState({
      sum: this.state.values.reduce((sum, value) => sum + value, 0),
    });
  }

  handleNumberChange(index, event) {
    let newValues = this.state.values.map((item) => item);
    newValues[index] = parseInt(event.target.value, 10) || 0;
    this.setState({
      values: newValues,
    });
  }

  render() {
    return (
      <div className='container'>
        {
          this.state.values.map((value, index) => {
            return (<input id={index} type='number' value={value} onChange={this.handleNumberChange.bind(this, index)} />);
          })
        }
        <button onClick={this.add.bind(this)}>Add</button>
        <input type='number' value={this.state.sum} />
      </div>
    );
  }
}
