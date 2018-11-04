const userDataKey = "slothyx.userdata";

class SlothyxService {
    constructor() {
    }

    isLoggedIn() {
        return this._getUserData() !== null;
    }

    _getUserData() {
        return window.localStorage.getItem(userDataKey);
    }

    login() {
        window.open("api/loginStart");
    }

    logout() {
        window.localStorage.removeItem(userDataKey);
    }
}

export default new SlothyxService();