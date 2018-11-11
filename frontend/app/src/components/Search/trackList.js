import React from 'react';
import styled from 'styled-components';
import slothyxService from "../../services/slothyxService";
import { MdPlayCircleOutline } from "react-icons/md";

class TrackList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        let list;
        console.log(data);

        if (data && data["tracks"] && data["tracks"]["items"]) {

            list = data["tracks"]["items"].map((track) => (
                <TrackListItem key={track.id} track={track} />
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
        let songName = this.props.track.name;
        let artistName = this.props.track["artists"][0].name;
        let imageUrl = this.props.track["album"]["images"][0].url;

        return (
            <StyledLi onClick={this.clickedSong}>
                <ImagePreview src={imageUrl} />
                <StyledSongDescription>
                    <StyledSongTitle>{songName}</StyledSongTitle>
                    <StyledSongArtist>{artistName}</StyledSongArtist>
                </StyledSongDescription>
                <StyledPlayButton><MdPlayCircleOutline></MdPlayCircleOutline></StyledPlayButton>
            </StyledLi>
        );
    }
}

const StyledPlayButton = styled.div`
    position: absolute;
    right: 0;
    font-size: 28px;
`

const StyledSongDescription = styled.div`
    font-size: 12px;
    display: inline-block;
    line-height: normal;
    padding-left: 10px;
`;

const StyledSongTitle = styled.div`
    font-weight: bold;
`;

const StyledSongArtist = styled.div`

`;

const ImagePreview = styled.img`
    height: 48px;
    display: inline-block;
`;

const StyledUl = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;

    > div:first-child {
        margin-top: 10px;
        border-top: 1px solid white;
    }
`;

const StyledLi = styled.li`

    cursor: pointer;
    height: 50px;
    margin: 2px 0px;
    border-bottom: 1px solid white;
    display: flex;
    justify-content: left;
    align-items: center;
    position: relative;
`;

export default TrackList;