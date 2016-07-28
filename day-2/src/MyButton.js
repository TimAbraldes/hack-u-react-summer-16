import React, { Component } from 'react';

export default class MyButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button style={this.props.customStyle} disabled={this.props.isDisabled} onClick={this.props.clickHandler}>{this.props.text}</button>
    );
  }
}
