import React from 'react';
import Playlist from "./playlist";
import PlaylistSelect from "./playlistSelect";


class PlaylistArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistId: null
        };
        this.setPlaylistId = this.setPlaylistId.bind(this);
    }

    setPlaylistId(playlistId) {
        this.setState({
            playlistId: playlistId
        });
    }

    render() {
        return (<div>
            <PlaylistSelect handleChange={this.setPlaylistId}/>
            <Playlist playlistId={this.state.playlistId}/>
        </div>);
    }
}

export default PlaylistArea;
