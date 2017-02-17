import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

import App from '../components/App';

import EditableGreeting from '../components/greeting/EditableGreeting';
import CircularProgress from 'material-ui/CircularProgress';

import { updateTab } from '../actions';

class Routes extends React.Component {

    render() {
        /* Function to store the active tab based on the current route */
        const { store } = this.context;
        const setTab = (idx) => {
            store.dispatch(updateTab(idx));
        };

        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}> 
                    <IndexRoute onEnter={() => setTab(0)}
                        component={EditableGreeting}  />
                    
                    <Redirect from="first" to="/" />
                    <Route path="second" onEnter={() => setTab(1)}
                        component={() => (<CircularProgress size={160} thickness={15} />)} />
                </Route>
            </Router>
        );
    }
};

Routes.contextTypes = {
    store: React.PropTypes.object
};

export default Routes;