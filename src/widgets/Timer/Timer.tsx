import s from './Timer.module.scss'
import taimerIco from '@shared/UIComponents/assets/taimer_img.svg'

export const Timer=({timerValue}:{timerValue:string|null})=>{
    return(
        <div className={s.taimer_wrap}>
            <div className={s.inner_wrap}>
                <div className={s.taimer_img_wrap}>
                    <img src={taimerIco} className={s.taimer_img}/>
                </div>
                <div className={s.taimer_value}>{timerValue}</div>
            </div>
        </div>
    )
}