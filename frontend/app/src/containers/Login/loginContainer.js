import React from 'react';
import Header from '../../components/Header/header';
import LoginArea from '../../components/LoginArea/loginArea';
import TeaserParagraph from '../../components/Paragraph/teaserParagraph';

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<React.Fragment>
            <Header>Slothyx</Header>
            <TeaserParagraph></TeaserParagraph>
            <LoginArea loggedIn={this.props.loggedIn} />
        </React.Fragment>)
    }
}

export default LoginContainer;
