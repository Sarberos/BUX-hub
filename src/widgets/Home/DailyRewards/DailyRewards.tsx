import MainBtn from '@widgets/UI/MainBtn/MainBtn'
import s from './DailyRewards.module.scss'
import { DAYBOXLIST } from '@shared/Home/consts/dayBoxList'
import DayBox from '../DayBox/DayBox'
import BottomLine from '@widgets/UI/BottomLine/BottomLine'

export default function({onClose,currentDay}:{currentDay:number,onClose:()=> void}){

    return(
        <div className={s.daily_reward_wrap}>
            <div className={s.reward_title}>
                Daily reward
            </div>
            <div className={s.box_slider}>
                {DAYBOXLIST.map((elem,index)=>(
                    <DayBox currentDay={currentDay} {...elem} key={index} />
                ))}
            </div>
            <div className={s.rewar_subtitle}>
            Your total profit: 259К
            </div>
            <div className={s.claim_btn}>
                <MainBtn event={onClose} >Claim</MainBtn>
            </div>
            <BottomLine/>
        </div>
    )
}