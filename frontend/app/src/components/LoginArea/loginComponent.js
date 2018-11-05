import React from 'react';
import Header from '../Header/header';
import LoginArea from './loginArea';
import Paragraph from '../Paragraph/paragraph';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<React.Fragment>
            <Header>Slothyx</Header>
            <Paragraph></Paragraph>
            <LoginArea loggedIn={this.props.loggedIn} />
        </React.Fragment>)
    }
}

export default LoginComponent;
