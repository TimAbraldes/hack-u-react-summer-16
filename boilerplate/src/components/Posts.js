import React, { Component } from 'react';
import { connect } from 'react-redux';

import Author from './Author';
import Content from './Content';
import ArticleTitle from './ArticleTitle';
import ArticleBody from './ArticleBody';
import CreateArticle from './CreateArticle';

import { editArticleAction } from '../reducer';

@connect(
  (state, ownProps) => {
    const articleId = ownProps.params.id;
    const foundArticle =
      state.articles.find(
        article => article.id.toString() === articleId.toString()
      );

    return {
      article: foundArticle,
    };
  },
)
export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false,
    };
  }

  render() {
    return (
      <Content key={this.props.article.id}>
        <CreateArticle
          initialTitle={this.props.article.title}
          initialAuthor={this.props.article.author}
          initialBody={this.props.article.body}
          buttonText={'Edit'}
          onToggleCreating={() => {
            this.setState({
              isCreating: !this.state.isCreating,
            });
          }}
          onCreateArticle={(newArticle) => {
            newArticle.id = this.props.article.id;
            this.setState({
              isCreating: false,
            });

            this.props.dispatch(editArticleAction(newArticle));
          }}
          isCreating={this.state.isCreating} />
        <ArticleTitle>
          {this.props.article.title}
        </ArticleTitle>

       <Author>
          {this.props.article.author}
        </Author>

        <ArticleBody>
          {this.props.article.body}
        </ArticleBody>
      </Content>
    );
  }
}
