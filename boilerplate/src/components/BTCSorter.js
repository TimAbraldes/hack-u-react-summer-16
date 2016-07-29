import React, { Component } from 'react';

export default class BTCSorter extends Component {
  state = {
    isAscending: false,
    pendingCount: 0,
  }

  constructor(props) {
    super(props);
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.updateCount();
    }
  }

  handleChange(event) {
    this.setState({
      pendingCount: event.target.value,
    });
  }

  updateCount() {
    this.props.dataFn(this.state.pendingCount);
  }

  render() {
    const items = this.props.items.sort(this.state.isAscending ?
      (a, b) => a.sum - b.sum :
      (a, b) => b.sum - a.sum);

    return (
      <div>
        <input
          onBlur={this.updateCount.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          onChange={this.handleChange.bind(this)}
          type='text'
          value={this.state.pendingCount} />

        <label>Sort: </label>
        <button onClick={() => this.setState({ isAscending: true })}>
          Ascending
        </button>

        <button onClick={() => this.setState({ isAscending: false })}>
          Descending
        </button>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Sum</th>
            </tr>
            {
              items.map((item) => {
                return (
                  <tr key={window.performance.now()}>
                    <td>{item.contributor_payee}</td>
                    <td>{item.sum}</td>
                  </tr>
                );
              })
            }
          </thead>
        </table>
      </div>
    );
  }
}
