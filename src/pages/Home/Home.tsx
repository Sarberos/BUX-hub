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

export type TFarmInfo={
  coins: number,
  start_time: null|string,
  status:string
}


export function Home({dailyRewardSt,setDailyRewardSt,setMainIsLoading}:{dailyRewardSt:boolean,setDailyRewardSt:(value:boolean)=>void,setMainIsLoading:(value:boolean)=>void}){
  const currentDay =1;
  const {user}=useTelegramApi()
  const {t} = useTranslation()

  const {mutate:startReq,isPending:startLoading}=useStartFarm()
  const {mutate:claimReq,isPending:claimLoading}=useClaimFarmCoins()
  const {data:farmInfo,isLoading:statusLoading}=useGetFarmInfo()

  const [coins,setCoins]=useState<number>(0)
  const [farmStatus, setFarmStatus]=useState<string>(EnumFarmStatus.START);
  const [timerValue, setTimerValue]=useState<{ formattedHours: string; formattedMinutes: string;minuts: number;
    hours: number;  } | null>()
  const [claimedCoins, setClaimedCoins]= useState<number>(0)


const handlingTaimer=(mins: number, hours: number)=>{
  mins--;
  if(mins===0){
    hours--
    mins=59
  }
  const formattedHours= String(hours).padStart(2, '0')
  const formattedMinutes= String(mins).padStart(2, '0')
  setTimerValue({formattedHours,formattedMinutes,hours,minuts:mins})
}

useEffect(()=>{
  const intervalId = setInterval(() => {  
    if (timerValue) {  
      handlingTaimer(timerValue.minuts || 0, timerValue.hours || 0);  
    }  
  }, 60000);  

  return () => clearInterval(intervalId);  

},[timerValue])
useEffect(()=>{
  setMainIsLoading(false);
},[startLoading,claimLoading,statusLoading])

useEffect(()=>{
    if(farmInfo){
      setClaimedCoins(0.001)
      setCoins(farmInfo.coins);
      setFarmStatus(farmInfo.status);
      farmInfo.status===EnumFarmStatus.FARMING &&  setTimerValue(changeDateFormat(farmInfo.start_time))
     
    }    
  },[farmInfo])

    return (
      <div className={s.wrapper}>
        <div className={s.title_wrap}>
          <p className={s.title}>{t("hello", { name: user?.username })}</p>
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
            <MainBtn event={startReq}>Start farming</MainBtn>
          )}
          {farmStatus === EnumFarmStatus.FARMING && <MainTaimerBtn timerValue={`${timerValue?.formattedHours}:${timerValue?.formattedMinutes}`} coinValue={claimedCoins}  />}
          {farmStatus === EnumFarmStatus.CLAIM && (
            <MainBtn event={claimReq}>
              <div className={s.claim_home_btn}>
                <div>Claim</div>
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
        <div
          className={
            dailyRewardSt
              ? `${s.daily_reward} ${s.active}`
              : `${s.daily_reward}`
          }
        >
          <BottomPopUp onClose={() => setDailyRewardSt(false)}>
            <DailyRewards
              currentDay={currentDay}
              onClose={() => setDailyRewardSt(false)}
            />
          </BottomPopUp>
        </div>
      </div>
    );
}