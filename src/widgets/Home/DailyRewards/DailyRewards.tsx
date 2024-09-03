import MainBtn from '@widgets/UI/MainBtn/MainBtn'
import s from './DailyRewards.module.scss'
import { DAYBOXLIST } from '@shared/Home/consts/dayBoxList'
import DayBox from '../DayBox/DayBox'
import { useClaimBonus } from '@shared/Home/hooks/useClaimBonus'
import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks'
import { setBonusDay, updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice'
import { TDayBoxProps } from '@shared/Home/types/dayBox'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { useTelegramApi } from '@shared/Home/hooks/useTelegramApi'
import { useEffect, useState } from 'react'

export default function({buttonActive,onClose}:{onClose:()=> void, buttonActive: boolean}){
    const {t} =useTranslation()
    const {user}=useTelegramApi()
    const dispatch =useAppDispatch()
    const state=useAppSelector(state=>state.home)
    const {mutate:claim_bonus}=useClaimBonus()
    const queryClient =useQueryClient()

    const [userLanguage,setLanguage]=useState<string>('')
    useEffect(()=>{
        if(user?.language_code){
            setLanguage(user.language_code)
      }
      })


    const onClaimBonus=(dayNumber:number)=>{
        claim_bonus();
        onClose();
        dispatch(setBonusDay(state.bonusDay+1))
        const currentObj: Omit<TDayBoxProps,'currentDay'>[]=DAYBOXLIST.filter(elem=>
            elem.rewardDay===dayNumber+1)
        dispatch(updateTotalCoins(currentObj[0].rewardValue))
        queryClient.invalidateQueries({ queryKey: ['farm_info'] })
    }
    return(
        <div className={s.daily_reward_wrap}>
            <div className={s.reward_title}>
                {userLanguage==='cr'? 'Ежедневная награда': t('dailyReward') }
            </div>
            <div className={s.box_slider}>
                {DAYBOXLIST.map((elem,index)=>{
                    return elem.rewardDay >= state.bonusDay + 1   
                    ? <DayBox currentDay={state.bonusDay} {...elem} key={index} />   
                    : null  
                })}
            </div>
            <div className={s.rewar_subtitle}>
                {`${userLanguage==='cr'? 'Твой общий доход': t('rewardsProfit') }: ${DAYBOXLIST.reduce((acc,item)=>acc + item.rewardValue, 0)/1000}К`}
            </div>
            <div className={s.claim_btn}>
                {buttonActive && <MainBtn  event={()=>onClaimBonus(state.bonusDay)} >{t('claim')}</MainBtn>}
                {!buttonActive && <MainBtn  backColor={'#282828'} disabled={true} >{t('claim')}</MainBtn>}
            </div>
        </div>
    )
}