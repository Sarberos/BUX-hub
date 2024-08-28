import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store_config'
import { TTimerType } from '@pages/Home/Home';
import { EnumFrensFarmStatus } from '@shared/Frens/consts/frensFarmStatus.enum';


interface IFrensState {
  timer:TTimerType;
  farmStatus: EnumFrensFarmStatus,
  inviteStatus: boolean,
}

const initialState: IFrensState|null = {
  timer:{
    formattedHours:'00',
    formattedMinutes:'00',
    hours:0,
    minuts:0,
  },
  farmStatus:EnumFrensFarmStatus.FARMING,
  inviteStatus:false
}

export const frensSlice = createSlice({
  name: 'frens',
  initialState,
  reducers: {
    setTaimerValue:(state, action: PayloadAction<TTimerType>) => {
      state.timer = action.payload
  },
    setInviteStatus:(state, action: PayloadAction<boolean>) => {
      state.inviteStatus = action.payload
  },
    setFrensFarmStatus:(state, action: PayloadAction<EnumFrensFarmStatus>) => {
      state.farmStatus = action.payload
  },
  },
})

export const { setTaimerValue,setFrensFarmStatus,setInviteStatus} = frensSlice.actions

export const selectCount = (state: RootState) => state.frens
export default frensSlice.reducer