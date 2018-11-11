import React from 'react';

import GlobalStyle from './global.styles';
import slothyxService from '../../services/slothyxService'
import LoginContainer from '../Login/loginContainer'
import MainContainer from '../Main/mainContainer'
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto 30px;
    max-width: 50em;
    padding-left: 15px;
    padding-right: 15px;
    align-items: center;
    justify-content: center
`;

class Root extends React.Component {
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
            (<MainContainer loggedOut={this.loggedOut} />) :
            (<LoginContainer loggedIn={this.loggedIn} />);

        return (
            <Container>
                {content}
                <GlobalStyle />

                <div className="stars" />
                <div className="twinkling" />
            </Container>);
    }
}

export default Root;
