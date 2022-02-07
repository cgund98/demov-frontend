import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

import {PartyMovie, ListPartyMoviesResponse, VotePartyMovieResponse} from 'api/party-movies/partyMovie';
import {API_PREFIX} from 'utils/config';
import {getAuth} from 'utils/state';
import {add} from 'state/errors/errors';
import {shuffle} from 'utils/shuffle';

export interface State {
  movies?: PartyMovie[];
  curParty?: string;
  voted?: string[];
  voteOrder?: string[];
  pending: boolean;
  votePending: boolean;
}

// List party movies
export const getPartyMovies = createAsyncThunk('partyMovies/list', async (partyId: string, {getState, dispatch}) => {
  try {
    const response = await axios.get<ListPartyMoviesResponse>(`${API_PREFIX}/parties/${partyId}/movies`, {
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

// Vote party movie
export const votePartyMovie = createAsyncThunk(
  'partyMovies/vote',
  async (request: {partyId: string; movieId: string}, {getState, dispatch}) => {
    const {partyId, movieId} = request;
    try {
      const response = await axios.put<VotePartyMovieResponse>(
        `${API_PREFIX}/parties/${partyId}/movies/${movieId}`,
        '',
        {
          headers: getAuth(getState()),
        },
      );
      return {data: response.data};

      // Handle errors
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403) dispatch(add({message: '', redirect: '/'}));
        else dispatch(add({message: err.message}));
      }
      throw err;
    }
  },
);

// Reducers
const partyMoviesSlice = createSlice({
  name: 'party-movies',
  initialState: {
    pending: false,
  } as State,
  reducers: {
    reset: state => {
      state.movies = undefined;
    },
    ignore: (state, action: PayloadAction<string>) => {
      if (state.voted) state.voted = [...state.voted, action.payload];
    },
  },
  extraReducers: builder => {
    // List party movies
    builder.addCase(getPartyMovies.pending, state => {
      state.pending = true;
    });
    builder.addCase(getPartyMovies.fulfilled, (state, {payload}) => {
      // Unpack payload
      const {data} = payload;
      state.movies = data;
      state.pending = false;

      // Reset voting history and vote order if this is a different party
      // than currently cached
      if (data.length && data[0].partyId !== state.curParty) {
        state.curParty = data[0].partyId;
        state.voted = [];
        state.voteOrder = shuffle(data).map(movie => movie.movieId);
      }
    });
    builder.addCase(getPartyMovies.rejected, state => {
      state.pending = false;
    });
    // Vote party movies
    builder.addCase(votePartyMovie.pending, state => {
      state.votePending = true;
    });
    builder.addCase(votePartyMovie.fulfilled, (state, {payload}) => {
      if (state.voted === undefined) state.voted = [];

      // Unpack payload
      const {data} = payload;
      state.voted = [...state.voted, data.movieId];
      state.votePending = false;
    });
    builder.addCase(votePartyMovie.rejected, state => {
      state.votePending = false;
    });
  },
});

export const {reset, ignore} = partyMoviesSlice.actions;

export default partyMoviesSlice.reducer;
