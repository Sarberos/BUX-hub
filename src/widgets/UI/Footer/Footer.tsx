import { PAGESNAMES } from '@shared/Footer/consts/footer'
import s from './Footer.module.scss'
import { TFooterProps } from '@shared/Footer/types/footer/footer'
import {Link, useLocation} from 'react-router-dom'
import {useEffect} from "react";

export const Footer=({currenPageId,setCurrentPageId}:TFooterProps)=>{
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setCurrentPageId(1);
        break
      case '/tasks':
        setCurrentPageId(2);
        break
      case '/raiting':
        setCurrentPageId(3);
        break
      case '/frens':
        setCurrentPageId(4);
        break
    }
  }, [location.pathname]);

  return (
      <div className={s.wrapper}>
        <div className={s.inner_wrapper}>
          <nav className={s.navigation}>
            {PAGESNAMES.map((elem, index) => (
              <Link key={index} to={elem.link}>
                <li
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