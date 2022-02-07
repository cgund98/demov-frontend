import {AxiosRequestHeaders} from 'axios';

import {State as AuthState} from 'state/auth/auth';

// Gets a valid Authentication header from parsing the redux state, passed by
// thunkAPI.getState()
export const getAuth = (state: unknown): AxiosRequestHeaders => {
  const {auth} = state as {auth: AuthState};

  return {Authorization: `Bearer ${auth.token || ''}`};
};
