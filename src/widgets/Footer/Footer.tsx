import s from './Footer.module.scss'



export const Footer=()=>{
    return (
        <div className={s.wrapper}>
            <div className={s.inner_wrapper}>
                <nav className={s.navigation}>
                    <li className={s.nav_item}>
                        <img src={''} alt="" className={s.nav_item_img} />
                    </li>
                    <li className={s.nav_item}>
                        <img src={''} alt="" className={s.nav_item_img} />
                    </li>
                    <li className={s.nav_item}>
                        <img src={''} alt="" className={s.nav_item_img} />
                    </li>
                    <li className={s.nav_item}>
                        <img src={''} alt="" className={s.nav_item_img} />
                    </li>
                </nav>
            </div>
        </div>
    )
}