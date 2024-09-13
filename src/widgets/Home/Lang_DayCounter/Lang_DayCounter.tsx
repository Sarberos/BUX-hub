import s from './Lang_DayCounter.module.scss'
import fire_ico from '@shared/assets/high quality svg/home_fire_red.svg'
import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks'
import { setIsDailyReward } from '@shared/utilits/redux/redux_slice/home_slice'
import { LangSelect } from '@widgets/UI/LangSelect/LangSelect'


export function Lang_DayCounter(){
  const dispatch=useAppDispatch()
  const state=useAppSelector(state=>state.home)
    return (
      <div className={s.language_wrap}>
        <LangSelect />
        <div
          onClick={() => {
            dispatch(setIsDailyReward(true));
          }}
          className={s.day_counter}
        >
          <div className={s.day_counter_img_wrap}>
            <img src={fire_ico} alt="" className="" />
          </div>
          <div className={s.day_counter_txt}>{`day ${state.bonusDay}`}</div>
        </div>
      </div>
    );
}