import s from './FrensItem.module.scss'
import { TFrensItem } from '@shared/Frens/hooks/useGetFrensInfo'
// import {generateAva} from "@shared/Frens/helpereFunction/generateFrenIco.tsx";
import unknown_ava from "@shared/Frens/assets/frens_img/unknown_avatar.webp";

export default function({photo,active_usernames,coins,day_revenues}:TFrensItem){

  return (
    <div className={s.fren_profile_wrap}>
      <div className={s.fren_info}>
        <div className={s.fren_img_wrap}>
          {photo ? <img src={photo} alt={''} className={s.fren_img_wrap}/> :
            <img alt="" src={unknown_ava} className={s.fren_img_wrap}/>}
          {/*{generateAva(photo, {first_name, last_name}, color)}*/}
        </div>
        <div className={s.fren_title_wrap}>
        <p className={s.fren_title}>{active_usernames?.[0] ??'Аноним'}</p>
            {day_revenues && <p className={s.fren_subtitle}>{`+${Math.ceil(day_revenues)}`}</p>}
          </div>
      </div>
      {coins && < div className={s.fren_raitig_points}>{coins}</div>}
    </div>
    )
}