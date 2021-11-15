import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: et-book, Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif;
  color: #f2f2f2;
 } 
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;
`;

export const Text = styled.p`
  margin-top: 1.4rem;
  margin-bottom: 1.4rem;
  font-size: 18px;
`;

export const Description = styled.p`
  font-size: 18px;
  font-style: italic;
`;


export default GlobalStyle;