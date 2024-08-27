import s from './FrensItem.module.scss'
import { TFrensItem } from '@shared/Frens/hooks/useGetFrensInfo'
import frens_ava from '@shared/Frens/assets/frens_img/frens_ava.svg'





export default function({photo,active_usernames,coins,day_revenues}:TFrensItem){

    return(
        <div className={s.fren_profile_wrap}>
            <div className={s.fren_info}>
                <div className={s.fren_img_wrap}>
                    <img src={photo ? photo:frens_ava} alt="" className={s.fren_img_wrap} />
                </div>
                <div className={s.fren_title_wrap}>
                    <p className={s.fren_title}>{active_usernames[0]}</p>
                    <p className={s.fren_subtitle}>{`+${day_revenues}`}</p>
                </div>
            </div>
            <div className={s.fren_raitig_points}>{coins}</div>
        </div>
    )
}