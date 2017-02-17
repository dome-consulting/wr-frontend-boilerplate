import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';

export default createStore(
    reducer, 
    applyMiddleware(routerMiddleware(browserHistory), thunk)
);
