import s from "@pages/Raiting/Raiting.module.scss";
import { TRaitngItem, useGetRaitingList } from "@shared/Raiting/hooks/useGetRaitingList";
// import RaitingItem from "@widgets/Raiting/RaitingItem";
import { Preloader } from "@widgets/UI/Preloader/Preloader";
import {useEffect,useState} from 'react'
import { useTranslation } from "react-i18next";

export const Raiting = () => {
  const {t} =useTranslation()
  const{data:raitingData,isLoading:raitingReqLoading}=useGetRaitingList()

  const [sortesData, setSortedData]=useState<TRaitngItem[]>()
console.log(sortesData);


  useEffect(()=>{
    if (raitingData) {
      const sortArr=raitingData.raiting.sort(
        (a,b)=>{
          return (b.coins || 0) - (a.coins || 0);  
        }
      )
      setSortedData(sortArr)
    }
  },[raitingData])
  if(raitingReqLoading){
    return <Preloader />
  }else 
  return (
    <div className={s.raiting_wrapper}>
      <div className={s.raiting_title_wrap}>
        <p className={s.title}>{t("raitingTitle")}</p>
      </div>
      <div className={s.raiting_list}>
        {/* {sortesData?.map((elem,index)=>(
          <RaitingItem
          key={index}
          place={index+1}
          {...elem}
        />
        ))} */}
      </div>
    </div>
  );
};
