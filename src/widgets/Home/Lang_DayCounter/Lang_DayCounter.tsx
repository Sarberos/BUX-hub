import s from './Lang_DayCounter.module.scss'
import select_img from '@shared/Home/assets/home_img/select_img.svg'
import fire_ico from '@shared/Home/assets/home_img/day_fire.svg'


export function Lang_DayCounter(){
    return(
    <div className={s.language_wrap}>
        <div className={s.language_select}>
          <div className={s.language_txt}>
            <span>ENG</span>
            <div className={s.select_ico_wrap}>
              <img src={select_img} alt="" className={s.select_ico} />
            </div>
          </div>
        </div>
        <div className={`${s.language_select} ${s.days}`}>
          <div className={s.day_counter}>
            <div className={s.day_counter_img_wrap}>
              <img src={fire_ico} alt="" />
            </div>
            <div className={s.day_counter_txt}>day 1</div>
          </div>
        </div>
      </div>
    )
}