import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//styles
import './Styles/index.scss';

//redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import { getPosts } from './actions/post.action';

const store = createStore (
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getPosts());

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
