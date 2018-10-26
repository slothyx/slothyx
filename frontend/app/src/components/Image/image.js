import React from 'react';

import SlothGalaxy from '../../images/sloth_galaxy.png';
import StyledImage from './Styles';

class Image extends React.Component {

    render() {
        return <StyledImage src={SlothGalaxy} />
    }
}

export default Image;