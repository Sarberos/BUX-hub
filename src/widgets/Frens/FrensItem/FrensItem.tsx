import s from './FrensItem.module.scss'
import { TFrensItem } from '@shared/Frens/hooks/useGetFrensInfo'
import {generateAva} from "@shared/Frens/helpereFunction/generateFrenIco.tsx";

export default function({photo,active_usernames,coins,day_revenues,first_name,last_name}:TFrensItem){

  return (
    <div className={s.fren_profile_wrap}>
      <div className={s.fren_info}>
          <div className={s.fren_img_wrap}>
            {generateAva(photo,{first_name,last_name})}
          </div>
          <div className={s.fren_title_wrap}>
              <p className={s.fren_title}>{active_usernames[0]}</p>
              <p className={s.fren_subtitle}>{`+${Math.ceil(day_revenues)}`}</p>
          </div>
      </div>
      <div className={s.fren_raitig_points}>{coins}</div>
    </div>
    )
}