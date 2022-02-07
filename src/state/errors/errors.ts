import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4} from 'uuid';

export interface Error {
  id: string;
  message: string;
  redirect?: string;
}

export interface State {
  list?: Error[];
}

const errorSlice = createSlice({
  name: 'errors',
  initialState: {} as State,
  reducers: {
    reset: state => {
      state.list = [];
    },
    add: (state, action: PayloadAction<{message: string; redirect?: string}>) => {
      if (state.list === undefined) state.list = [];

      state.list = [...state.list, {id: v4(), ...action.payload}];
    },
    del: (state, action: PayloadAction<string>) => {
      if (state.list === undefined) state.list = [];

      state.list = state.list.filter(err => err.id !== action.payload);
    },
  },
});

export const {reset, add, del} = errorSlice.actions;

export default errorSlice.reducer;
