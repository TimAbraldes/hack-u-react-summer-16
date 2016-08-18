import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Header from './Header';
import { pollForArticles } from '../reducer';

@connect(
  (state, ownProps) => {
    return {
      isLoading: state.isLoading,
    };
  },
)
export default class App extends Component {

  async componentDidMount() {
    this.props.dispatch(pollForArticles());
  }

  render() {
    const myTitle = 'Yippie!';

    return (
      <div className='container'>
        <Header>
          <h1>My Cool Blog</h1>

          <div>isLoading: {' ' + this.props.isLoading}</div>

          <hr/>
          <h3>
            <Link to='/home'>Home</Link>
            <span> • </span>
            <Link to='/about'>About</Link>
          </h3>
          <hr/>
        </Header>

        {React.cloneElement(this.props.children, { title: myTitle })}

      </div>
    );
  }
}
