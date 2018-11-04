import React from 'react';
import Header from '../../components/header';
import LoginArea from '../../components/LoginArea/loginArea';
import Paragraph from '../../components/Paragraph/paragraph';
import LogoutButton from "../../components/LogoutButton/logoutButton";
import SearchArea from "../../components/SearchArea/searchArea";
import Container from "../../components/container";

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<React.Fragment>
            <Header>Slothyx</Header>
            <span>You are logged in!</span>
            <LogoutButton loggedOut={this.props.loggedOut}/>
            <SearchArea/>
        </React.Fragment>)
    }
}

export default MainComponent;
