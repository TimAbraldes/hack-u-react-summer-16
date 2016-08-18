const SOME_ACTION = 'SOME_ACTION';
const NEW_ARTICLE = 'NEW_ARTICLE';
const SET_ARTICLES = 'SET_ARTICLES';
const SET_LOADING = 'SET_LOADING';

const initialState = {
  foo: 'Hello from Redux!!!',
  articles: [],
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  // Respond to actions here
  switch (action.type) {
    case SOME_ACTION:
      return {
        ...state,
        foo: state.foo + action.payload,
      };

    case NEW_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.payload],
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };

    default:
      return state;
  }
}

export function someAction(count) {
  return {
    type: SOME_ACTION,
    payload: count || 3,
  };
}

export function newArticleAction(newArticle) {
  return {
    type: NEW_ARTICLE,
    payload: newArticle,
  };
}

export function setArticles(articles) {
  return {
    type: SET_ARTICLES,
    payload: articles,
  };
}

export function setLoading(val) {
  return {
    type: SET_LOADING,
    payload: val,
  };
}

export function createArticleAction(newArticle) {
  return (dispatch, getState) => {
    const data = JSON.stringify(newArticle);

    fetch('http://bloggy.2dot3.com/posts/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data,
    });

    dispatch(newArticleAction(newArticle));
  };
}

export function deleteArticle(id) {
  return (dispatch, getState) => {
    fetch('http://bloggy.2dot3.com/posts/' + id, {
      method: 'DELETE',
    });
  };
}

export function editArticleAction(newArticle) {
  return (dispatch, getState) => {
    const data = JSON.stringify(newArticle);

    fetch('http://bloggy.2dot3.com/posts/' + newArticle.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data,
    });

    dispatch(newArticleAction(newArticle));
  };
}

export function pollForArticles() {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    try {
      const fetched = await fetch('http://bloggy.2dot3.com/posts');
      const articles = await fetched.json();
      dispatch(setArticles(articles));
    } catch (err) {
      console.error('error during fetch - ' + err);
    }

    dispatch(setLoading(false));
    setTimeout(dispatch.bind(undefined, pollForArticles()), 1500);
  };
};
