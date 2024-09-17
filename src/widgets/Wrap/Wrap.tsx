import s from "./Wrap.module.scss";
import { TFrensTimerType, TTimerType } from "@pages/Home/Home";
import { useEffect, useState } from "react";
import { Footer } from "@widgets/UI/Footer/Footer";
import { useAppDispatch, useAppSelector } from "@shared/utilits/redux/hooks";
import { setFormattedTaimer, setStoreFarmStatus } from "@shared/utilits/redux/redux_slice/home_slice";
import { EnumFarmStatus } from "@shared/Home/consts/farmStatus.enum";
import { EnumFrensFarmStatus } from "@shared/Frens/consts/frensFarmStatus.enum";
import { setFrensFarmStatus, setTaimerValue } from "@shared/utilits/redux/redux_slice/frens_slice";
import { Outlet } from "react-router";
import { useTelegramApi } from "@shared/Home/hooks/useTelegramApi";
import home_bg from '@shared/Wrap/assets/img/farm_page.png'
import tasks_bg from '@shared/Wrap/assets/img/tasks_page.png'
import raiting_bg from '@shared/Wrap/assets/img/raiting_page.png'
import frens_bg from '@shared/Wrap/assets/img/frens_page.png'


const frensHandlingTaimer = (mins: number, hours: number, dispatch: any) => {  
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
const handlingTaimer = (sec:number,mins: number, hours: number, dispatch: any) => {  
  sec > 0 && sec--;  
  if (sec === 0) {  
    mins > 0 && mins--; 
    sec=59;
    if(mins===0){
      if (hours === 0) {  
        dispatch(setStoreFarmStatus(EnumFarmStatus.CLAIM));  
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
  const dispatch = useAppDispatch()
  const state = useAppSelector(state=>state.home)
  const frenState = useAppSelector(state=>state.frens)
  
  const [currenPageId, setCurrentPageId] = useState(1);
  const [background, setBackground] = useState(home_bg);
  const [farmTimerValue, setFarmTimerValue]=useState<TTimerType>(state.timer)
  const [frensTimerValue, setFrensTimerValue]=useState<TFrensTimerType>(frenState.timer)
  

useEffect(()=>{
    tg.expand()
    tg.setHeaderColor("#000000");
  })
useEffect(()=>{
  farmTimerValue!==state.timer &&   setFarmTimerValue(state.timer)
},[state.timer])
useEffect(()=>{
    const intervalId = setInterval(() => {  
      if (farmTimerValue) {  
        handlingTaimer(farmTimerValue.sec || 0 ,farmTimerValue.minuts || 0, farmTimerValue.hours || 0,dispatch);  }  
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

  useEffect(()=>{
    currenPageId ===1 && setBackground(home_bg)
    currenPageId ===2 && setBackground(tasks_bg)
    currenPageId ===3 && setBackground(raiting_bg)
    currenPageId ===4 && setBackground(frens_bg)
  },[currenPageId])
  
  return (
  <div style={{backgroundImage:`url(${background})`}}  className={s.wrap}>
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
  );
}
