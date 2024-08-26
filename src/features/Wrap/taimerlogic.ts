import { EnumFarmStatus } from "@shared/Home/consts/farmStatus.enum";
import { useAppDispatch } from "@shared/utilits/redux/hooks";
import { setFormattedTaimer, setStoreFarmStatus } from "@shared/utilits/redux/redux_slice/home_slice";

const dispatch = useAppDispatch()
export const handlingTaimer=(mins: number, hours: number)=>{
    mins>0 && mins--;
     if(mins===0){
       if(hours===0)
       {
         dispatch(setStoreFarmStatus(EnumFarmStatus.CLAIM))
       }
       hours--
       mins=59
     }
     const formattedHours= String(hours).padStart(2, '0')
     const formattedMinutes= String(mins).padStart(2, '0')
   dispatch(setFormattedTaimer({formattedHours,formattedMinutes,hours,minuts:mins}))
   }