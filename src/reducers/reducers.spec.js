import { expect } from 'chai';

import { UPDATE_NAME, UPDATE_TAB } from '../actions/actionTypes';
import rootReducer from './';

const updateNameAction = {
    type : UPDATE_NAME,
    text : 'xyz'
};

const updateTabAction = {
    type : UPDATE_TAB,
    index : 6
};


describe('rootReducer', () => {

    it('should initialize name', () => {
        const state = rootReducer({}, {});
        expect(state).to.have.property('name');
    });

    it('should initialize activeTab', () => {
        const state = rootReducer({}, {});
        expect(state).to.have.property('activeTab');
    });

    it ('should only update name on UPDATE_NAME action', () => {
        const prevState = { name : 'abc', activeTab : 3 };
        const nextState = rootReducer(prevState, updateNameAction);

        expect(prevState.name).to.be.equal('abc');
        expect(nextState.name).to.be.equal(updateNameAction.text);

        expect(prevState.activeTab).to.be.equal(nextState.activeTab);
    });

    it ('should only update activeTab on UPDATE_TAB action', () => {
        const prevState = { name : 'abc', activeTab: 3};
        const nextState = rootReducer(prevState, updateTabAction);

        expect(prevState.activeTab).to.be.equal(3);
        expect(nextState.activeTab).to.be.equal(updateTabAction.index);

        expect(prevState.name).to.be.equal(nextState.name);
    });

});