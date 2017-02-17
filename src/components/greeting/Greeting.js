import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';

const Greeting = ({ name }) => {
    return (
        <h1>
            <FormattedMessage id='greeting.hello' 
                values={{ name : (name ? name : '...') }}
            />
        </h1>
    );
};

Greeting.propTypes = {
    name: PropTypes.string
};

export default Greeting;