import { useNavigate } from "react-router"
import s from './NotFoundPage.module.scss'
import {Preloader} from "@widgets/UI/Preloader/Preloader.tsx";
export default function NotFoundPage(){
    const navigate= useNavigate()

    return(
      <>
        <Preloader backgroundImage={'src/shared/UIComponents/assets/not_found_bg.webp'} />
          <button onClick={()=>navigate('/')} className={s.not_found_btn}>HOME</button>
      </>
    )
}