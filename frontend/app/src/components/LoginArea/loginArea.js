import React from 'react';
import slothyxService from '../../services/slothyxservice';

class LoginArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginStarted: false
        };
        this.loginClicked = this.loginClicked.bind(this);
        this.checkLoginHappened = this.checkLoginHappened.bind(this);
    }

    loginClicked() {
        slothyxService.login();
        this.intervalId = setInterval(this.checkLoginHappened, 100);
        this.setState({
            loginStarted: true
        })
    }

    checkLoginHappened() {
        if (slothyxService.isLoggedIn()) {
            clearInterval(this.intervalId);
            this.props.loggedIn();
        }
    }

    render() {
        if (!this.state.loginStarted) {
            return <button onClick={this.loginClicked}>Login!</button>
        } else {
            return <span>Waiting for login... See other window for details.</span>;
        }
    }
}

export default LoginArea;