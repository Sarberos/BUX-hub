import { tMainBtn } from '@shared/UIComponents/types/main_btn/main_btn'
import s from './MainBtn.module.scss'

export default function MainBtn({children}:tMainBtn){
    return(
        <button className={s.main_btn}>{children}</button>
    )
}