import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './../store_config'
import { EnumFarmStatus } from '@shared/Home/consts/farmStatus.enum'
import { TTimerType } from '@pages/Home/Home';


interface HomeState {
    farmStatus: string;
    totalCoins:number;
    timer:TTimerType;
    bonusDay:number;
    isLoading: boolean;
    lang: 'RU'| 'ENG' |'FRA'|'GER'
    isMiniTasks: boolean;
    isDailyReward:boolean,
    miniTaskId:number,
}

const initialState: HomeState = {
  farmStatus: EnumFarmStatus.START,
  totalCoins:0,
  timer:{
    formattedHours:'00',
    formattedMinutes:'00',
    hours:0,
    minuts:0,
},
bonusDay:0,
isLoading:false,
lang:'RU',
isMiniTasks: false,
isDailyReward:false,
miniTaskId: 0,
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setStoreFarmStatus:(state, action: PayloadAction<string>) => {
        state.farmStatus = action.payload
    },
    updateTotalCoins:(state, action: PayloadAction<number>) => {
        state.totalCoins += action.payload
    },
    setFormattedTaimer:(state, action: PayloadAction<TTimerType>) => {
        state.timer = action.payload
    },
    setBonusDay:(state, action: PayloadAction<number>) => {
        state.bonusDay = action.payload
    },
    callIsLoading:(state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload
    },
    setLanguage:(state, action: PayloadAction<'RU'| 'ENG' |'FRA'|'GER'>) => {
        state.lang = action.payload
    },
    setIsMiniTasks:(state, action: PayloadAction<boolean>) => {
      state.isMiniTasks = action.payload
  },
    setIsDailyReward:(state, action: PayloadAction<boolean>) => {
      state.isDailyReward = action.payload
  },
    setMiniTaskId:(state, action: PayloadAction<number>) => {
      state.miniTaskId = action.payload
  },
  },
})

export const {
  setStoreFarmStatus,
  updateTotalCoins,
  setFormattedTaimer,
  setBonusDay,
  callIsLoading,
  setLanguage,
  setIsMiniTasks,
  setIsDailyReward,
  setMiniTaskId
} = homeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.home.farmStatus

export default homeSlice.reducer