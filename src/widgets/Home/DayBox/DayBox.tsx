import { TDayBoxProps } from '@shared/Home/types/dayBox'
import s from './DayBox.module.scss'



export default function ({boxImg,rewardValue,rewardDay}:TDayBoxProps){
    return (
        <div className={s.prize_box_wrap}>
            <div className={s.reward_info_wrap}>
                <div className={s.prize_img_wrap}>
                    <img src={boxImg}  className={s.prize_img} />
                </div>
                <div className={s.reward_value}>{`${rewardValue}K`}</div>
            </div>
            <div className={s.day_counter}>{`Day ${rewardDay}`}</div>
        </div>
    )
}