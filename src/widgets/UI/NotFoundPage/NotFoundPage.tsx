import { useNavigate } from "react-router"
import s from './NotFoundPage.module.scss'
import Lottie from "react-lottie";
import BUXloader from "@shared/UIComponents/assets/BUX_TXT_Loader.json"

export default function NotFoundPage(){
    const navigate= useNavigate()
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: BUXloader,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      } }
    return(
      <div className={s.notfound_wrap}>
        <div className={s.notfound_anim}>
          <Lottie options={defaultOptions} height={210} width={210}/>
        </div>
        <button onClick={() => navigate('/')} className={s.not_found_btn}>HOME</button>
      </div>
    )
}