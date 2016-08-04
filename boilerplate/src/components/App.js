import { default as React } from 'react';

export default class App extends React.Component {
  state = {
    header: 'My Awesome Blog',
    articles: [
      {
        id: 1,
        title: 'How to Cook the Food',
        author: 'Tim Abraldes',
        body: 'article content goes here',
      },
      {
        id: 2,
        title: 'Another Article',
        author: 'Jim Fabraldes',
        body: 'this is a second article with a lot of more ideas and stuff',
      },
      {
        id: 3,
        title: 'A Third Article',
        author: 'Skim Blabraldes',
        body: 'this is a second article with a lot of more ideas and stuff',
      },
    ],
  };

  createArticle(title, author, body) {
    let newArticles = this.state.articles.map((article) => article);
    newArticles.unshift({
      id: newArticles.length + 1,
      title,
      author,
      body,
    });

    this.setState({
      articles: newArticles,
    });
  }

  render() {
    return (
      <div className='container'>
        <Header>{this.state.header}</Header>
        <CreateArticleForm addFn={this.createArticle.bind(this)} />
        <Content>
          {this.state.articles.map((article) => {
            return (
              <Article key={article.id}>
                <ArticleTitle>{article.title}</ArticleTitle>
                <Author>{article.author}</Author>
                <ArticleBody>{article.body}</ArticleBody>
              </Article>
            );
          })}
        </Content>
      </div>
    );
  }
}

class CreateArticleForm extends React.Component {
  static propTypes = {
    addFn: React.PropTypes.func,
  };

  state = {
    titleText: '',
    authorText: '',
    BodyText: '',
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addFn(this.state.titleText, this.state.authorText, this.state.bodyText);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Title: <input type='text' onChange={this.handleChange.bind(this, 'titleText')} /></label>
        <label>Author: <input type='text' onChange={this.handleChange.bind(this, 'authorText')} /></label>
        <label>Body: <input type='text' onChange={this.handleChange.bind(this, 'bodyText')} /></label>
        <input type='submit' value='Create Article' />
      </form>
    );
  }
}

class Article extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div style={{
        border: '1px solid green',
      }}>
      {this.props.children}
    </div>
    );
  }
}

class Author extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <i>
        By: {this.props.children}
      </i>
    );
  }
}

class Header extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <h1>
        {this.props.children}
      </h1>
    );
  }
}

class Content extends React.Component {
  static propTypes =  {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

class ArticleTitle extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <h2>
        {this.props.children}
      </h2>
    );
  }
}

class ArticleBody extends React.Component {
  static propTypes =  {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
