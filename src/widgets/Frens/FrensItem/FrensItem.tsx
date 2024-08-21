import { TFrens } from '@shared/Frens/types/frensItem'
import s from './FrensItem.module.scss'





export default function({avaUrl,name,frenReward,fren_point}:TFrens){
    return(
        <div className={s.fren_profile_wrap}>
            <div className={s.fren_info}>
                <div className={s.fren_img_wrap}>
                    <img src={avaUrl} alt="" className={s.fren_img_wrap} />
                </div>
                <div className={s.fren_title_wrap}>
                    <p className={s.fren_title}>{name}</p>
                    <p className={s.fren_subtitle}>{`+${frenReward}`}</p>
                </div>
            </div>
            <div className={s.fren_raitig_points}>{fren_point}</div>
        </div>
    )
}