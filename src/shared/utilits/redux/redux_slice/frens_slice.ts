import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store_config'
import { TTimerType } from '@pages/Home/Home';
import { EnumFrensFarmStatus } from '@shared/Frens/consts/frensFarmStatus.enum';


interface IFrensState {
  timer:TTimerType;
  farmStatus: EnumFrensFarmStatus,
}

const initialState: IFrensState = {
  timer:{
    formattedHours:'00',
    formattedMinutes:'00',
    hours:0,
    minuts:0,
  },
  farmStatus:EnumFrensFarmStatus.FARMING,
}

export const frensSlice = createSlice({
  name: 'frens',
  initialState,
  reducers: {
    setTaimerValue:(state, action: PayloadAction<TTimerType>) => {
      state.timer = action.payload
  },
    setFrensFarmStatus:(state, action: PayloadAction<EnumFrensFarmStatus>) => {
      state.farmStatus = action.payload
  },
  },
})

export const { setTaimerValue,setFrensFarmStatus} = frensSlice.actions

export const selectCount = (state: RootState) => state.frens
export default frensSlice.reducer