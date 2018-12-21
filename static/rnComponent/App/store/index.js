import {createStore,applyMiddleware} from 'redux';
import reducer from './reducer/index';
import initalState from './state';
import thunk from 'redux-thunk';

const store = createStore(
    reducer,
    initalState,
    applyMiddleware(thunk)
);
export default store;