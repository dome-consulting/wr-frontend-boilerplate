import { UPDATE_NAME, UPDATE_TAB } from './actionTypes';

/* Build UPDATE_NAME action with text property as payload */
export const updateName = function (text) {
    return {
        type : UPDATE_NAME,
        text
    };
};

/* Build a thunk function to delegate the action dispatch */
export const updateNameUpperCase = function (text) {
    return function (dispatch) {
        dispatch(updateName((text || '').toUpperCase()));
    };
}

/* Build UPDATE_TAB action with index property as payload */
export const updateTab = function (index) {
    return {
        type : UPDATE_TAB,
        index
    };
};
