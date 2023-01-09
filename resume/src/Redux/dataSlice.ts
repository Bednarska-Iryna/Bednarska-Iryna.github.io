import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



const initialState = {
  users: []
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getData(state, action) {
      state.users = action.payload;
    },
  },
})

export const { getData } = dataSlice.actions
export default dataSlice.reducer
