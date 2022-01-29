import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from '@reduxjs/toolkit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { member } from './reducers/member';

import { NotFound } from './components/NotFound';

import { LoginScreen } from './Screens/LoginScreen';
import { ProfileScreen } from './Screens/ProfileScreen';
import { ProfileScreenTwo } from './Screens/ProfileScreenTwo';
import { SearchMemberScreen } from './Screens/SearchMemberScreen';
import { SearchMemberScreenTwo } from './Screens/SearchMemberScreenTwo';
import { SearchTuneScreen } from './Screens/SearchTuneScreen';

import { About } from './components/About';
import { Settings } from './components/Settings';

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
              <Route path="/two" element={<ProfileScreenTwo />} />

              <Route path="/login" element={<LoginScreen />} />

              <Route path="/search-members" element={<SearchMemberScreen />} />
              <Route
                path="/search-members-two"
                element={<SearchMemberScreenTwo />}
              />

              <Route path="/search-tunes" element={<SearchTuneScreen />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
