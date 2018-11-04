const userDataKey = "slothyx.userdata";
const spotifyApiBaseUrl = "https://api.spotify.com";

class SlothyxService {
    constructor() {
    }

    isLoggedIn() {
        return this._getUserData() !== null;
    }

    _getUserData() {
        return JSON.parse(window.localStorage.getItem(userDataKey));
    }

    login() {
        window.open("api/loginStart");
    }

    logout() {
        window.localStorage.removeItem(userDataKey);
    }

    searchTracks(query, callback) {
        this._sendGet(callback,
            "/v1/search", {
                q: query,
                type: "track"
            });
    }

    _sendGet(callback, path, queryParams) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                callback(xmlHttp.responseText);
        };
        xmlHttp.open("GET", this._createUrl(path, queryParams), true);
        xmlHttp.setRequestHeader("Authorization", "Bearer " + this.getAccessToken());
        xmlHttp.send(null);
    }

    _createUrl(path, queryParams) {
        let url = spotifyApiBaseUrl + path;
        if (queryParams) {
            url += "?";
            for (let queryKey in queryParams) {
                if (queryParams.hasOwnProperty(queryKey)) {
                    url += encodeURI(queryKey) + "=" + encodeURI(queryParams[queryKey]) + "&";
                }
            }
            url = url.substr(0, url.length - 1);
        }
        console.log("created url: " + url);
        return url;
    }

    getAccessToken() {
        return this._getUserData()["access_token"];
    }
}

export default new SlothyxService();