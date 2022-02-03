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
import { ProfileScreenTwo } from './Screens/ProfileScreenTwo';
import { SearchMemberScreen } from './Screens/SearchMemberScreen';
import { SearchMemberScreenTwo } from './Screens/SearchMemberScreenTwo';
import { SearchTuneScreen } from './Screens/SearchTuneScreen';
import { DetailedTunesScreen } from './Screens/DetailedTunesScreen';
import { DetailedMemberScreen } from './Screens/DetailedMemberScreen';

import { About } from './components/About';
import { Settings } from './components/Settings';

const reducer = combineReducers({
  member: member.reducer,
  relations: relations.reducer
});

// local storage as initial state
const persistedStateJSON = localStorage.getItem('loginReduxState');
const persistedState = persistedStateJSON ? JSON.parse(persistedStateJSON) : {};
/* let persistedState = {}; */

const composedEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/* if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON);
} */

// create store with initial state
/* const store = createStore(
  reducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); */

const store = createStore(
  reducer,
  persistedState,
  composedEnhancers(applyMiddleware(thunkMiddleware))
);

console.log(store.getState());

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
              <Route path="/details/:tune" element={<DetailedTunesScreen />} />
              <Route
                path="/member/:member"
                element={<DetailedMemberScreen />}
              />
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
