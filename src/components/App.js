import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux'

import { Tabs, Tab } from 'material-ui/Tabs';
import { Grid, Row, Col } from 'react-flexbox-grid';

const App = ({ children, activeTab = 0}) => {
    return (
        <div>
            <Tabs initialSelectedIndex={activeTab}>
                <Tab label={<FormattedMessage id='tab1.title' defaultMessage='Greeting' />} 
                    containerElement={<Link to='/first' />} />

                <Tab label={<FormattedMessage id='tab2.title' defaultMessage='Loading...' />} 
                    containerElement={<Link to='/second' />} />
            </Tabs>
            <Grid style={{margin: 25}}>
                <Row center='md'>
                    <Col>
                        {children}
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activeTab : state.activeTab
    }
};

export default connect(mapStateToProps)(App);
