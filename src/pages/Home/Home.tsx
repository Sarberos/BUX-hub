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

export function Home({dailyRewardSt,setDailyRewardSt}:{dailyRewardSt:boolean,setDailyRewardSt:(value:boolean)=>void}){
  const currentDay=1;
  const {user}=useTelegramApi()
  const {t} = useTranslation()
  const {}=useStartFarm()
  const {data}=useGetFarmInfo()
  const [farmStatus, setFarmStatus]=useState(EnumFarmStatus.START)


  useEffect(()=>{
    console.log(data);
    setFarmStatus(EnumFarmStatus.CLAIM)
    
  },[data])

    return (
      <div className={s.wrapper}>
        <div className={s.title_wrap}>
          <p className={s.title}>{t("hello", { name: user?.username })}</p>
        </div>
        <div className={s.lang_daycounter_wrap}>
          <Lang_DayCounter />
        </div>
        <div className={s.koin_wrap}>
          <KoinQuantity />
        </div>
        <div className={s.main_img_wrap}>
          <img src={main_img} alt="" className={s.main_img} />
        </div>
        <div className={s.farming_btn}>
          <MainBtn>{farmStatus}</MainBtn>
          {/* <MainBtn>{farmStatus}</MainBtn>
          <MainBtn>{farmStatus}</MainBtn> */}
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