import s from "./Wrap.module.scss";
import home_bg from "@shared/Wrap/assets/img/fix_home_background.png";
import tasks_bg from "@shared/Wrap/assets/img/fix_tsks_background.png";
import raiting_bg from "@shared/Wrap/assets/img/fix_raiting_background.png";
import frens_bg from "@shared/Wrap/assets/img/fix_frens_background.png";
import { Home } from "@pages/Home/Home";
import { useEffect, useState } from "react";
import { Tasks } from "@pages/Tasks/Tasks";
import { Raiting } from "@pages/Raiting/Raiting";
import { Frens } from "@pages/Frens/Frens";
import NotFoundPage from "@widgets/UI/NotFoundPage/NotFoundPage";
import { Footer } from "@widgets/UI/Footer/Footer";
import { useTelegramApi } from "@shared/Home/hooks/useTelegramApi";
import { Preloader } from "@widgets/UI/Preloader/Preloader";
import { useAppSelector } from "@shared/utilits/redux/hooks";

export function Wrap() {
  const state=useAppSelector(state=>state.home)


  const {tg}=useTelegramApi()
  const [currenPageId, setCurrentPageId] = useState(1);
  const [currentBg, setCurrentBg] = useState("");
  const [inviteStat, setInvateStat]= useState(false)
  const [miniTaskOpen, setMiniTasksOpen]= useState(false)
  const [miniTaskStyle, setminiTaskStyle]= useState<React.CSSProperties>()
  const [them, setThem]=useState('dark')
  const [mainInLoading, setMainIsLoading]=useState(false)

  useEffect(()=>{
    setMainIsLoading(state.isLoading);
  },[state.isLoading])
 useEffect(()=>{
  setThem(tg?.colorScheme)
 },[tg])

  useEffect(()=>{
    miniTaskOpen ? setminiTaskStyle({zIndex:-1}) :setminiTaskStyle({})
    !them ? setminiTaskStyle({backgroundColor: '#fff',}) :setminiTaskStyle({})

  },[miniTaskOpen,them])

  useEffect(() => {
    switch (currenPageId) {
      case 1:
        setCurrentBg(home_bg);
        break;
      case 2:
        setCurrentBg(tasks_bg);
        break;
      case 3:
        setCurrentBg(raiting_bg);
        break;
      case 4:
        setCurrentBg(frens_bg);
        break;

      default:
        setCurrentBg(home_bg);
        break;
    }
  }, [currenPageId]);

if(mainInLoading){
  return <Preloader />
}else 
  return (
    <div className={s.wrap}>
      <div
        style={currenPageId === 1 ? {backgroundImage: `url(${currentBg})`,backgroundPosition:'50% -200px'}:{
          backgroundImage: `url(${currentBg})`,
        }}
        className={s.inner_wrap}
      >
        {currenPageId === 1 ? (
          <Home
            setMainIsLoading={setMainIsLoading}
          />
        ) : currenPageId === 2 ? (
          <Tasks
            setMiniTasksOpen={setMiniTasksOpen}
            miniTaskOpen={miniTaskOpen}
          />
        ) : currenPageId === 3 ? (
          <Raiting />
        ) : currenPageId === 4 ? (
          <Frens inviteStat={inviteStat} setInvateStat={setInvateStat} />
        ) : (
          <NotFoundPage />
        )}
        <div style={miniTaskStyle} className={s.footer_wrap}>
          {true && (
            <Footer
              currenPageId={currenPageId}
              setCurrentPageId={setCurrentPageId}
            />
          ) }
          {/* {them ==='light' &&(
            <WhiteFooter
              currenPageId={currenPageId}
              setCurrentPageId={setCurrentPageId}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
