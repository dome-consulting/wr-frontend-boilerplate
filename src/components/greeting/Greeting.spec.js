import React from 'react';
import { shallow, render } from 'enzyme';
import { expect } from 'chai';

import Greeting from './Greeting';
import { FormattedMessage } from 'react-intl';

describe('<Greeting />', () => {

    it('renders as <h1 />', () => {
        const wrapper = shallow(<Greeting/>);

        expect(wrapper.find('h1')).to.have.length(1);
    });

    it('renders a <FormattedMessage /> with id greeting.hello', () => {
        const wrapper = shallow(<Greeting name=''/>);

        expect(wrapper.find(FormattedMessage).prop('id'))
            .to.be.equals('greeting.hello');
    });

    it('renders a <FormattedMessage /> with values.name equals to the name', () => {
        const wrapper = shallow(<Greeting name='John'/>);

        expect(wrapper.find(FormattedMessage).prop('values'))
            .to.have.property('name', 'John');
    });

    it('renders a <FormattedMessage /> with values.name equals to "..." if name is empty', () => {
        const wrapper = shallow(<Greeting name=''/>);

        expect(wrapper.find(FormattedMessage).prop('values'))
            .to.have.property('name', '...');
    });

});