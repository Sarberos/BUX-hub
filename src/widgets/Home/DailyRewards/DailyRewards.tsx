import MainBtn from '@widgets/UI/MainBtn/MainBtn'
import s from './DailyRewards.module.scss'
import { DAYBOXLIST } from '@shared/Home/consts/dayBoxList'
import DayBox from '../DayBox/DayBox'
import BottomLine from '@widgets/UI/BottomLine/BottomLine'

export default function(){
    return(
        <div className={s.daily_reward_wrap}>
            <div className={s.reward_title}>
                Daily reward
            </div>
            <div className={s.box_slider}>
                {DAYBOXLIST.map((elem,index)=>(
                    <DayBox {...elem} key={index} />
                ))}
            </div>
            <div className={s.rewar_subtitle}>
            Your total profit: 259К
            </div>
            <div className={s.claim_btn}>
                <MainBtn>Claim</MainBtn>
            </div>
            <BottomLine/>
        </div>
    )
}