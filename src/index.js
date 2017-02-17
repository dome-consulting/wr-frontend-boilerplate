import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import I18n from './i18n';
import Routes from './routes';
import store from './store';

import './index.scss';

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <I18n>
            <Provider store={store}>        
                <Routes />
            </Provider>
        </I18n>
    </MuiThemeProvider>,
    document.getElementById('app-container')
);
