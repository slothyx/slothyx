import React from 'react';
import styled from "styled-components";

const StyledParagraph = styled.p`
    text-align: center;
    width: 500px;
    font-size: 25px;
`;

class TeaserParagraph extends React.Component {

    render() {
        return <StyledParagraph>An open-source webapp for chill evenings or crowd managed music
            playlists.</StyledParagraph>
    }
}


export default TeaserParagraph;