import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import reducers from '../reducers';

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options if needed
});

const middlewares = applyMiddleware(routerMiddleware(browserHistory), thunk);

const store = createStore(reducers, composeEnhancers(middlewares));

export default store;
