import s from './Preloader.module.scss'
import preloder_img from '@shared/UIComponents/assets/preloader.gif'

export const Preloader=()=>{
    return(
        <div className={s.preloader_wrap}>
            <div className={s.preloader_inner_wrap}>
                    <img src={preloder_img} alt="" className={s.preloader_img} />
            </div>
        </div>
    )
}