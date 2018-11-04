import { createGlobalStyle } from 'styled-components';

// Background inspired by https://codepen.io/WebSonick/pen/vjmgu
import StarsTwinkle from '../images/stars_twinkle.png';
import StarsBackground from '../images/stars_background.png';

// Global Style
const GlobalStyle = createGlobalStyle`
  body {
    background: #212121;
    color: #fff;
    height: 100vh;
    padding: 1em;
    line-height: 1.8em;
		font-size: 15;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeSpeed;
    word-wrap: break-word;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @keyframes Gradient {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  }

  * {
    font-family: 'Open Sans', san-serif;
    letter-spacing: 0.1px;
  }

  @keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
}

.stars, .twinkling {
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:100%;
  display:block;
  z-index: -9;
}

.stars {
  background:#000 url(${StarsBackground}) repeat top center;
}

.twinkling{
  background:transparent url(${StarsTwinkle}) repeat top center;
  animation:move-twink-back 200s linear infinite;
}

`;

export default GlobalStyle;