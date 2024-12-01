import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@shared/utilits/redux/store_config.tsx";


interface IRewardSlice{
    next_bonus_time:number;
}

const initialState:IRewardSlice|null={
    next_bonus_time:0
}
export const rewardSlice = createSlice({
    name: 'reward',
    initialState,
    reducers: {
        setNextBonusTime(state,action:PayloadAction<number>){
            state.next_bonus_time=action.payload;
        },
    },
})

export const {setNextBonusTime} = rewardSlice.actions

export const selectCount = (state: RootState) => state.frens
export default rewardSlice