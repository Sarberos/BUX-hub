import s from '@pages/Frens/Frens.module.scss'
import FrensItem from '@widgets/Frens/FrensItem/FrensItem'
import { TFrensItem, useGetFrensInfo } from '@shared/Frens/hooks/useGetFrensInfo'
import { TTimerType } from '@pages/Home/Home'
import { useClaimFrensCoins } from '@shared/Frens/hooks/useClaimFrensCoins'
import {useState,useEffect} from 'react'
import { EnumFrensFarmStatus } from '@shared/Frens/consts/frensFarmStatus.enum'
import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks'
import { setFrensFarmStatus, setInviteStatus, setTaimerValue } from '@shared/utilits/redux/redux_slice/frens_slice'
import { updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice'
import { calcDateValue } from '@shared/Home/helpersFunc/changeEndDateFormat.ts'
import { Preloader } from '@widgets/UI/Preloader/Preloader'
import { useTranslation } from 'react-i18next'
import BottomPopUp from '@widgets/UI/BottomPopUp/BottomPopUp'
import InvitePopUp from '@widgets/Frens/InvitePopUp/InvitePopUp'
import {useTelegramApi} from "@shared/Home/hooks/useTelegramApi.tsx";
import {SuccessClaimAnim} from "@widgets/UI/SuccessClaim/SuccessClaimAnim.tsx";
import frens_bg from '@shared/assets/webp_bg/frens.webp'


export type TFrensProps = {
  timerValue: TTimerType;
  setTimerValue?: (value: TTimerType) => void;
  inviteStat?:boolean;
  setInvateStat: (value:boolean)=>void
};


export const comprasionNumbers=(revenuosDate:string)=>{
    const revTime=new Date(revenuosDate);
    const now = new Date();
    return revTime <=now
}

const Frens=()=>{
    const {t} =useTranslation()
    const {hapticFeedBack}=useTelegramApi()
    const dispatch =useAppDispatch()
    const frensState=useAppSelector(state=>state.frens)
    const{data:frensData,isLoading:frensLoading}=useGetFrensInfo();
    const {mutate:claimCoins}=useClaimFrensCoins()

    const [isFireCracer, setIsFireCracer] = useState<boolean>(false)
    const [refCoins,setRefCoins]=useState<number>(0)
    const [refList, setRefList]=useState<TFrensItem[]>()

    const onClaimFrensCoins=()=>{
        hapticFeedBack()
        setRefCoins(0);
        claimCoins();
        dispatch(setFrensFarmStatus(EnumFrensFarmStatus.FARMING))
        dispatch(updateTotalCoins(Math.ceil(refCoins)))
        dispatch(setTaimerValue({formattedHours:'24',formattedMinutes:'00',hours:24,minuts:0}))
        setIsFireCracer(true);
        const timeout = setTimeout(() => setIsFireCracer(false), 2800);
        return () => clearTimeout(timeout);
    }

    useEffect(()=>{
        if (frensData) {
            refCoins!==frensData.revenues && setRefCoins(frensData.revenues)
            comprasionNumbers(frensData.next_revenues_time) ?  dispatch(setFrensFarmStatus(EnumFrensFarmStatus.CLAIM)) : dispatch(setTaimerValue(calcDateValue(frensData.next_revenues_time)));
            frensData.content.length !==0 &&  setRefList(frensData.content.sort((a, b) => b.coins-a.coins));
        }
    },[frensData])
    if(frensLoading){ 
        return <Preloader />
      }else
     return(
        <>
            <div className={s.frens_wrap}>
                <img src={frens_bg} alt="" className={s.background_img}/>
                <div className={s.title_wrap}>
                    <p className={s.title}>{t("frensTitle")}</p>
                </div>
                <div className={s.frens_coins_wrap}>
                    <div className={s.frens_coins_wrap}>
                        <p className={s.frens_coins_value}>{Math.ceil(refCoins)}</p>
                        <div className={isFireCracer ? `${s.frens_coins_anim} ${s.active}` : s.frens_coins_anim}>
                            {isFireCracer && <SuccessClaimAnim/>}
                        </div>
                        {frensData?.content?.length !== 0 && frensState.farmStatus === EnumFrensFarmStatus.FARMING &&
                          <button disabled={true}
                                  className={s.frens_coin_claim_btn}>{`${t('claim')} ${frensState.timer?.formattedHours}h ${frensState.timer?.formattedMinutes}m`}</button>}
                        {frensData?.content?.length !== 0 && frensState.farmStatus === EnumFrensFarmStatus.CLAIM &&
                          <button onClick={() => onClaimFrensCoins()}
                                  className={`${s.frens_coin_claim_btn} ${s.active}`}>{t('claim')}</button>}
                        {!frensData || frensData?.content?.length === 0 &&
                          <button onClick={() => dispatch(setInviteStatus(true))}
                                  className={`${s.frens_coin_claim_btn} ${s.active}`}>{t('frensTitle')}</button>}
                    </div>
                </div>
                <div className={s.subtitle_wrap}>
                    <p className={s.subtitle}>{t("frensSub")}</p>
                </div>
                {frensData && frensData?.content?.length !== 0 &&
                  <p className={s.frens_amount}>{`${frensData?.content?.length} ${t('frens')}`}</p>}
                {frensData?.content?.length != 0 && <div className={s.frens_list}>
                    {/*{FRENSLIST?.map((elem,index)=>(*/}
                    {/*    <FrensItem key={index} {...elem} />*/}
                    {/*))}*/}
                    {refList?.map((elem, index) => (
                      <FrensItem key={index} {...elem} />
                    ))}
                </div>}

                <div className={s.invite_frens_btn_wrap}>
                    <button onClick={() => dispatch(setInviteStatus(true))}
                            className={s.invite_frens_btn}>{t("invite_fren")}</button>
                </div>
            </div>
            {frensState.inviteStatus && (
              <div className={`${s.daily_reward}`}>
                <BottomPopUp onClose={()=>dispatch(setInviteStatus(false))}>
                    <InvitePopUp  />
                </BottomPopUp>
            </div>)
        }
        </>
    )
}
export default Frens;