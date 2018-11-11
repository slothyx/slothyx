import React from 'react';
import Header from '../../components/Header/header';
import LogoutButton from "../../components/LogoutButton/logoutButton";
import SearchArea from "../../components/Search/searchArea";
import Player from "../../components/Player/player";

class MainContainer extends React.Component {
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

export default MainContainer;
