import { useAppSelector } from '@shared/utilits/redux/hooks'
import s from './Timer.module.scss'
import taimerIco from '@shared/UIComponents/assets/taimer_img.svg'

export const Timer=()=>{
    const homeState=useAppSelector(state=>state.home)
    return(
        <div className={s.taimer_wrap}>
            <div className={s.inner_wrap}>
                <div className={s.taimer_img_wrap}>
                    <img src={taimerIco} className={s.taimer_img}/>
                </div>
                <div className={s.taimer_value}>{`${homeState.timer?.formattedHours}:${homeState.timer?.formattedMinutes}:${homeState.timer?.formattedSec}`}</div>
            </div>
        </div>
    )
}