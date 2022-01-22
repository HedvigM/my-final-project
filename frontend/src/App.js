import React from 'react';
import './App.css';
<<<<<<< Updated upstream
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
=======
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from './components/Login';
import { SearchScreen } from './Screens/SearchScreen';

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
        <div>
          <div>
            <Routes>
              <Route path="/" element={<SearchScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
>>>>>>> Stashed changes
  );
};

export default App;
<<<<<<< Updated upstream

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
=======
>>>>>>> Stashed changes
