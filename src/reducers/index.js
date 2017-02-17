import { combineReducers } from 'redux';

import { UPDATE_NAME, UPDATE_TAB } from '../actions/actionTypes';

/* reducer to handle the current name */
const name = (state = '', action) => {
    switch (action.type) {
        case UPDATE_NAME:        
            return action.text || '';
        default: 
            return state;
    }
};

/* reducer to handle the selected tab */
const activeTab = (state = 0, action) => {
    switch (action.type) {
        case UPDATE_TAB:        
            return action.index || 0;
        default: 
            return state;
    }
};

export default combineReducers({ name, activeTab });