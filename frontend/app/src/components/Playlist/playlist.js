import React from 'react';
import slothyxService from "../../services/slothyxService";

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: null
        };
        this.showPlaylist = this.showPlaylist.bind(this);
    }

    showPlaylist(playlist) {
        this.setState({
            playlist: playlist
        });
    }

    render() {
        let items = null;
        if (this._shouldUpdatePlaylist()) {
            slothyxService.getPlaylist(this.showPlaylist, this.props.playlistId);
        }
        if (!!this.state["playlist"]) {
            items = this.state["playlist"]["tracks"]["items"].map((item) => {
                return (<PlaylistItem key={item.id} item={item}/>);
            });
        }
        return (<ul>
            {items}
        </ul>);
    }

    _shouldUpdatePlaylist() {
        return !!this.props.playlistId && (!this.state.playlist || this.props.playlistId !== this.state.playlist.id);
    }
}

class PlaylistItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<li>{this.props.item.track.name}</li>);
    }
}

export default Playlist;
