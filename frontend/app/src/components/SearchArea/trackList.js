import React from 'react';
import slothyxService from "../../services/slothyxService";

class TrackList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        let list;
        if (data && data["tracks"] && data["tracks"]["items"]) {
            list = data["tracks"]["items"].map((track) => (
                <TrackListItem key={track.id} track={track}/>
            ));
        } else {
            list = [];
        }
        return (
            <ul>
                {list}
            </ul>
        );
    }
}

class TrackListItem extends React.Component {

    constructor(props) {
        super(props);

        this.clickedSong = this.clickedSong.bind(this);
    }

    clickedSong() {
        slothyxService.playSong(this.props.track.uri);
    }

    render() {
        let artistName = this.props.track["artists"][0].name;
        let songName = this.props.track.name;
        return (
            <li onClick={this.clickedSong}>
                {artistName}: {songName}
            </li>
        );
    }
}

export default TrackList;