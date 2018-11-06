import React from 'react';
import Header from '../Header/header';
import LogoutButton from "../LogoutButton/logoutButton";
import SearchArea from "../Search/SearchArea";
import Player from "../Player/player";

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<React.Fragment>
            <Header>Slothyx</Header>
            <span>You are logged in!</span>
            <LogoutButton loggedOut={this.props.loggedOut} />
            <SearchArea />
            <Player/>
        </React.Fragment>)
    }
}

export default MainComponent;
