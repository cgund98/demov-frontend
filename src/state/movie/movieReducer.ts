import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

import {Movie, GetMovieResponse} from 'api/movies/movie';
import {API_PREFIX} from 'utils/config';
import {getAuth} from 'utils/state';
import {add} from 'state/errors/errors';

export interface State {
  movies?: Record<string, Movie>;
  pending: boolean;
}

// Fetch a single movie
export const getMovie = createAsyncThunk('movie/get', async (movieId: string, {getState, dispatch}) => {
  try {
    const response = await axios.get<GetMovieResponse>(`${API_PREFIX}/movies/${movieId}`, {
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

// Reducer
const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    pending: false,
  } as State,
  reducers: {
    reset: state => {
      state.movies = {};
    },
    removeMovie: (state, action: PayloadAction<string>) => {
      if (state.movies !== undefined) delete state.movies[action.payload];
    },
  },
  extraReducers: builder => {
    // Get Members
    builder.addCase(getMovie.pending, state => {
      state.pending = true;
    });
    builder.addCase(getMovie.fulfilled, (state, {payload}) => {
      if (state.movies === undefined) state.movies = {};

      // Unpack payload
      const {data} = payload;
      state.movies[data.movieId] = data;
      state.pending = false;
    });
    builder.addCase(getMovie.rejected, state => {
      state.pending = false;
    });
  },
});

export const {reset, removeMovie} = movieSlice.actions;

export default movieSlice.reducer;
