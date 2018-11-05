import React from 'react';
import Header from '../Header/header';
import LogoutButton from "../LogoutButton/logoutButton";
import SearchArea from "../Search/SearchArea";

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
        </React.Fragment>)
    }
}

export default MainComponent;
