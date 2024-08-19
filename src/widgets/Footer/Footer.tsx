import s from './Footer.module.scss'
import home_ico from '@shared/assets/footer_img/home_ico.svg'
import tasks_ico from '@shared/assets/footer_img/tasks_ico.svg'
import raiting_ico from '@shared/assets/footer_img/rating_ico.svg'
import frens_ico from '@shared/assets/footer_img/frens_ico.svg'
// import home_active_ico from '@shared/assets/footer_img/home_ico_active.svg'
// import tasks_active_ico from '@shared/assets/footer_img/tasks_active_ico.svg'
// import raiting_active_ico from '@shared/assets/footer_img/rating_active_ico.svg'
// import frens_active_ico from '@shared/assets/footer_img/frens_active_ico.svg'

export const Footer=()=>{    
    return (
        <div className={s.wrapper}>
            <div className={s.inner_wrapper}>
                <nav className={s.navigation}>
                    <li className={s.nav_item}>
                        <img src={home_ico} alt="" className={s.nav_item_img} />
                    </li>
                    <li className={s.nav_item}>
                        <img src={tasks_ico} alt="" className={s.nav_item_img} />
                    </li>
                    <li className={s.nav_item}>
                        <img src={raiting_ico} alt="" className={s.nav_item_img} />
                    </li>
                    <li className={s.nav_item}>
                        <img src={frens_ico} alt="" className={s.nav_item_img} />
                    </li>
                </nav>
                <div className={s.line_wrap}>
                    <div className={s.line}></div>
                </div>
            </div>
        </div>
    )
}