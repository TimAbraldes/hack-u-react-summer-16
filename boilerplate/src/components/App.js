import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <CountBy by={1} />
        <CountBy by={2} />
        <CountBy by={3} />
        <CountBy by={4} />
      </div>
    );
  }
}

class CountBy extends Component {
  state = {
    count: 0,
  };

  inc() {
    this.setState({
      count: this.state.count + this.props.by,
    });
  }

  render() {
    return (
      <div>
        <input type='number' value={this.state.count} readOnly />
        <button onClick={this.inc.bind(this)}>Inc by {this.props.by}</button>
      </div>
    );
  }
}
