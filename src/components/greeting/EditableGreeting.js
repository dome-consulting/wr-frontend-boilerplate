
import React, { PropTypes } from 'react';

import { connect } from 'react-redux'

import { updateNameUpperCase } from '../../actions';
import Greeting from './Greeting';
import TextInput from './TextInput';


const EditableGreeting = ({ name, onChangeHandler }) => {
    return (
        <div>
            <Greeting name={name} />
            <TextInput name={name} onChangeHandler={onChangeHandler} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        name : state.name
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeHandler: (text) => {
            dispatch(updateNameUpperCase(text));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditableGreeting);