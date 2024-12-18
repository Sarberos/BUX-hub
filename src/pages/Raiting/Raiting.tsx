import s from "@pages/Raiting/Raiting.module.scss";
// import { RAITINGLIST } from "@shared/Raiting/consts/raitingList";
import { TRaitngItem, useGetRaitingList } from "@shared/Raiting/hooks/useGetRaitingList";
import RaitingItem from "@widgets/Raiting/RaitingItem";
import { Preloader } from "@widgets/UI/Preloader/Preloader";
import {useEffect,useState} from 'react'
import { useTranslation } from "react-i18next";
import rating_bg from '@shared/assets/webp_bg/liderboard.webp'


const Raiting = () => {
  const {t} =useTranslation()
  const{data:raitingData,isLoading:raitingReqLoading}=useGetRaitingList()

  const [sortesData, setSortedData]=useState<TRaitngItem[]>()
  useEffect(()=>{
    if (raitingData) {
      const sortArr=raitingData.raiting.sort(
        (a,b)=>{
          return (b.coins || 0) - (a.coins || 0);  
        }
      ).slice(0,15)
      setSortedData(sortArr)
    }
  },[raitingData])
  if(raitingReqLoading){
    return <Preloader />
  }else 
  return (
    <div className={s.raiting_wrapper}>
      <img src={rating_bg} alt="" className={s.background_img}/>
      <div className={s.raiting_title_wrap}>
        <p className={s.title}>{t("raitingTitle")}</p>
      </div>
      <div className={s.raiting_list}>
        {sortesData?.map((elem, index) => (
          <RaitingItem
            key={index}
            place={index + 1}
            {...elem}
          />
        ))}
      </div>
    </div>
  );
};

export default Raiting