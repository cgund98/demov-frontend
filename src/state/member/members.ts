import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

import {Member, GetPartyMembersResponse} from 'api/members/member';
import {API_PREFIX} from 'utils/config';
import {getAuth} from 'utils/state';

export interface State {
  members?: Member[];
  pending: boolean;
}

export const getMembers = createAsyncThunk('member/get', async (partyId: string, thunkAPI) => {
  const response = await axios.get<GetPartyMembersResponse>(`${API_PREFIX}/parties/${partyId}/members`, {
    headers: getAuth(thunkAPI.getState()),
  });
  return {data: response.data};
});

export const deleteMember = createAsyncThunk(
  'member/delete',
  async (input: {partyId: string; memberId: string}, thunkAPI) => {
    const {partyId, memberId} = input;
    await axios.delete(`${API_PREFIX}/parties/${partyId}/members/${memberId}`, {
      headers: getAuth(thunkAPI.getState()),
    });
  },
);

const memberSlice = createSlice<State, Record<string, never>, 'member'>({
  name: 'member',
  initialState: {
    pending: false,
  },
  reducers: {},
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
    builder.addCase(getMembers.rejected, (state, {payload}) => {
      state.pending = false;
      console.warn(payload);
    });
    // Delete member
    builder.addCase(deleteMember.pending, state => {
      state.pending = true;
    });
    builder.addCase(deleteMember.fulfilled, state => {
      state.pending = false;
    });
    builder.addCase(deleteMember.rejected, (state, {payload}) => {
      state.pending = false;
      console.warn(payload);
    });
  },
});

export default memberSlice.reducer;
