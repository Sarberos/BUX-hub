import s from '@pages/Home/Home.module.scss'
import MainBtn from '@widgets/UI/MainBtn/MainBtn';
import {Lang_DayCounter} from '@widgets/Home/Lang_DayCounter/Lang_DayCounter';
import KoinQuantity from '@widgets/Home/KoinQuantity/KoinQuantity';
import BottomPopUp from '@widgets/UI/BottomPopUp/BottomPopUp';
import DailyRewards from '@widgets/Home/DailyRewards/DailyRewards';
import {useTelegramApi} from '@shared/Home/hooks/useTelegramApi';
import {useTranslation} from 'react-i18next';
import {useEffect, useState} from 'react'
import {useStartFarm} from '@shared/Home/hooks/useStartFarm';
import {useGetFarmInfo} from '@shared/Home/hooks/useGetFarmInfo';
import {EnumFarmStatus} from '@shared/Home/consts/farmStatus.enum';
import {useClaimFarmCoins} from '@shared/Home/hooks/useClaimFarmCoins';
import MainTaimerBtn from '@widgets/UI/MainTaimerBtn/MainTaimerBtn';
import {changeDateFormat} from '@shared/Home/helpersFunc/changeDateFormat.ts';
import {useGetBonusStatus} from '@shared/Home/hooks/useGetBonusStatus';
import {useAppDispatch, useAppSelector} from '@shared/utilits/redux/hooks';
import {
  setBonusDay,
  setDailyRewardsStatus,
  setFarmStatus,
  setFormattedTaimer,
  setIsDailyReward,
  setTotalCoins,
  updateTotalCoins
} from '@shared/utilits/redux/redux_slice/home_slice';
import {EnumBonusStatus} from '@shared/Home/consts/bonusStatus.enum';
import {Preloader} from '@widgets/UI/Preloader/Preloader';
import {AnimationMainImg} from '@widgets/Home/AnimationMainImg/AnimationMainImg';
import {useOutletContext} from '@widgets/Wrap/Wrap';
import {SuccessClaimAnim} from "@widgets/UI/SuccessClaim/SuccessClaimAnim.tsx";
import {MainClaimBtn} from "@widgets/UI/MainClaimBtn/MainClaimBtn.tsx";

export type TFarmInfo={
    coins: number,
    start_time: null|string,
    status:EnumFarmStatus,
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
    const claimedCoins:number=40;

    const {user,hapticFeedBack}=useTelegramApi()
    const {t} = useTranslation()
    const dispatch= useAppDispatch()
    const state=useAppSelector(state=>state.home)

    const {setIsHistory}=useOutletContext()
    const {mutate:startReq}=useStartFarm()
    const {mutate:claimReq}=useClaimFarmCoins()
    const {data:farmInfo,isLoading:statusLoading}=useGetFarmInfo()
    const {data:bonusInfo,isLoading:bonusLoading}=useGetBonusStatus()
    const {setFarmedCoins}=useOutletContext()

    const [isClaim, setIsClaim] = useState<boolean>(false)
    const [isAnim, setIsAnim] = useState<boolean>(false)


  const onStartFarming=()=>{
    setIsAnim(true)
    startReq();
    dispatch(setFarmStatus(EnumFarmStatus.FARMING));
    dispatch(setFormattedTaimer({formattedHours:'3',formattedMinutes:'00',formattedSec:'00',hours:3,minuts:0,sec:0}))
  }
  const onClaimFarming=()=>{
    hapticFeedBack()
    setTimeout(()=>hapticFeedBack(),50)
    setTimeout(()=>hapticFeedBack(),100)
    setTimeout(()=>hapticFeedBack(),150)
    setTimeout(()=>hapticFeedBack(),200)
    claimReq();
    dispatch(updateTotalCoins(claimedCoins))
    dispatch(setFarmStatus(EnumFarmStatus.START));
    setIsClaim(true);
    setTimeout(()=>setIsClaim(false),3000);
  }
  const chooseBtn =(farmStatus: EnumFarmStatus )=>{
      switch (farmStatus) {
        case EnumFarmStatus.CLAIM:
          return(<MainClaimBtn onClick={onClaimFarming}/>);
        case EnumFarmStatus.FARMING:
          return <MainTaimerBtn />;
        case EnumFarmStatus.START:
          return(
            <MainBtn disabled={farmStatus !==EnumFarmStatus.START}  event={onStartFarming}>{t('startFarming')}</MainBtn>
          )
        default:
          return <MainBtn disabled={farmStatus !==EnumFarmStatus.START}  event={()=>onStartFarming()}>{t('startFarming')}</MainBtn>
      }

    }
  const rewardsPopUp=(bonusStatus:boolean)=>{
      if(bonusStatus){
        return (
          <div className={`${s.daily_reward}`}>
            <BottomPopUp onClose={() => dispatch(setIsDailyReward(false))}>
              <DailyRewards
                buttonActive={bonusInfo?.status === EnumBonusStatus.CLAIM}
              />
            </BottomPopUp>
          </div>
        )
      }else{
        return<></>
      }
  }

    useEffect(() => {
      if (bonusInfo) {
        if (bonusInfo.status === EnumBonusStatus.CLAIM) {
          dispatch(setIsDailyReward(true));
        }
        dispatch(setDailyRewardsStatus(bonusInfo.status));
        setIsHistory(bonusInfo.welcome_status)
        dispatch(setBonusDay(bonusInfo.day));
      }
    },[bonusInfo])
    useEffect(()=>{
        if(farmInfo){
          farmInfo.coins > state.totalCoins && dispatch(setTotalCoins(farmInfo.coins))
          dispatch(setFarmStatus(farmInfo.status));
          if(farmInfo.status===EnumFarmStatus.FARMING) {
            setIsAnim(true);
            const formatedDate = changeDateFormat(farmInfo.start_time);
            if (formatedDate){
              dispatch(setFormattedTaimer(formatedDate));
              setFarmedCoins((formatedDate.dateDifferce / 1000))
            }
          }

        }
      },[farmInfo])

    let clickTimer: ReturnType<typeof setTimeout> | null = null;
    const handleDoubleClick = () => {
      if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
        setIsHistory(true);
        console.log("Двойное нажатие");
      } else {
        clickTimer = setTimeout(() => {
          console.log("Одиночное нажатие");
          clickTimer = null;
        }, 300);
      }
    };

  if(statusLoading ||bonusLoading){
    return <Preloader />
  }else
  return (
    <>
        <div className={s.wrapper}>
          <div  className={s.title_wrap}>
            <p className={s.title}>{`${t("hello")},`}</p>
            <p className={s.title}>{user?.username}</p>
          </div>
          <div className={s.lang_daycounter_wrap}>
            <Lang_DayCounter />
          </div>
          <div className={s.koin_wrap}>
            <KoinQuantity coinValue={state.totalCoins} />
          </div>
          <div className={s.main_img_wrap}  onClick={()=>{handleDoubleClick()}}>
            <AnimationMainImg isActive={isAnim} />
          </div>
          <div className={s.farming_btn_wrap}>
            <div className={isClaim ? `${s.farming_btn_anim} ${s.active}`:s.farming_btn_anim}>
              {isClaim && <SuccessClaimAnim/>}
            </div>
            <div className={s.farming_btn}>
              {chooseBtn(EnumFarmStatus.CLAIM)}
              {/*{chooseBtn(state.farmStatus)}*/}
            </div>

          </div>
        </div>
        {rewardsPopUp(state.isDailyReward)}
  </>
      );
  }