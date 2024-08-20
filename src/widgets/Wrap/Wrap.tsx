import s from './Wrap.module.scss'
import { Footer } from "@widgets/Footer/Footer";
import home_bg from '@shared/Home/assets/home_img/home_background.png'
import { TWrap } from '@shared/UIComponents/types/wrap/wrap';
import { Home } from '@pages/Home/Home';
import { useEffect, useState } from 'react';
import { Tasks } from '@pages/Tasks/Tasks';
import { Raiting } from '@pages/Raiting/Raiting';
import { Frens } from '@pages/Frens/Frens';
import NotFoundPage from '@widgets/NotFoundPage/NotFoundPage';


export function Wrap({children}:TWrap) {
  const[currenPageId, setCurrentPageId]= useState(1)

  return (
    <div className={s.wrap}>
        <div style={{background:`url(${home_bg}) no-repeat`,backgroundSize:' 100% 100%'}} className={s.inner_wrap}>
              {currenPageId===1? <Home/>:currenPageId===2?<Tasks />: currenPageId===3 ? <Raiting />:currenPageId===4?<Frens/>:'' }
          <div className={s.footer_wrap}>
              <Footer currenPageId={currenPageId} setCurrentPageId={setCurrentPageId}/>
          </div>
        </div>
    </div>
  )
}

