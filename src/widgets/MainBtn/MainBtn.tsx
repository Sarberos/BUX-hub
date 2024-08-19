import { tMainBtn } from '@shared/types/main_btn/main_btn'
import s from '@widgets/MainBtn/MainBtn.module.scss'

export default function MainBtn({children}:tMainBtn){
    return(
        <button className={s.main_btn}>{children}</button>
    )
}