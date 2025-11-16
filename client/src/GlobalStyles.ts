import { createGlobalStyle } from 'styled-components';
import NunitoRegular from '@src/assets/fonts/Nunito-Regular.ttf';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Nunito';
    src: url(${NunitoRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  /* Сброс и базовые стили */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', sans-serif;
    font-weight: 400;
    background-color: #fff;
    color: #111;
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }
`;
