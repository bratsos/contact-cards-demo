import React from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from 'styled-components';

const App = () => {

  return (
    <WrapperDiv>
      <GlobalStyles />
      <h1>Contacts app</h1>
      <ContanctCardDiv>
      </ContanctCardDiv>
    </WrapperDiv>
  )
};
)

const ContanctCardDiv = styled.div`
  width: 90%;
  height: 400px;
  max-width: 1280px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, .15);
  border-radius: 4px;
  background: #fff;
`
const GlobalStyles = createGlobalStyle`
  body {
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    height: 100vh;
  }
`

const WrapperDiv = styled.div`
  font-family: -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Helvetica,
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h1 {
    color: #fff;
    text-shadow: 0 2px rgba(0, 0, 0, .25);
  }
`

const appNode = document.getElementById('app');
ReactDOM.render(<App />, appNode);

