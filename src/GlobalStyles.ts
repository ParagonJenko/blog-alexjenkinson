import { createGlobalStyle } from 'styled-components';
import { Theme } from './themes';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&family=Quicksand&family=Cinzel&family=Roboto+Condensed&family=Russo+One&display=swap');

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
    
    &:before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: ${({ theme }) => theme.backgroundImage};
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.2;
      z-index: -1;
    }

    &:after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${({ theme }) => theme.overlayColor};
      z-index: -1;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.headerFont};
    color: ${({ theme }) => theme.specialAccent || theme.accent};
  }

  a {
    color: ${({ theme }) => theme.specialAccent || theme.text};
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: all 0.2s ease-in-out;
    padding: 2px 4px;
    margin: 0 -4px;
    border-radius: 2px;
    position: relative;

    &:hover, &:focus {
      background-color: ${({ theme }) => theme.border};
      text-decoration: underline;
      text-underline-offset: 3px;
      outline: none;
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.specialAccent || theme.accent};
      outline-offset: 2px;
    }

    /* Add a subtle text shadow for better contrast in dark themes */
    text-shadow: ${({ theme }) => theme.textShadow || 'none'};
  }

  /* Ensure sufficient contrast for links within darker sections */
  [data-theme-section="dark"] a {
    color: ${({ theme }) => theme.specialAccent || theme.accent};
    background-color: ${({ theme }) => `${theme.background}99`};
    
    &:hover, &:focus {
      background-color: ${({ theme }) => theme.secondary};
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
`;
