import s from './QrCode.module.scss'
import qr_img from '@shared/assets/qr/букс с компа.jpg'
 
export const QrCode=()=>{
    return(
        <div className={s.qr_wrapper}>
            <img src={qr_img} alt="" />
        </div>
    )
}
