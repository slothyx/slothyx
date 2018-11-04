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
        this._send(callback,
            "GET",
            "/v1/search", {
                q: query,
                type: "track"
            });
    }

    _send(callback, method, path, queryParams = {}, contentType = "text/plain;charset=UTF-8", body = null) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                if (callback !== null) {
                    callback(JSON.parse(xmlHttp.responseText));
                }
            }
        };
        xmlHttp.open(method, this._createUrl(path, queryParams), true);
        xmlHttp.setRequestHeader("Authorization", "Bearer " + this.getAccessToken());
        xmlHttp.setRequestHeader("Content-Type", contentType)
        xmlHttp.send(body);
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
        return url;
    }

    getAccessToken() {
        return this._getUserData()["access_token"];
    }

    playSong(uri) {
        this._send(null, "PUT", "/v1/me/player/play", {}, "application/json", '{"uris": ["' + uri + '"]}');
    }
}

export default new SlothyxService();