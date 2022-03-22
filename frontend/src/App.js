import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from '@reduxjs/toolkit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { member } from './reducers/member';
import { relations } from './reducers/relations';

import { NotFound } from './components/NotFound';

import { LoginScreen } from './Screens/LoginScreen';
import { ProfileScreen } from './Screens/ProfileScreen';
import { SettingsScreen } from './Screens/SettingsScreen';
import { SearchMemberScreen } from './Screens/SearchMemberScreen';
import { SearchTuneScreen } from './Screens/SearchTuneScreen';
import { DetailedTunesScreen } from './Screens/DetailedTunesScreen';
import { DetailedMemberScreen } from './Screens/DetailedMemberScreen';

import { AboutScreen } from './Screens/AboutScreen';

const reducer = combineReducers({
  member: member.reducer,
  relations: relations.reducer
});

// local storage as initial state
const persistedStateJSON = localStorage.getItem('loginReduxState');
const persistedState = persistedStateJSON ? JSON.parse(persistedStateJSON) : {};

const composedEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  persistedState,
  composedEnhancers(applyMiddleware(thunkMiddleware))
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
              {/* <Route path="/" element={<ProfileScreen />} />
              <Route path="/login" element={<LoginScreen />} /> */}

              <Route path="/login" element={<LoginScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />

              <Route path="/search-members" element={<SearchMemberScreen />} />

              <Route path="/search-tunes" element={<SearchTuneScreen />} />
              <Route path="/details/:tune" element={<DetailedTunesScreen />} />
              <Route
                path="/member/:member"
                element={<DetailedMemberScreen />}
              />
              <Route path="*" element={<NotFound />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
