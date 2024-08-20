import { PAGESNAMES } from '@shared/Footer/consts/footer'
import s from './Footer.module.scss'
import { Link } from 'react-router-dom'
import { TFooterProps } from '@shared/Footer/types/footer/footer'

export const Footer=({currenPageId,setCurrentPageId}:TFooterProps)=>{    

    return (
        <div className={s.wrapper}>
            <div className={s.inner_wrapper}>
                <nav className={s.navigation}>
                    {PAGESNAMES.map(elem=>(
                        <li onClick={()=>setCurrentPageId(elem.id)} className={s.nav_item}>
                        {/* <Link to={elem.link}>  */}
                            <img src={elem.id===currenPageId?elem.activeImg :elem.img} alt="" className={s.nav_item_img} />
                        {/* </Link> */}
                        
                        </li>
                    ))}
                </nav>
                <div className={s.line_wrap}>
                    <div className={s.line}></div>
                </div>
            </div>
        </div>
    )
}