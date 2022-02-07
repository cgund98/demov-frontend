import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

import {CreatePartyRequest, CreatePartyResponse, GetPartyResponse, Party, StartPartyResponse} from 'api/parties/party';
import {JoinPartyResponse} from 'api/members/member';
import {API_PREFIX} from 'utils/config';
import {getAuth} from 'utils/state';
import {add} from 'state/errors/errors';

export interface State {
  party?: Party;
  pending: boolean;
  startPending: boolean;
}

// API calls
export const createParty = createAsyncThunk(
  'party/create',
  async (input: {body: CreatePartyRequest}, {getState, dispatch}) => {
    const {body} = input;

    try {
      const response = await axios.post<CreatePartyResponse>(`${API_PREFIX}/parties`, body, {
        headers: getAuth(getState()),
      });
      return {data: response.data};

      // Handle errors
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(add({message: err.message}));
      }
      throw err;
    }
  },
);

export const getParty = createAsyncThunk('party/get', async (partyId: string, {getState, dispatch}) => {
  try {
    const response = await axios.get<GetPartyResponse>(`${API_PREFIX}/parties/${partyId}`, {
      headers: getAuth(getState()),
    });
    return {data: response.data};

    // Handle errors
  } catch (err) {
    if (axios.isAxiosError(err)) {
      dispatch(add({message: err.message}));
    }
    throw err;
  }
});

export const startParty = createAsyncThunk('party/start', async (partyId: string, {getState, dispatch}) => {
  try {
    const response = await axios.put<StartPartyResponse>(`${API_PREFIX}/parties/${partyId}`, '', {
      headers: getAuth(getState()),
    });
    return {data: response.data};

    // Handle errors
  } catch (err) {
    if (axios.isAxiosError(err)) {
      dispatch(add({message: err.message}));
    }
    throw err;
  }
});

export const deleteParty = createAsyncThunk('party/delete', async (partyId: string, {getState, dispatch}) => {
  try {
    await axios.delete(`${API_PREFIX}/parties/${partyId}`, {
      headers: getAuth(getState()),
    });

    // Handle errors
  } catch (err) {
    if (axios.isAxiosError(err)) {
      dispatch(add({message: err.message}));
    }
    throw err;
  }
});

export const joinParty = createAsyncThunk('party/join', async (joinCode: string, {getState, dispatch}) => {
  try {
    const response = await axios.post<JoinPartyResponse>(`${API_PREFIX}/join/${joinCode}`, '', {
      headers: getAuth(getState()),
    });

    return {data: response.data};

    // Handle errors
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) dispatch(add({message: 'No party found with specified join code.'}));
      else if (err.response?.status === 403) dispatch(add({message: 'Cannot join a party already in progress.'}));
      else dispatch(add({message: err.message}));
    }
    throw err;
  }
});

// Reducers
const partySlice = createSlice({
  name: 'party',
  initialState: {
    pending: false,
    startPending: false,
  } as State,
  reducers: {
    reset: state => {
      state.party = undefined;
    },
  },
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
    builder.addCase(createParty.rejected, state => {
      state.pending = false;
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
    builder.addCase(getParty.rejected, state => {
      state.pending = false;
    });
    // Start Party
    builder.addCase(startParty.pending, state => {
      state.startPending = true;
    });
    builder.addCase(startParty.fulfilled, (state, {payload}) => {
      // Unpack payload
      const {data} = payload;
      state.party = data;
      state.startPending = false;
    });
    builder.addCase(startParty.rejected, state => {
      state.startPending = false;
    });
    // Delete party
    builder.addCase(deleteParty.pending, state => {
      state.pending = true;
    });
    builder.addCase(deleteParty.fulfilled, state => {
      state.pending = false;
    });
    builder.addCase(deleteParty.rejected, state => {
      state.pending = false;
    });
    // Join party
    builder.addCase(joinParty.pending, state => {
      state.pending = true;
    });
    builder.addCase(joinParty.fulfilled, state => {
      state.pending = false;
    });
    builder.addCase(joinParty.rejected, state => {
      state.pending = false;
    });
  },
});

export const {reset} = partySlice.actions;

export default partySlice.reducer;
