import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './redux_slice/home_slice'
import frensReducer from './redux_slice/frens_slice'
import rewardReducer from './redux_slice/reward_slice.ts'

export const store = configureStore({
  reducer: {
    home: homeReducer,
    frens:frensReducer,
    reward: rewardReducer.reducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch