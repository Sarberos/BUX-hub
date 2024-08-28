import s from "./Wrap.module.scss";
import home_bg from "@shared/Wrap/assets/img/fix_home_background.png";
import tasks_bg from "@shared/Wrap/assets/img/fix_tsks_background.png";
import raiting_bg from "@shared/Wrap/assets/img/fix_raiting_background.png";
import frens_bg from "@shared/Wrap/assets/img/fix_frens_background.png";
import { Home, TTimerType } from "@pages/Home/Home";
import { useEffect, useState } from "react";
import { Tasks } from "@pages/Tasks/Tasks";
import { Raiting } from "@pages/Raiting/Raiting";
import { Frens } from "@pages/Frens/Frens";
import NotFoundPage from "@widgets/UI/NotFoundPage/NotFoundPage";
import { Footer } from "@widgets/UI/Footer/Footer";
import { Preloader } from "@widgets/UI/Preloader/Preloader";
import { useAppDispatch, useAppSelector } from "@shared/utilits/redux/hooks";
import { setFormattedTaimer, setStoreFarmStatus } from "@shared/utilits/redux/redux_slice/home_slice";
import { EnumFarmStatus } from "@shared/Home/consts/farmStatus.enum";
import { EnumFrensFarmStatus } from "@shared/Frens/consts/frensFarmStatus.enum";
import { setFrensFarmStatus, setTaimerValue } from "@shared/utilits/redux/redux_slice/frens_slice";

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

export function Wrap() {

  const state = useAppSelector(state=>state.home)
  const frenState = useAppSelector(state=>state.frens)
  const dispatch = useAppDispatch()

  const [currenPageId, setCurrentPageId] = useState(1);
  const [currentBg, setCurrentBg] = useState("");
  const [inviteStat, setInvateStat]= useState(false)
  const [miniTaskOpen, setMiniTasksOpen]= useState(false)
  const [miniTaskStyle, setminiTaskStyle]= useState<React.CSSProperties>()  
  const [farmTimerValue, setFarmTimerValue]=useState<TTimerType>(state.timer)
  const [frensTimerValue, setFrensTimerValue]=useState<TTimerType>(frenState.timer)


  useEffect(()=>{
    miniTaskOpen ? setminiTaskStyle({zIndex:-1}) :setminiTaskStyle({})
  },[miniTaskOpen])
  useEffect(() => {
    switch (currenPageId) {
      case 1:
        setCurrentBg(home_bg);
        break;
      case 2:
        setCurrentBg(tasks_bg);
        break;
      case 3:
        setCurrentBg(raiting_bg);
        break;
      case 4:
        setCurrentBg(frens_bg);
        break;

      default:
        setCurrentBg(home_bg);
        break;
    }
  }, [currenPageId]);


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
      <div
        style={currenPageId === 1 ? {backgroundImage: `url(${currentBg})`,backgroundPosition:'50% -200px'}:{
          backgroundImage: `url(${currentBg})`,
        }}
        className={s.inner_wrap}
      >
        {currenPageId === 1 ? (
          <Home
          timerValue={farmTimerValue}
          setTimerValue={setFarmTimerValue}
          />
        ) : currenPageId === 2 ? (
          <Tasks
            setMiniTasksOpen={setMiniTasksOpen}
            miniTaskOpen={miniTaskOpen}
          />
        ) : currenPageId === 3 ? (
          <Raiting />
        ) : currenPageId === 4 ? (
          <Frens 
          timerValue={frensTimerValue}
          setTimerValue={setFrensTimerValue}
          inviteStat={inviteStat} 
          setInvateStat={setInvateStat} />
        ) : (
          <NotFoundPage />
        )}
        <div style={miniTaskStyle} className={s.footer_wrap}>
          {true && (
            <Footer
              currenPageId={currenPageId}
              setCurrentPageId={setCurrentPageId}
            />
          ) }
          {/* {them ==='light' &&(
            <WhiteFooter
              currenPageId={currenPageId}
              setCurrentPageId={setCurrentPageId}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
