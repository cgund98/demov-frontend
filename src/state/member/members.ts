import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

import {Member, ListPartyMembersResponse} from 'api/members/member';
import {API_PREFIX} from 'utils/config';
import {getAuth} from 'utils/state';
import {add} from 'state/errors/errors';

export interface State {
  members?: Member[];
  pending: boolean;
}

export const getMembers = createAsyncThunk('member/get', async (partyId: string, {getState, dispatch}) => {
  try {
    const response = await axios.get<ListPartyMembersResponse>(`${API_PREFIX}/parties/${partyId}/members`, {
      headers: getAuth(getState()),
    });
    return {data: response.data};

    // Handle errors
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 403) dispatch(add({message: '', redirect: '/'}));
      else dispatch(add({message: err.message}));
    }
    throw err;
  }
});

export const deleteMember = createAsyncThunk(
  'member/delete',
  async (input: {partyId: string; memberId: string}, {getState, dispatch}) => {
    try {
      const {partyId, memberId} = input;
      await axios.delete(`${API_PREFIX}/parties/${partyId}/members/${memberId}`, {
        headers: getAuth(getState()),
      });

      // Handle errors
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(add({message: err.message}));
      }
      throw err;
    }
  },
);

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    pending: false,
  } as State,
  reducers: {
    reset: state => {
      state.members = undefined;
    },
  },
  extraReducers: builder => {
    // Get Members
    builder.addCase(getMembers.pending, state => {
      state.pending = true;
    });
    builder.addCase(getMembers.fulfilled, (state, {payload}) => {
      // Unpack payload
      const {data} = payload;
      state.members = data.sort((a, b) => (a.joinTime > b.joinTime ? 1 : -1));
      state.pending = false;
    });
    builder.addCase(getMembers.rejected, state => {
      state.pending = false;
    });
    // Delete member
    builder.addCase(deleteMember.pending, state => {
      state.pending = true;
    });
    builder.addCase(deleteMember.fulfilled, state => {
      state.pending = false;
    });
    builder.addCase(deleteMember.rejected, state => {
      state.pending = false;
    });
  },
});

export const {reset} = memberSlice.actions;

export default memberSlice.reducer;
