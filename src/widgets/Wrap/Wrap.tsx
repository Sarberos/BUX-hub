import s from './Wrap.module.scss'
import { Footer } from "@widgets/Footer/Footer";
import home_bg from '@shared/Wrap/assets/img/home_background.png'
import tasks_bg from '@shared/Wrap/assets/img/tasks_background.png'
import raiting_bg from '@shared/Wrap/assets/img/traiting_background.png'
import frens_bg from '@shared/Wrap/assets/img/frens_background.png'
import { Home } from '@pages/Home/Home';
import {useEffect, useState } from 'react';
import { Tasks } from '@pages/Tasks/Tasks';
import { Raiting } from '@pages/Raiting/Raiting';
import { Frens } from '@pages/Frens/Frens';
import NotFoundPage from '@widgets/UI/NotFoundPage/NotFoundPage';


export function Wrap() {
  const[currenPageId, setCurrentPageId]= useState(1)
  const [currentBg, setCurrentBg]=useState('')

  useEffect(()=>{

      switch (currenPageId) {
        case 1:
          setCurrentBg(home_bg)
          break;
        case 2:
          setCurrentBg(tasks_bg)
          break;
        case 3:
          setCurrentBg(raiting_bg)
          break;
        case 4 :
          setCurrentBg(frens_bg)
          break;
      
        default:
          setCurrentBg(home_bg)
          break;
      }

  },[currenPageId])


  return (
    <div className={s.wrap}>
      <div
        style={{
          backgroundImage: `url(${currentBg})`,
        }}
        className={s.inner_wrap}
      >
        {currenPageId === 1 ? (
          <Home />
        ) : currenPageId === 2 ? (
          <Tasks />
        ) : currenPageId === 3 ? (
          <Raiting />
        ) : currenPageId === 4 ? (
          <Frens />
        ) : (
          <NotFoundPage />
        )}
        <div className={s.footer_wrap}>
          <Footer
            currenPageId={currenPageId}
            setCurrentPageId={setCurrentPageId}
          />
        </div>
      </div>
    </div>
  );
}

