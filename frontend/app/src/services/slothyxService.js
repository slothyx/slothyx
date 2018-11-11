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
        //TODO refresh
        return this._getUserData()["access_token"];
    }

    playSong(uri) {
        this._put(null, "/v1/me/player/play", '{"uris": ["' + uri + '"]}');
    }

    switchToDevice(device_id) {
        this._put(null, "/v1/me/player", '{"device_ids":["' + device_id + '"]}');
    }

    searchTracks(callback, query) {
        this._get(callback,
            "/v1/search", {
                q: query,
                type: "track"
            });
    }

    getPlaylist(callback, playlist_id) {
        this._get(callback,
            "/v1/playlists/" + playlist_id);
    }

    getUsersPlaylists(callback) {
        this._get(callback,
            "/v1/me/playlists");
    }

    _get(callback, path, queryParams = {}) {
        this._send(callback, "GET", path, queryParams);
    }

    _put(callback, path, body) {
        this._send(callback, "PUT", path, {}, "application/json", body);
    }

    _send(callback, method, path, queryParams = {}, contentType = null, body = null) {
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
        if (contentType !== null) {
            xmlHttp.setRequestHeader("Content-Type", contentType);
        }
        xmlHttp.send(body);
    }
}

export default new SlothyxService();