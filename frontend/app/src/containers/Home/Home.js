import React from 'react';

import Container from '../../components/container';
import Header from '../../components/header';
import GlobalStyle from '../../components/global';
import Image from '../../components/Image/image';
import Paragraph from '../../components/Paragraph/paragraph';

class Home extends React.Component {
    render() {
        return <Container>
            <Header>Slothyx</Header>
            <Paragraph></Paragraph>
            <GlobalStyle />

            <div className="stars"></div>
            <div className="twinkling"></div>
        </Container>
    }
}

export default Home;
