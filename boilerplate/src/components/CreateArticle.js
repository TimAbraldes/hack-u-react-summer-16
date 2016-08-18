import React, { Component } from 'react';

export default class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.initialTitle,
      author: props.initialAuthor,
      body: props.initialBody,
    };
  }

  handleChange(key, e) {
    this.setState({ [key]: e.target.value });
  }

  render() {
    const buttonStyle = {
      display: this.props.isCreating ? 'none' : 'inherit',
    };

    const formStyle = {
      padding: 5,
      border: '1px solid #333',
      display: this.props.isCreating ? 'block' : 'none',
    };

    return (
      <div>
        <button
          style={buttonStyle}
          onClick={e => {
            this.props.onToggleCreating();
          }}>
          {this.props.toggleText}
        </button>
        <form
          style={formStyle}
          onSubmit={e => {
            e.preventDefault();
            this.props.onSubmit({
              title: this.state.title,
              body: this.state.body,
              author: this.state.author,
            });

            this.setState({
              title: '',
              body: '',
              author: '',
            });
          }}>
          <div className='form-group'>
            <input
              value={this.state.author}
              onChange={this.handleChange.bind(this, 'author')}
              type='text'
              placeholder='Author' />
          </div>
          <div className='form-group'>
            <input
              value={this.state.title}
              onChange={this.handleChange.bind(this, 'title')}
              type='text'
              placeholder='Title' />
          </div>
          <div className='form-group'>
            <textarea
              value={this.state.body}

              onChange={this.handleChange.bind(this, 'body')}
              placeholder='Body Content' />
          </div>
          <div>
            <button onClick={e => {
              this.props.onToggleCreating();
            }}>Cancel</button>
            <button type='submit'>Submit!</button>
          </div>
        </form>
      </div>
    );
  }
}
