import { expect } from 'chai';

import store from './';

describe ('store', () => {

    it ('should export the store object as default', () => {
        expect(store).to.be.an('Object');
        expect(store).to.have.all.keys('getState', 'dispatch', 'subscribe', 'replaceReducer');
    });

});