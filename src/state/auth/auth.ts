import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

import {LoginResponse, JwtPayload} from '../../api/auth/login';
import {API_PREFIX} from '../../utils/config';
import {decodeB64} from '../../utils/base64';

export interface State {
  token?: string;
  id?: string;
  pending: boolean;
}

export const login = createAsyncThunk('auth/login', async (name: string) => {
  const response = await axios.post<LoginResponse>(`${API_PREFIX}/login`, {name});
  return response.data;
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
      state.token = payload.token;

      const stringJwt = decodeB64(payload.token.split('.')[1]);
      try {
        const decodedJwt = JSON.parse(stringJwt) as JwtPayload;
        state.id = decodedJwt.sub;
      } catch (err) {
        console.log(err);
      }

      state.pending = false;
    });
    builder.addCase(login.rejected, (state, {payload}) => {
      state.pending = false;
      console.log(payload);
    });
  },
});

export default authSlice.reducer;
