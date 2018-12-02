import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // set the alias ahead of time in case we add anything called 'reducer'
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
