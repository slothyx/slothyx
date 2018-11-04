import React from 'react';
import styled from 'styled-components';
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
            <StyledUl>
                {list}
            </StyledUl>
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
            <StyledLi onClick={this.clickedSong}>
                {artistName}: {songName}
            </StyledLi>
        );
    }
}


const StyledUl = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

const StyledLi = styled.li`
    cursor: pointer;
`;

export default TrackList;