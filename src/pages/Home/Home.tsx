import s from '@pages/Home/Home.module.scss'
import MainBtn from '@widgets/UI/MainBtn/MainBtn';    
import main_img from '@shared/Home/assets/home_img/main_img.png'
import { Lang_DayCounter } from '@widgets/Home/Lang_DayCounter/Lang_DayCounter';
import KoinQuantity from '@widgets/Home/KoinQuantity/KoinQuantity';
import BottomPopUp from '@widgets/UI/BottomPopUp/BottomPopUp';
import DailyRewards from '@widgets/Home/DailyRewards/DailyRewards';
import { useTelegramApi } from '@shared/Home/hooks/useTelegramApi';
import { useTranslation } from 'react-i18next';
import {useEffect,useState} from 'react'
import { useStartFarm } from '@shared/Home/hooks/useStartFarm';
import { useGetFarmInfo } from '@shared/Home/hooks/useGetFarmInfo';
import { EnumFarmStatus } from '@shared/Home/consts/farmStatus.enum';
import { useClaimFarmCoins } from '@shared/Home/hooks/useClaimFarmCoins';
import MainTaimerBtn from '@widgets/UI/MainTaimerBtn/MainTaimerBtn';
import { changeDateFormat } from '@features/Home/changeDateFormat';
import { useGetBonusStatus } from '@shared/Home/hooks/useGetBonusStatus';
import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks';
import { setBonusDay, setFormattedTaimer, setIsDailyReward, setStoreFarmStatus, updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice';
import { EnumBonusStatus } from '@shared/Home/consts/bonusStatus.enum';
import { Preloader } from '@widgets/UI/Preloader/Preloader';

export type TFarmInfo={
  coins: number,
  start_time: null|string,
  status:string
}
export type TTimerType = {  
  formattedHours: string;  
  formattedMinutes: string;  
  formattedSec:string;
  minuts: number;  
  hours: number;  
  sec:number;
} | null; 
export type TFrensTimerType = {  
  formattedHours: string;  
  formattedMinutes: string;  
  minuts: number;  
  hours: number;  
} | null; 


export function Home(){
  const {user}=useTelegramApi()
  const {t} = useTranslation()
  const dispatch= useAppDispatch()
  const state=useAppSelector(state=>state.home)

  const {mutate:startReq}=useStartFarm()
  const {mutate:claimReq}=useClaimFarmCoins()
  const {data:farmInfo,isLoading:statusLoading}=useGetFarmInfo()
  const {data:bonusInfo}=useGetBonusStatus()

  const [dailyRewardTime, setDailyRewardTime]= useState('')
  const [coins,setCoins]=useState<number>(state.totalCoins)
  const [farmStatus, setFarmStatus]=useState<string>(state.farmStatus);
  const claimedCoins:number=480;

const onStartFarming=()=>{
  startReq();
  dispatch(setStoreFarmStatus(EnumFarmStatus.FARMING))
  dispatch(setFormattedTaimer({formattedHours:'12',formattedMinutes:'00',formattedSec:'00',hours:12,minuts:0,sec:0}))
}
const onClaimFarming=()=>{
  claimReq();
  dispatch(setStoreFarmStatus(EnumFarmStatus.START))
  dispatch(updateTotalCoins(480))
}
  useEffect(()=>{
    const intervalId = setInterval(() => {  
      const nextDate:Date = new Date(dailyRewardTime);
      const now:Date= new Date();
      nextDate.getTime()===now.getTime() && dispatch(setIsDailyReward(true))
    },1000);  
  
    return () => clearInterval(intervalId);  
  })
useEffect(()=>{
  coins!==state.totalCoins && setCoins(state.totalCoins);
  farmStatus!==state.farmStatus && setFarmStatus(state.farmStatus);
},[state])
useEffect(()=>{
    if(farmInfo){
      farmInfo.coins>coins && dispatch(updateTotalCoins(farmInfo.coins))
      dispatch(setStoreFarmStatus(farmInfo.status));
      farmInfo.status===EnumFarmStatus.FARMING &&  dispatch(setFormattedTaimer(changeDateFormat(farmInfo.start_time)))
    } 
    if(bonusInfo){ 
      bonusInfo.status=== EnumBonusStatus.CLAIM?dispatch(setIsDailyReward(true)):dispatch(setIsDailyReward(false));
      setDailyRewardTime(bonusInfo.next_bonus_time)
      state.bonusDay!==bonusInfo.day && dispatch(setBonusDay(bonusInfo.day));
    }  
  },[farmInfo,bonusInfo])

if(statusLoading){
  return <Preloader />
}else
 return (
  <>
      <div className={s.wrapper}>
        <div className={s.title_wrap}>
          <p className={s.title}>{`${t("hello")},`}</p>
          <p className={s.title}>{user?.username}</p>
        </div>
        <div className={s.lang_daycounter_wrap}>
          <Lang_DayCounter />
        </div>
        <div className={s.koin_wrap}>
          <KoinQuantity coinValue={coins} />
        </div>
        <div className={s.main_img_wrap}>
          <img src={main_img} alt="" className={s.main_img} />
        </div>
        <div className={s.farming_btn}>
          {farmStatus === EnumFarmStatus.START && (
            <MainBtn disabled={farmStatus !==EnumFarmStatus.START}  event={()=>onStartFarming()}>{t('startFarming')}</MainBtn>
          )}
          {farmStatus === EnumFarmStatus.FARMING && <MainTaimerBtn  coinValue={claimedCoins}  />}
          {farmStatus === EnumFarmStatus.CLAIM && (
            <MainBtn  event={()=>onClaimFarming()}>
              <div className={s.claim_home_btn}>  
                <div>{t('сlaimFarm')}</div>
                <div>
                  <KoinQuantity
                    coinValue={claimedCoins}
                    style={{
                      color: "#000",
                      fontSize: "17px",
                      fontWeight: "800",
                    }}
                    imgStyle={{ width: "16px", height: "16px" }}
                  />
                </div>
              </div>
            </MainBtn>
          )}
        </div>
      </div>
      {state.isDailyReward && (
         <div className={`${s.daily_reward}`}>
         <BottomPopUp onClose={() => dispatch(setIsDailyReward(false))}>
           <DailyRewards
             onClose={() => dispatch(setIsDailyReward(false))}
             buttonActive={bonusInfo?.status===EnumBonusStatus.CLAIM}
           />
         </BottomPopUp>
       </div>
      )} 
</>
    );
}