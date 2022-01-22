import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from '@reduxjs/toolkit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import member from './reducers/member';

import { Login } from './components/Login';
import { NotFound } from './components/NotFound';
import { ProfileScreen } from './Screens/ProfileScreen';
import { SearchMemberScreen } from './Screens/SearchMemberScreen';
import { SearchTuneScreen } from './Screens/SearchTuneScreen';

const reducer = combineReducers({
  member: member.reducer
});

// local storage as initial state
const persistedStateJSON = localStorage.getItem('loginReduxState');
let persistedState = {};

if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON);
}

// create store with initial state
const store = createStore(
  reducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// store the state in local storage on Redux state change
store.subscribe(() => {
  localStorage.setItem('loginReduxState', JSON.stringify(store.getState()));
});

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <div>
            <Routes>
              <Route path="/" element={<ProfileScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search-members" element={<SearchMemberScreen />} />
              <Route path="/search-tunes" element={<SearchTuneScreen />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
