import React from 'react';
import slothyxService from "../../services/slothyxService";

class LogoutButton extends React.Component {

    constructor(props) {
        super(props);
        this.loggedOut = this.loggedOut.bind(this);
    }

    loggedOut() {
        slothyxService.logout();
        this.props.loggedOut();
    }

    render() {
        return <button onClick={this.loggedOut}>Logout!</button>;
    }
}

export default LogoutButton;