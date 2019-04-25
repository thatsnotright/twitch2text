import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createRootReducer } from './services/rootReducer';
import { initSagas } from './services/initSagas';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);
const store = createStore(createRootReducer(), initialState, enhancer);
initSagas(sagaMiddleware);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
