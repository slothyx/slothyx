import React from 'react';

import Container from '../../components/Welcome/container';
import GlobalStyle from '../../components/global.styles';
import slothyxService from '../../services/slothyxService'
import LoginComponent from '../../components/LoginArea/loginComponent'
import MainComponent from '../../components/Welcome/mainComponent'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: slothyxService.isLoggedIn()
        };
        this.loggedIn = this.loggedIn.bind(this);
        this.loggedOut = this.loggedOut.bind(this);
    }

    loggedIn() {
        this.setState({
            loggedIn: true
        });
    }

    loggedOut() {
        this.setState({
            loggedIn: false
        });
    }

    render() {
        let content = this.state.loggedIn ?
            (<MainComponent loggedOut={this.loggedOut} />) :
            (<LoginComponent loggedIn={this.loggedIn} />);

        return (
            <Container>
                {content}
                <GlobalStyle />

                <div className="stars" />
                <div className="twinkling" />
            </Container>);
    }
}

export default Home;
