import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

import authReducer from './auth/auth';
import partyReducer from './party/party';
import membersReducer from './member/members';

const rootReducer = combineReducers({
  auth: authReducer,
  party: partyReducer,
  members: membersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const localStorageKey = 'demo/state';

// convert object to string and store in localStorage
const saveToLocalStorage = (state: RootState) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

// load string from localStarage and convert into an object
// invalid output must be undefined
const loadFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem(localStorageKey);
    if (serialized === null) return undefined;
    return JSON.parse(serialized) as RootState;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadFromLocalStorage(),
});

// On updates save state to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
