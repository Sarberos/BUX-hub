import s from '@pages/Home/Home.module.scss'
import MainBtn from '@widgets/UI/MainBtn/MainBtn';
import {Lang_DayCounter} from '@widgets/Home/Lang_DayCounter/Lang_DayCounter';
import KoinQuantity from '@widgets/Home/KoinQuantity/KoinQuantity';
import {useTelegramApi} from '@shared/Home/hooks/useTelegramApi';
import {useTranslation} from 'react-i18next';
import {useEffect, useState} from 'react'
import {useStartFarm} from '@shared/Home/hooks/useStartFarm';
import {useGetFarmInfo} from '@shared/Home/hooks/useGetFarmInfo';
import {EnumFarmStatus} from '@shared/Home/consts/farmStatus.enum';
import {useClaimFarmCoins} from '@shared/Home/hooks/useClaimFarmCoins';
import MainTaimerBtn from '@widgets/UI/MainTaimerBtn/MainTaimerBtn';
import {changeDateFormat} from '@shared/Home/helpersFunc/changeDateFormat.ts';
import {useAppDispatch, useAppSelector} from '@shared/utilits/redux/hooks';
import {
  setFarmStatus,
  setFormattedTaimer,
  setReduxFarmedCoins,
  setTotalCoins, setWelcomeStatus,
  updateTotalCoins
} from '@shared/utilits/redux/redux_slice/home_slice';
import {Preloader} from '@widgets/UI/Preloader/Preloader';
import {AnimationMainImg} from '@widgets/Home/AnimationMainImg/AnimationMainImg';
import {SuccessClaimAnim} from "@widgets/UI/SuccessClaim/SuccessClaimAnim.tsx";
import {MainClaimBtn} from "@widgets/UI/MainClaimBtn/MainClaimBtn.tsx";
import {calcFarmedCoins} from "@shared/Home/helpersFunc/calcFarmedCoins.ts";

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
    const state=useAppSelector(state=>state.home);

    const {mutate:startReq}=useStartFarm()
    const {mutate:claimReq}=useClaimFarmCoins()
    const {data:farmInfo,isLoading:statusLoading}=useGetFarmInfo();

    const [isClaim, setIsClaim] = useState<boolean>(false)
    const [isAnim, setIsAnim] = useState<boolean>(false)
    const [isBalanceAnim, setisBalanceAnim] = useState<boolean>(false)



  const onStartFarming=()=>{
    setIsAnim(true)
    dispatch(setReduxFarmedCoins(0.01))
    dispatch(setFarmStatus(EnumFarmStatus.FARMING));
    startReq();
    dispatch(setFormattedTaimer({formattedHours:'3',formattedMinutes:'00',formattedSec:'00',hours:3,minuts:0,sec:0}));
  }
  const onClaimFarming=()=>{
    setisBalanceAnim(true);
    for(let i=1; i<=10;i++){
      hapticFeedBack();
      setTimeout(()=>hapticFeedBack(),10*i)
    }
    claimReq();
    dispatch(updateTotalCoins(claimedCoins))
    dispatch(setFarmStatus(EnumFarmStatus.START));
    setIsClaim(true);
    setTimeout(()=>setIsClaim(false),2700);
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
    useEffect(()=>{
        if(farmInfo){
          farmInfo.coins > state.totalCoins && dispatch(setTotalCoins(farmInfo.coins));
          dispatch(setFarmStatus(farmInfo.status));
          if(farmInfo.status===EnumFarmStatus.FARMING) {
            setIsAnim(true);
            if (farmInfo.start_time){
              dispatch(setFormattedTaimer(changeDateFormat(farmInfo.start_time)));
              dispatch(setReduxFarmedCoins(calcFarmedCoins(farmInfo.start_time)))
            }
          }
        }
      },[farmInfo])

    let clickTimer: ReturnType<typeof setTimeout> | null = null;
    const handleDoubleClick = () => {
      if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
        dispatch(setWelcomeStatus(true))
      } else {
        clickTimer = setTimeout(() => {
          clickTimer = null;
        }, 300);
      }
    };

    let tripleClickTimer: ReturnType<typeof setTimeout> | null = null;
    const hapticDoubleClick = () => {
      if (tripleClickTimer) {
        clearTimeout(tripleClickTimer);
        tripleClickTimer = null;
        hapticFeedBack();
      } else {
        tripleClickTimer = setTimeout(() => {
          tripleClickTimer = null;
        }, 300);
      }
    };

    if(statusLoading){
    return <Preloader />
  }else
  return (
    <>
        <div className={s.wrapper}>
          <div  className={s.title_wrap}>
            <p onClick={hapticDoubleClick} className={s.title}>{`${t("hello")},`}</p>
            <p className={s.title}>{user?.username}</p>
          </div>
          <div className={s.lang_daycounter_wrap}>
            <Lang_DayCounter />
          </div>
          <div className={s.koin_wrap}>
            <KoinQuantity coinValue={state.totalCoins} isBalanceAnim={isBalanceAnim} />
          </div>
          <div className={s.main_img_wrap}  onClick={()=>{handleDoubleClick()}}>
            <AnimationMainImg isActive={isAnim} />
          </div>
          <div className={s.farming_btn_wrap}>
            <div className={isClaim ? `${s.farming_btn_anim} ${s.active}`:s.farming_btn_anim}>
              {isClaim && <SuccessClaimAnim/>}
            </div>
            <div className={s.farming_btn}>
              {chooseBtn(state.farmStatus)}
            </div>

          </div>
        </div>
  </>
      );
  }

