import React from 'react';

import Container from '../../components/container';
import GlobalStyle from '../../components/global';
import slothyxService from '../../services/slothyxService'
import LoginComponent from './loginComponent'
import MainComponent from './mainComponent'

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
            (<MainComponent loggedOut={this.loggedOut}/>) :
            (<LoginComponent loggedIn={this.loggedIn}/>);

        return (
            <Container>
                {content}
                <GlobalStyle/>

                <div className="stars"/>
                <div className="twinkling"/>
            </Container>);
    }
}

export default Home;
