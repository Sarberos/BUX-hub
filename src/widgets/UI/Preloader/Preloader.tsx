import Lottie from 'react-lottie';
import s from './Preloader.module.scss'
import preloader_bg_img from '@shared/assets/webp_bg/home.webp'
import animationData from "@shared/UIComponents/assets/BUX LOADING LOADER.json";
import BUXloader from "@shared/UIComponents/assets/BUX_TXT_Loader.json"



export const Preloader=({ufo}:{ufo?:boolean})=>{
  const loaderImg =ufo ? animationData : BUXloader
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loaderImg,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        } }
    return(
        <div className={s.preloader_wrap}>
            <img src={preloader_bg_img} alt="" className={s.preloader_bg_img} />
            <div className={s.preloader_img}>
                <Lottie options={defaultOptions} height={210} width={210} />
            </div>
        </div>
    )
}