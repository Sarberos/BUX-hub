import s from './Lang_DayCounter.module.scss'
import fire_ico from '@shared/Home/assets/home_img/day_fire.svg'
import { LangSelect } from '@widgets/UI/LangSelect/LangSelect'


export function Lang_DayCounter(){
    return(
    <div className={s.language_wrap}>
        <LangSelect />
        <div className={s.day_counter}>
          <div className={s.day_counter_img_wrap}>
            <img src={fire_ico} alt="" />
          </div>
          <div className={s.day_counter_txt}>day 1</div>
        </div>
      </div>
    )
}