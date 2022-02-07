import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

import {add} from 'state/errors/errors';
import {LoginResponse, JwtPayload} from 'api/auth/login';
import {API_PREFIX} from 'utils/config';
import {decodeB64} from 'utils/base64';

export interface State {
  token?: string;
  id?: string;
  pending: boolean;
}

export const login = createAsyncThunk('auth/login', async (input: {name: string}, {dispatch}) => {
  try {
    const {name} = input;
    const response = await axios.post<LoginResponse>(`${API_PREFIX}/login`, {name});
    return {data: response.data};

    // Handle errors
  } catch (err) {
    if (axios.isAxiosError(err)) {
      dispatch(add({message: err.message}));
    }
    throw err;
  }
});

const authSlice = createSlice<State, Record<string, never>, 'auth'>({
  name: 'auth',
  initialState: {
    pending: false,
  },
  reducers: {},
  extraReducers: builder => {
    // Login
    builder.addCase(login.pending, state => {
      state.pending = true;
    });
    builder.addCase(login.fulfilled, (state, {payload}) => {
      // Unpack payload
      const {data} = payload;
      state.token = data.token;

      // Decode user ID from token
      const stringJwt = decodeB64(data.token.split('.')[1]);
      try {
        const decodedJwt = JSON.parse(stringJwt) as JwtPayload;
        state.id = decodedJwt.sub;
      } catch (err) {
        console.warn(err);
      }

      state.pending = false;
    });
    builder.addCase(login.rejected, state => {
      state.pending = false;
    });
  },
});

export default authSlice.reducer;
