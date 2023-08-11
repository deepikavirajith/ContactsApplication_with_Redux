import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer/CombineReducer';
import thunk from 'redux-thunk';

// Check if the Redux DevTools Extension is available, otherwise use a regular compose function
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

export default store;