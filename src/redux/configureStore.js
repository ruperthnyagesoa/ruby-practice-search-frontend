import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ListsReducer from './list/list';

const reducer = combineReducers({
  lists: ListsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;