import React from 'react';
import './App.css';
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
  );
};

export default App;
