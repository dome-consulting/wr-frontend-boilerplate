import { expect } from 'chai';

import { UPDATE_NAME, UPDATE_TAB } from './actionTypes';
import { updateName, updateNameUpperCase, updateTab } from './';

describe ('actions', () => {

    it ('updateName should build UPDATE_NAME action with text', () => {
        const action = updateName('abc');

        expect(action).to.have.property('type', UPDATE_NAME);
        expect(action).to.have.property('text', 'abc');
    });

    it ('updateTab should build UPDATE_TAB action with index', () => {
        const action = updateTab(100);

        expect(action).to.have.property('type', UPDATE_TAB);
        expect(action).to.have.property('index', 100);
    });

});
