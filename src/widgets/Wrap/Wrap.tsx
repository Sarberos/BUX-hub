import s from "./Wrap.module.scss";
import { TTimerType } from "@pages/Home/Home";
import { useEffect, useState } from "react";
import { Footer } from "@widgets/UI/Footer/Footer";
import { Preloader } from "@widgets/UI/Preloader/Preloader";
import { useAppDispatch, useAppSelector } from "@shared/utilits/redux/hooks";
import { setFormattedTaimer, setLanguage, setStoreFarmStatus } from "@shared/utilits/redux/redux_slice/home_slice";
import { EnumFarmStatus } from "@shared/Home/consts/farmStatus.enum";
import { EnumFrensFarmStatus } from "@shared/Frens/consts/frensFarmStatus.enum";
import { setFrensFarmStatus, setInviteStatus, setTaimerValue } from "@shared/utilits/redux/redux_slice/frens_slice";
import { Outlet } from "react-router";
import BottomPopUp from "@widgets/UI/BottomPopUp/BottomPopUp";
import InvitePopUp from "@widgets/Frens/InvitePopUp/InvitePopUp";
import { useTelegramApi } from "@shared/Home/hooks/useTelegramApi";
import i18next from "i18next";
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
const handlingTaimer = (mins: number, hours: number, dispatch: any) => {  
  mins > 0 && mins--;  
  if (mins === 0) {  
    if (hours === 0) {  
      dispatch(setStoreFarmStatus(EnumFarmStatus.CLAIM));  
    }  
    hours--;  
    mins = 59;  
  }  
  const formattedHours = String(hours).padStart(2, '0');  
  const formattedMinutes = String(mins).padStart(2, '0');  
  dispatch(setFormattedTaimer({ formattedHours, formattedMinutes, hours, minuts: mins }));  
}

export const  Wrap=() =>{
  const {user}=useTelegramApi()
  const dispatch = useAppDispatch()
  const state = useAppSelector(state=>state.home)
  const frenState = useAppSelector(state=>state.frens)
  
  const [currenPageId, setCurrentPageId] = useState(1);
  const [farmTimerValue, setFarmTimerValue]=useState<TTimerType>(state.timer)
  const [frensTimerValue, setFrensTimerValue]=useState<TTimerType>(frenState.timer)
  
  useEffect(()=>{
    if(user?.language_code){
      user?.language_code==='ru'||user?.language_code==='en'||user?.language_code==='fr'||user?.language_code==='de' && dispatch(setLanguage({value:user.language_code.toUpperCase(),label:user.language_code.toUpperCase() }))
    i18next.changeLanguage(user?.language_code);
  }
  },[user?.language_code])
useEffect(()=>{
  farmTimerValue!==state.timer &&   setFarmTimerValue(state.timer)
},[state.timer])
useEffect(()=>{
    const intervalId = setInterval(() => {  
      if (farmTimerValue) {  
        handlingTaimer(farmTimerValue.minuts || 0, farmTimerValue.hours || 0,dispatch);  }  
    },60000);  
  
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
  
if(false){
  return <Preloader />
}else 
  return (
  <div className={s.wrap}>
    {frenState.inviteStatus && <div className={frenState.inviteStatus ?  `${s.invite_fren_pop_up} ${s.active}`:`${s.invite_fren_pop_up}`}>
      <BottomPopUp onClose={()=>dispatch(setInviteStatus(false))}>
        <InvitePopUp  />
      </BottomPopUp>
    </div>
  }
  {/* {state.isMiniTasks &&  <div className={state.isMiniTasks ?`${s.mini_tasks_wrap} ${s.active}` :`${s.mini_tasks_wrap}`}>
    <PopUp onClose={()=>dispatch(setIsMiniTasks(true))}>
      <MiniTasks />
    </PopUp>
  </div> } */}
    {!frenState.inviteStatus && <>
      <div className={s.child_wrap}>
        <Outlet/>
      </div>
      <div className={s.footer_wrap}>
        <Footer
          currenPageId={currenPageId}
          setCurrentPageId={setCurrentPageId}
        />
      </div>
    </>
    }
  </div>
  );
}
