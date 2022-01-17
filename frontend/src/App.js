import React from 'react';
import './App.css';
import styled from 'styled-components';

import { Header } from './components/Header';
import { Login } from './components/Login';
import { Footer } from './components/Footer';

const App = () => {
  return (
    <>
      <Container>
        <Header />
        <InnerContainer>
          <Login />
        </InnerContainer>
        <Footer />
      </Container>
    </>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 100vh;
  background-color: #ae9d97;
`;
const InnerContainer = styled.div`
  min-width: 334px;
  max-width: 500px;
  margin: 0 auto;
  height: 100%;
  background-color: #ff885e;
  border: 3px solid black;
  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }
`;
