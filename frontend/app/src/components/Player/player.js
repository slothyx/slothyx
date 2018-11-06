import React from 'react';
import slothyxService from "../../services/slothyxService";

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.onSDKReady = this.onSDKReady.bind(this);
        this.refreshAccessToken = this.refreshAccessToken.bind(this);
        this.load();
    }

    load() {
        window.onSpotifyWebPlaybackSDKReady = this.onSDKReady;
        const script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";

        document.head.appendChild(script);
    }

    refreshAccessToken(cb) {
        cb(slothyxService.getAccessToken());
    }

    onSDKReady() {
        const player = new Spotify.Player({
            name: 'Slothyx Web Player',
            getOAuthToken: this.refreshAccessToken
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

        player.addListener('player_state_changed', state => {
            console.log(state);
        });

        player.addListener('ready', ({device_id}) => {
            console.log('Ready with Device ID', device_id);
            slothyxService.switchToDevice(device_id);
        });

        player.addListener('not_ready', ({device_id}) => {
            console.log('Device ID has gone offline', device_id);
        });

        player.connect();
    }

    render() {
        //TODO play indicator?
        return (
            <span>
            </span>
        );
    }
}

export default Player;