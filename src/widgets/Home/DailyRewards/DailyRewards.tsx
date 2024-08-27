import MainBtn from '@widgets/UI/MainBtn/MainBtn'
import s from './DailyRewards.module.scss'
import { DAYBOXLIST } from '@shared/Home/consts/dayBoxList'
import DayBox from '../DayBox/DayBox'
import BottomLine from '@widgets/UI/BottomLine/BottomLine'
import { useClaimBonus } from '@shared/Home/hooks/useClaimBonus'
import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks'
import { updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice'
import { TDayBoxProps } from '@shared/Home/types/dayBox'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'

export default function({onClose}:{onClose:()=> void}){
    const {t} =useTranslation()
    const dispatch =useAppDispatch()
    const state=useAppSelector(state=>state.home)
    const {mutate:claim_bonus}=useClaimBonus()
    const queryClient =useQueryClient()


    const onClaimBonus=(dayNumber:number)=>{
        claim_bonus();
        onClose();
        const currentObj: Omit<TDayBoxProps,'currentDay'>[]=DAYBOXLIST.filter(elem=>
            elem.rewardDay===dayNumber)
        dispatch(updateTotalCoins(currentObj[1].rewardValue))
        queryClient.invalidateQueries({ queryKey: ['farm_info'] })
    }
    return(
        <div className={s.daily_reward_wrap}>
            <div className={s.reward_title}>
                {t('dailyReward')}
            </div>
            <div className={s.box_slider}>
                {DAYBOXLIST.map((elem,index)=>(
                    <DayBox currentDay={state.bonusDay} {...elem} key={index} />
                ))}
            </div>
            <div className={s.rewar_subtitle}>
            {`${t('rewardsProfit')}: ${259}К`}
            </div>
            <div className={s.claim_btn}>
                <MainBtn event={()=>onClaimBonus(state.bonusDay)} >{t('claim')}</MainBtn>
            </div>
            <BottomLine/>
        </div>
    )
}