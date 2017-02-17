import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { IntlProvider, intlShape } from 'react-intl';
import messages from '^/src/i18n/messages';

/* Context with react intl */
export const withIntl = (current = {}) => {

    const { intl } = new IntlProvider({ locale : 'en', messages : messages.en }, {}).getChildContext();

    return { 
        context: { 
            ...(current.context), 
            intl 
        },
        childContextTypes: { 
            ...(current.childContextTypes),
            intl: intlShape
        }
    };

};

/* Context with material ui theme */
export const withMuiTheme = (current = {}) => {

    const muiTheme = getMuiTheme();

    return { 
        context: { 
            ...(current.context), 
            muiTheme 
        },
        childContextTypes: { 
            ...(current.childContextTypes),
            muiTheme : React.PropTypes.object
        }
    };

};

/* Full context */
export const withFullContext = (current = {}) => {
    return withIntl(withMuiTheme());
};

/* No-operation function */
export const noop = () => {};