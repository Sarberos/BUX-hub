import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store_config'


interface CounterState {
  farmStatus:string
}

const initialState: CounterState = {
  farmStatus:'dfdsf'
}

export const raitingSlice = createSlice({
  name: 'raiting',
  initialState,
  reducers: {
    setStoreFarmStatus:(state, action: PayloadAction<string>) => {
        state.farmStatus = action.payload
    },
   

  },
})

export const { setStoreFarmStatus} = raitingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.home.farmStatus

export default raitingSlice.reducer