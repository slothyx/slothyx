import React from 'react';

import Container from '../../components/container';
import Header from '../../components/header';
import GlobalStyle from '../../components/global';
import Image from '../../components/Image/image';
import LoginArea from '../../components/LoginArea/loginArea';
import LogoutButton from '../../components/LogoutButton/logoutButton';
import Paragraph from '../../components/Paragraph/paragraph';
import slothyxService from '../../services/slothyxService'

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
        if(!this.state.loggedIn){
            return <Container>
                <Header>Slothyx</Header>
                <Paragraph></Paragraph>
                <LoginArea loggedIn={this.loggedIn}/>
                <GlobalStyle />

                <div className="stars"></div>
                <div className="twinkling"></div>
            </Container>
        }else{
            return <Container>
                <Header>Slothyx</Header>
                <span>You are logged in!</span>
                <LogoutButton loggedOut={this.loggedOut}/>
                <GlobalStyle />

                <div className="stars"></div>
                <div className="twinkling"></div>
            </Container>
        }
    }
}

export default Home;
