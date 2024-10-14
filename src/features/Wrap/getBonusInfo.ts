import {TBonusData} from "@shared/Home/hooks/useGetBonusStatus.tsx";
import BonusFetching from "@shared/utilits/axios/BonusRequest.tsx";
import {EnumBonusStatus} from "@shared/Home/consts/bonusStatus.enum.ts";
import {
  setBonusDay,
  setDailyRewardsStatus,
  setIsDailyReward,
  setWelcomeStatus
} from "@shared/utilits/redux/redux_slice/home_slice.tsx";

export const getBonusInfo=async (dispatch:any)=>{
  const bonusInfo:TBonusData= await BonusFetching.bonusStatusReq();
  if (bonusInfo) {
    if (bonusInfo.status === EnumBonusStatus.CLAIM) {
      dispatch(setIsDailyReward(true));
    }
    dispatch(setDailyRewardsStatus(bonusInfo.status));
    dispatch(setBonusDay(bonusInfo.day));
    dispatch(setWelcomeStatus(bonusInfo.welcome_status));
  }
}