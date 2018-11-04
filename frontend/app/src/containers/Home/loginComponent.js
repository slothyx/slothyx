import React from 'react';
import Header from '../../components/header';
import LoginArea from '../../components/LoginArea/loginArea';
import Paragraph from '../../components/Paragraph/paragraph';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<React.Fragment>
            <Header>Slothyx</Header>
            <Paragraph></Paragraph>
            <LoginArea loggedIn={this.props.loggedIn}/>
        </React.Fragment>)
    }
}

export default LoginComponent;
