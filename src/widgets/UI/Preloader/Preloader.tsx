import Lottie from 'react-lottie';
import s from './Preloader.module.scss'
import animationData from "@shared/UIComponents/assets/BUX LOADING LOADER.json"; 
import preloader_bg_img from '@shared/assets/webp_bg/home.webp'

export const Preloader=()=>{
    const defaultOptions = {  
        loop: true,  
        autoplay: true,  
        animationData: animationData,  
        rendererSettings: {  
            preserveAspectRatio: 'xMidYMid slice'  
        } }
    return(
        <div className={s.preloader_wrap}>
            <img src={preloader_bg_img} alt="" className={s.preloader_bg_img} />
            {/*<img src={preloder_git} alt="" className={s.preloader_img} /> */}
            <div className={s.preloader_img}>
                <Lottie options={defaultOptions} height={150} width={150} />
            </div>
        </div>
    )
}