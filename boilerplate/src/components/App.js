import React, { Component } from 'react';

const colors = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FF00FF',
  '#00FFFF',
];

export default class App extends Component {
  state = {
    currentColorIndex: 0,
  };

  nextColor() {
    this.setState({
      currentColorIndex: (this.state.currentColorIndex + 1) % colors.length,
    });
  }

  render() {
    return (
      <div className='container'>
        <div style={ { width: 200, height: 100, backgroundColor: colors[this.state.currentColorIndex] } }></div>
        <button onClick={this.nextColor.bind(this)}>Next color</button>
      </div>
    );
  }
}
