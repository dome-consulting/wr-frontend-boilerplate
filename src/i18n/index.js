import React from 'react';

import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import localeData from './messages.json';

addLocaleData([...en, ...es]);

/*
 * Define user's language. Different browsers have the user locale defined
 * on different fields on the `navigator` object, so we make sure to account
 * for these different by checking all of them 
 */
const language = (navigator.languages && navigator.languages[0]) ||
                  navigator.language || navigator.userLanguage;

/* Split locales with a region code */
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

/* Try full locale, fallback to locale without region code, fallback to en */
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

export default ({ children }) => (
    <IntlProvider locale={language} messages={messages} >
        {children}
    </IntlProvider>
);
