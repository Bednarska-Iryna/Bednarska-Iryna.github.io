import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



const initialState = {
about: "",
additional: "",
courses1: "",
courses2: "",
education: "",
email: "",
experience: "",
firstname: "",
info: "",
lastname: "",
location: "",
phone: "",
profession: "",
strengths: "",
years1: "",
years2: "",
years3: "",
years4: "",
years5: "",
image: null,
imageName: null,
} 

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getData(state, action) {
      state = action.payload;
    },
    // decrement(state) {
    //   state.value--
    // },
    // incrementByAmount(state, action: PayloadAction<number>) {
    //   state.value += action.payload
    // },
  },
})

export const { getData} = dataSlice.actions
export default dataSlice.reducer