import { PAGESNAMES } from '@shared/Footer/consts/footer'
import s from './Footer.module.scss'
import { TFooterProps } from '@shared/Footer/types/footer/footer'
import { Link } from 'react-router-dom'

export const Footer=({currenPageId,setCurrentPageId}:TFooterProps)=>{    

    return (
      <div className={s.wrapper}>
        <div className={s.inner_wrapper}>
          <nav className={s.navigation}>
            {PAGESNAMES.map((elem, index) => (
              <Link key={index} to={elem.link}>
                <li
                  onClick={() => setCurrentPageId(elem.id)}
                  className={s.nav_item}
                >
                  <img src={elem.id === currenPageId ? elem.activeImg : elem.img}/>
                </li>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    );
}