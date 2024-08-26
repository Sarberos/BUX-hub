import s from '@pages/Frens/Frens.module.scss'
import BottomPopUp from '@widgets/UI/BottomPopUp/BottomPopUp'
import FrensItem from '@widgets/Frens/FrensItem/FrensItem'
import InvitePopUp from '@widgets/Frens/InvitePopUp/InvitePopUp'
import MainBtn from '@widgets/UI/MainBtn/MainBtn'
import { TFrensItem, useGetFrensInfo } from '@shared/Frens/hooks/useGetFrensInfo'
import { TTimerType } from '@pages/Home/Home'
import { useClaimFrensCoins } from '@shared/Frens/hooks/useClaimFrensCoins'
import {useState,useEffect} from 'react'
import { EnumFrensFarmStatus } from '@shared/Frens/consts/frensFarmStatus.enum'
import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks'
import { setFrensFarmStatus, setTaimerValue } from '@shared/utilits/redux/redux_slice/frens_slice'
import { updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice'
import { changeEndDateFormat } from '@features/Home/changeEndDateFormat'

export type TFrensProps = {
  timerValue: TTimerType;
  setTimerValue?: (value: TTimerType) => void;
  inviteStat?:boolean;
  setInvateStat: (value:boolean)=>void
};

export const Frens=({setInvateStat,inviteStat,timerValue}:TFrensProps)=>{
    const dispatch =useAppDispatch()
    const frensState=useAppSelector(state=>state.frens)
    const{data:frensData}=useGetFrensInfo();
    const {mutate:claimCoins}=useClaimFrensCoins()

    const [refCoins,setRefCoins]=useState<number>(0)
    const [refList, setRefList]=useState<TFrensItem[]>()

    const onClaimFrensCoins=()=>{
        claimCoins();
        dispatch(setFrensFarmStatus(EnumFrensFarmStatus.FARMING))
        dispatch(updateTotalCoins(refCoins))
        dispatch(setTaimerValue({formattedHours:'24',formattedMinutes:'00',hours:24,minuts:0}))
    }
    useEffect(()=>{
        if (frensData) {
            refCoins!==frensData.revenues && setRefCoins(frensData.revenues)
            frensState.farmStatus===EnumFrensFarmStatus.FARMING &&  dispatch(setTaimerValue(changeEndDateFormat(frensData.next_revenues_time)))
            new Date(frensData.next_revenues_time).getTime()=== new Date().getTime() && dispatch(setFrensFarmStatus(EnumFrensFarmStatus.CLAIM))
            frensData.content.length !==0 &&  setRefList(frensData.content);
        }
    },[frensData])


    return(
        <div className={s.frens_wrap}>
            <div className={s.title_wrap}>
                <p className={s.title}>Invite frens</p>
            </div>
            <div className={s.frens_coins_wrap}>
                <div className={s.frens_coins_wrap}>
                    <p className={s.frens_coins_value}>{refCoins}</p>
                    {frensState.farmStatus===EnumFrensFarmStatus.FARMING ? (
                        <button disabled={true} className={s.frens_coin_claim_btn}>{`Claim ${timerValue?.formattedHours}h ${timerValue?.formattedMinutes}m`}</button>
                    ):(
                        <button  onClick={()=>onClaimFrensCoins()} className={`${s.frens_coin_claim_btn} ${s.active}`}>Claim</button>
                    )}
                    
                </div>
            </div>
            <div className={s.subtitle_wrap}>
                <p className={s.subtitle}>You receive a 5% bonus on points earned by friends</p>
            </div>
            <div className={s.frens_list_wrap}>
                <p className={s.frens_amount}>{`${200} frens`}</p>
                <ul className={s.frens_list}>
                    {refList?.map((elem,index)=>(
                        <FrensItem key={index} {...elem} /> 
                    ))}
                </ul>
            </div>
            <div className={s.invite_frens_btn}>
                <MainBtn event={()=>setInvateStat(true)} >Invite a fren</MainBtn>
            </div>
            <div className={inviteStat ?  `${s.invite_fren_pop_up} ${s.active}`:`${s.invite_fren_pop_up}`}>
                <BottomPopUp onClose={()=>setInvateStat(false)}>
                  <InvitePopUp />
                </BottomPopUp>
            </div>
        </div>

    )
}