import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import spies from 'chai-spies';

import { noop, withFullContext } from '^/test/helpers';

import TextInput from './TextInput';
import { FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';

/* Enable chai.spy */
chai.use(spies);
const spy = chai.spy;

describe('<TextInput />', () => {

    it('renders as <TextField />', () => {
        const wrapper = shallow(<TextInput name='' onChangeHandler={noop}/>);

        expect(wrapper.find(TextField)).to.have.length(1);
    });

    it('input change should call onChangeHandler with the new value', () => {
        const onChange = spy();
        const wrapper = mount(<TextInput name='abc' onChangeHandler={onChange}/>, withFullContext());

        wrapper.find('input').simulate('change', { target: { value : 'John' } });
        
        expect(onChange).to.have.been.called.with('John');
    });

});