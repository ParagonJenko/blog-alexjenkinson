import { createGlobalStyle } from 'styled-components';
import { Theme } from './themes';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&family=Quicksand&family=Cinzel&family=Roboto+Condensed&family=Russo+One&display=swap');
  @import url('https://fonts.cdnfonts.com/css/perfect-dos-vga-437');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.font};
    min-height: 100vh;
    position: relative;
    line-height: 1.2;
    font-size: 16px;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: none;
    
    /* Green phosphor screen effect */
    &:before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        linear-gradient(
          rgba(51, 255, 51, 0.03) 50%, 
          rgba(0, 0, 0, 0) 50%
        ),
        linear-gradient(
          90deg,
          rgba(51, 255, 51, 0.02),
          rgba(0, 0, 0, 0)
        );
      background-size: 100% 2px, 3px 100%;
      pointer-events: none;
      z-index: 2;
    }

    /* Add subtle green glow */
    &:after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: inset 0 0 100px rgba(51, 255, 51, 0.1);
      pointer-events: none;
      z-index: 1;
    }
  }

  /* DOS-style scrollbar with green theme */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background: ${({ theme }) => theme.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.text};
    border: 2px solid ${({ theme }) => theme.background};
  }

  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.background};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.headerFont};
    color: ${({ theme }) => theme.text};
    font-weight: normal;
    margin: 1rem 0;
    text-transform: uppercase;
    text-shadow: ${({ theme }) => theme.textShadow};
  }

  a {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    position: relative;
    text-shadow: ${({ theme }) => theme.textShadow};

    &:hover, &:focus {
      background: ${({ theme }) => theme.text};
      color: ${({ theme }) => theme.background};
      outline: none;
      text-shadow: none;
    }
  }

  button {
    font-family: ${({ theme }) => theme.font};
    cursor: pointer;
    text-shadow: ${({ theme }) => theme.textShadow};
    
    &:focus {
      outline: 1px solid ${({ theme }) => theme.text};
    }
  }

  /* DOS-style selection */
  ::selection {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.background};
    text-shadow: none;
  }

  /* Container styles */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Green phosphor scanline effect */
  @keyframes scanline {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100vh);
    }
  }

  /* Flicker animation */
  @keyframes flicker {
    0% { opacity: 0.97; }
    5% { opacity: 0.95; }
    10% { opacity: 0.97; }
    15% { opacity: 0.94; }
    20% { opacity: 0.98; }
    50% { opacity: 0.95; }
    80% { opacity: 0.98; }
    90% { opacity: 0.94; }
    100% { opacity: 0.97; }
  }

  body {
    animation: flicker 4s infinite;
  }

  /* Moving scanline */
  body::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(51, 255, 51, 0.2) 10%,
      rgba(51, 255, 51, 0.2) 90%,
      transparent 100%
    );
    animation: scanline 8s linear infinite;
    z-index: 999;
    pointer-events: none;
  }
`;
