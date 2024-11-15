import s from "./Wrap.module.scss";
import { TFrensTimerType, TTimerType } from "@pages/Home/Home";
import {useEffect, useLayoutEffect, useState} from "react";
import { Footer } from "@widgets/UI/Footer/Footer";
import { useAppDispatch, useAppSelector } from "@shared/utilits/redux/hooks";
import {
  setFormattedTaimer,
  setIsDailyReward,
  setReduxFarmedCoins,
  setWelcomeStatus
} from "@shared/utilits/redux/redux_slice/home_slice";
import { EnumFrensFarmStatus } from "@shared/Frens/consts/frensFarmStatus.enum";
import { setFrensFarmStatus, setTaimerValue } from "@shared/utilits/redux/redux_slice/frens_slice";
import { Outlet } from "react-router";
import { useTelegramApi } from "@shared/Home/hooks/useTelegramApi";
// import { QrCode } from "@widgets/UI/QrCode/QrCode";
import { HistorySlider } from "@widgets/Home/HistorySlider/HistorySlider";
import {useQueryClient} from "@tanstack/react-query";
import { Transition } from 'react-transition-group';
import {TTransitionType} from "@shared/UIComponents/types/historySlider.ts";
import BottomPopUp from "@widgets/UI/BottomPopUp/BottomPopUp.tsx";
import DailyRewards from "@widgets/Home/DailyRewards/DailyRewards.tsx";
import {EnumBonusStatus} from "@shared/Home/consts/bonusStatus.enum.ts";
import {getBonusInfo} from "@features/Wrap/getBonusInfo.ts";


export interface IOutletContext{
  setIsHistory:(v:boolean)=>void;
  farmedCoins:number;
  setFarmedCoins:(v:number)=>void;
}

const frensHandlingTaimer = (mins: number, hours: number, dispatch: any ) => {
  mins > 0 && mins--;  
  if (mins === 0) {  
    if (hours === 0) {  
      dispatch(setFrensFarmStatus(EnumFrensFarmStatus.CLAIM));  
    }  
    hours--;  
    mins = 59;  
  }  
  const formattedHours = String(hours).padStart(2, '0');  
  const formattedMinutes = String(mins).padStart(2, '0');  
  dispatch(setTaimerValue({ formattedHours, formattedMinutes, hours, minuts: mins }));  
}
const handlingTaimer = (sec:number,mins: number, hours: number, dispatch: any,queryClient:any) => {
  sec > 0 && sec--;  
  if (sec === 0) {  
    mins > 0 && mins--; 
    sec=59;
    if(mins===0){
      if (hours === 0) {
        queryClient.invalidateQueries({queryKey:['farm_info']});
      }  
      hours--;  
      mins = 59;  
    }
    
  }  
  const formattedHours = String(hours).padStart(2, '0');  
  const formattedMinutes = String(mins).padStart(2, '0');  
  const formattedSec = String(sec).padStart(2, '0');  
  dispatch(setFormattedTaimer({ formattedHours, formattedMinutes,formattedSec,sec, hours, minuts: mins }));  
}


export const  Wrap=() =>{
  const {tg}=useTelegramApi()
  const queryClient=useQueryClient()
  const dispatch = useAppDispatch()
  const state = useAppSelector(state=>state.home)
  const frenState = useAppSelector(state=>state.frens)
  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  const [currenPageId, setCurrentPageId] = useState(1);
  const [farmTimerValue, setFarmTimerValue]=useState<TTimerType>(state.timer)
  const [frensTimerValue, setFrensTimerValue]=useState<TFrensTimerType>(frenState.timer)

  useEffect(()=>{
      getBonusInfo(dispatch);
    },[dispatch]);
  useLayoutEffect(() => {
      tg.expand()
      tg.setHeaderColor("#000000");
    }, []);
  useEffect(()=>{
    farmTimerValue!==state.timer &&   setFarmTimerValue(state.timer)
  },[state.timer])
  useEffect(()=>{
      const intervalId = setInterval(() => {
        if (farmTimerValue) {
          handlingTaimer(farmTimerValue.sec || 0 ,farmTimerValue.minuts || 0, farmTimerValue.hours || 0,dispatch,queryClient);  }
      },1000);

      return () => clearInterval(intervalId);
    },[farmTimerValue])
  useEffect(()=>{
    frensTimerValue!==frenState.timer && setFrensTimerValue(frenState.timer)
  },[frenState.timer])
  useEffect(()=>{
    const frensInterval = setInterval(() => {
      if (frensTimerValue) {
        frensHandlingTaimer(frensTimerValue.minuts || 0, frensTimerValue.hours || 0,dispatch);
      }
    },60000);

    return () => clearInterval(frensInterval);

  },[frensTimerValue])
  useEffect(() => {
    const farmCoinsInterval=setInterval(()=>{
      dispatch(setReduxFarmedCoins(parseFloat((state.farmedCoins + 0.01).toFixed(2))))
    },2700)

    return () => clearInterval(farmCoinsInterval);
  }, [state.farmedCoins]);


  const transitionStyles:TTransitionType= {
    entering: { opacity: 0, transform:'translateY(20)'},
    entered:  { opacity: 1,transform:'translateY(0)', transition:'.4s'},
    exiting:  {opacity: 0,transform:'translateY(20px)', transition:'.5s' },
    exited:  {opacity:0},
    unmounted: {},
  };

// if(!isMobile){
//   return <QrCode/>
// }
  return (
    <>
      <div className={s.wrap}>
        <div className={s.child_wrap}>
            <Outlet/>
        </div>
        <div className={s.footer_wrap}>
          <Footer
            currenPageId={currenPageId}
            setCurrentPageId={setCurrentPageId}
          />
        </div>
      </div>
      <Transition in={state.welcomeStatus} timeout={600} mountOnEnter={true} unmountOnExit={true} >
        {(state)=>(
          <div className={s.history_elem} style={transitionStyles[state]}>
            <HistorySlider closeHistory={()=>dispatch(setWelcomeStatus(false))} />
          </div>
        )}
      </Transition>
      <Transition in={state.isDailyReward} timeout={0} mountOnEnter={true} unmountOnExit={true}>
        <div className={`${s.daily_reward}`}>
          <BottomPopUp onClose={() => dispatch(setIsDailyReward(false))}>
            <DailyRewards
              buttonActive={state.dailyRewardsStatus === EnumBonusStatus.CLAIM}
            />
          </BottomPopUp>
        </div>
      </Transition>
    </>
  );
}
