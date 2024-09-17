import s from './Preloader.module.scss'
import preloder_git from '@shared/UIComponents/assets/my_loader_gif.svg'
import preloader_bg_img from '@shared/Wrap/assets/img/farm_page.png'

export const Preloader=()=>{
    return(
        <div className={s.preloader_wrap}>
            <img src={preloader_bg_img} alt="" className={s.preloader_bg_img} />
            <img src={preloder_git} alt="" className={s.preloader_img} />
        </div>
    )
}