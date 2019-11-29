import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import stateReducers from './redux';

const supportsStorage = !!window.sessionStorage;
const storageReducer = (state = {}) => {
    if (!supportsStorage) {
        return state;
    }

    window.sessionStorage.setItem('kojimaSpaRedux', JSON.stringify(state));
    return state;
}

const reducer = (state = {}, action) => {
    let nextState = stateReducers(state, action);
    storageReducer(nextState, action);
    return nextState;
}

const initialState = (supportsStorage && JSON.parse(window.sessionStorage.getItem('kojimaSpaRedux')))
    || {};

const store = createStore(reducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
