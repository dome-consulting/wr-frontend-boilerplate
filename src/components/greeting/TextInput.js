import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';

import TextField from 'material-ui/TextField';

const TextInput = ({ name, onChangeHandler }) => {
    return (
        <TextField id="name" 
            hintText={<FormattedMessage id='greeting.name' />} 
            value={name} 
            onChange={(ev) => onChangeHandler(ev.target.value)} />
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired
};

export default TextInput;