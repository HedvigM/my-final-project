import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import { Footer } from './components/Footer';
import { NotFound } from './components/NotFound';
import member from './reducers/member';

const reducer = combineReducers({
  member: member.reducer
});

const store = configureStore({ reducer });
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          <Header />
          <InnerContainer>
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </InnerContainer>
          <Footer />
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 100vh;
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
