import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import type {RootState} from './../store_config'
import {EnumFarmStatus} from '@shared/Home/consts/farmStatus.enum'
import {TTimerType} from '@pages/Home/Home';
import {EnumBonusStatus} from '@shared/Home/consts/bonusStatus.enum';


interface HomeState {
    farmStatus: EnumFarmStatus;
    dailyRewardsStatus: EnumBonusStatus;
    totalCoins:number;
    timer:TTimerType;
    bonusDay:number;
    isLoading: boolean;
    lang: {
      label:string,
      value:string,
    }
    isMiniTasks: boolean;
    isDailyReward:boolean,
    miniTaskId:number,
}

const initialState: HomeState = {
  farmStatus: EnumFarmStatus.START,
  dailyRewardsStatus:EnumBonusStatus.WAIT,
  totalCoins:0,
  timer:{
    formattedHours:'00',
    formattedMinutes:'00',
    formattedSec:'00',
    hours:0,
    minuts:0,
    sec:0,
},
bonusDay:0,
isLoading:false,
lang:{
  label:'EN',
  value:'EN'
},
isMiniTasks: false,
isDailyReward:false,
miniTaskId: 0,
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setFarmStatus:(state, action: PayloadAction<EnumFarmStatus>) => {
      switch (action.payload){
        case 'start':
          state.farmStatus=EnumFarmStatus.START;
          break;
        case 'farming':
        state.farmStatus=EnumFarmStatus.FARMING;
        break;
        case 'claim':
        state.farmStatus=EnumFarmStatus.CLAIM;
        break;
        default:
          state.farmStatus=EnumFarmStatus.START;
      }
    },
    setDailyRewardsStatus:(state, action: PayloadAction<EnumBonusStatus>) => {
      switch (action.payload){
        case 'wait':
          state.dailyRewardsStatus=EnumBonusStatus.WAIT;
          break;
        case 'claim':
          state.dailyRewardsStatus=EnumBonusStatus.CLAIM;
          break;
        default:
          state.dailyRewardsStatus=EnumBonusStatus.WAIT;
      }
    },
    updateTotalCoins:(state, action: PayloadAction<number>) => {
        state.totalCoins += action.payload
    },
    setTotalCoins:(state, action: PayloadAction<number>) => {
        state.totalCoins = action.payload
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
    setLanguage:(state, action: PayloadAction<{value:string,label:string}>) => {
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
  setFarmStatus,
  setDailyRewardsStatus,
  updateTotalCoins,
  setFormattedTaimer,
  setBonusDay,
  callIsLoading,
  setLanguage,
  setIsMiniTasks,
  setIsDailyReward,
  setMiniTaskId,
  setTotalCoins
} = homeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.home.farmStatus

export default homeSlice.reducer