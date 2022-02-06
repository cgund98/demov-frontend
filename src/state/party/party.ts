import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

import {CreatePartyRequest, CreatePartyResponse, Party} from 'api/parties/party';
import {API_PREFIX} from 'utils/config';
import {getAuth} from 'utils/state';

export interface State {
  party?: Party;
  pending: boolean;
}

export const createParty = createAsyncThunk('party/create', async (input: {body: CreatePartyRequest}, thunkAPI) => {
  const {body} = input;

  const response = await axios.post<CreatePartyResponse>(`${API_PREFIX}/parties`, body, {
    headers: getAuth(thunkAPI.getState()),
  });
  return {data: response.data};
});

export const getParty = createAsyncThunk('party/get', async (partyId: string, thunkAPI) => {
  const response = await axios.get<Party>(`${API_PREFIX}/parties/${partyId}`, {
    headers: getAuth(thunkAPI.getState()),
  });
  return {data: response.data};
});

export const startParty = createAsyncThunk('party/start', async (partyId: string, thunkAPI) => {
  const response = await axios.put<Party>(`${API_PREFIX}/parties/${partyId}`, '', {
    headers: getAuth(thunkAPI.getState()),
  });
  return {data: response.data};
});

export const deleteParty = createAsyncThunk('party/delete', async (partyId: string, thunkAPI) => {
  await axios.delete(`${API_PREFIX}/parties/${partyId}`, {
    headers: getAuth(thunkAPI.getState()),
  });
});

const partySlice = createSlice<State, Record<string, never>, 'party'>({
  name: 'party',
  initialState: {
    pending: false,
  },
  reducers: {},
  extraReducers: builder => {
    // Create Party
    builder.addCase(createParty.pending, state => {
      state.pending = true;
    });
    builder.addCase(createParty.fulfilled, (state, {payload}) => {
      // Unpack payload
      const {data} = payload;
      state.party = data;
      state.pending = false;
    });
    builder.addCase(createParty.rejected, (state, {payload}) => {
      state.pending = false;
      console.log(payload);
    });
    // Get Party
    builder.addCase(getParty.pending, state => {
      state.pending = true;
    });
    builder.addCase(getParty.fulfilled, (state, {payload}) => {
      // Unpack payload
      const {data} = payload;
      state.party = data;
      state.pending = false;
    });
    builder.addCase(getParty.rejected, (state, {payload}) => {
      state.pending = false;
      console.log(payload);
    });
    // Start Party
    builder.addCase(startParty.pending, state => {
      state.pending = true;
    });
    builder.addCase(startParty.fulfilled, (state, {payload}) => {
      // Unpack payload
      const {data} = payload;
      state.party = data;
      state.pending = false;
    });
    builder.addCase(startParty.rejected, (state, {payload}) => {
      state.pending = false;
      console.log(payload);
    });
    // Delete member
    builder.addCase(deleteParty.pending, state => {
      state.pending = true;
    });
    builder.addCase(deleteParty.fulfilled, state => {
      state.pending = false;
    });
    builder.addCase(deleteParty.rejected, (state, {payload}) => {
      state.pending = false;
      console.warn(payload);
    });
  },
});

export default partySlice.reducer;
