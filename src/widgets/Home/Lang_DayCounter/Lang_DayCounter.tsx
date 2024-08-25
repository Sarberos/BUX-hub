import s from './Lang_DayCounter.module.scss'
import fire_ico from '@shared/Home/assets/home_img/day_fire.svg'
import { useAppSelector } from '@shared/utilits/redux/hooks'
import { LangSelect } from '@widgets/UI/LangSelect/LangSelect'


export function Lang_DayCounter(){
  const state=useAppSelector(state=>state.home)
    return(
    <div className={s.language_wrap}>
        <LangSelect />
        <div className={s.day_counter}>
          <div className={s.day_counter_img_wrap}>
            <img src={fire_ico} alt="" />
          </div>
          <div className={s.day_counter_txt}>{`day ${state.bonusDay}`}</div>
        </div>
      </div>
    )
}