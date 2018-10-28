var deviceId = undefined;

window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
        name: 'Slothyx Web Player',
        getOAuthToken: cb => {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                    cb(xmlHttp.responseText);
            };
            xmlHttp.open("GET", "/getAccessToken", true);
            xmlHttp.send(null);
        }
    });

    // Error handling
    player.addListener('initialization_error', ({message}) => {
        console.error(message);
    });
    player.addListener('authentication_error', ({message}) => {
        console.error(message);
    });
    player.addListener('account_error', ({message}) => {
        console.error(message);
    });
    player.addListener('playback_error', ({message}) => {
        console.error(message);
    });

    // Playback status updates
    player.addListener('player_state_changed', state => {
        console.log(state);
    });

    // Ready
    player.addListener('ready', ({device_id}) => {
        console.log('Ready with Device ID', device_id);
        deviceId = device_id;
    });

    // Not Ready
    player.addListener('not_ready', ({device_id}) => {
        console.log('Device ID has gone offline', device_id);
        deviceId = undefined;
    });

    // Connect to the player!
    player.connect();
};


document.getElementById("playbutton").onclick = ({}) => {
    if (deviceId === undefined) {
        console.error("no device id");
        return;
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/playSong?uri=" + document.getElementById("spotifyuri").value + "&deviceid=" + deviceId, true);
    xmlHttp.send();
};