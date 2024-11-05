import Lottie from 'react-lottie';
import s from './Preloader.module.scss'
import animationData from "@shared/UIComponents/assets/BUX LOADING LOADER.json";
import BUXloader from "@shared/UIComponents/assets/BUX_TXT_Loader.json"



export const Preloader=({ufo,backgroundImage}:{ufo?:boolean,backgroundImage?:string})=>{
  const loaderImg =ufo ? animationData : BUXloader
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loaderImg,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        } }
    return(
        <div style={{
          backgroundImage:backgroundImage ? `url(${backgroundImage})` : `url(src/shared/assets/webp_bg/home.webp)`
        }} className={s.preloader_wrap}>
            <div className={s.preloader_img}>
                <Lottie options={defaultOptions} height={210} width={210} />
            </div>
        </div>
    )
}