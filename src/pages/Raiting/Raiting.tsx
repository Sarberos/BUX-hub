import s from "@pages/Raiting/Raiting.module.scss";
import { TRaitngItem, useGetRaitingList } from "@shared/Raiting/hooks/useGetRaitingList";
import RaitingItem from "@widgets/Raiting/RaitingItem";
import {useEffect,useState} from 'react'

export const Raiting = () => {
  const{data:raitingData}=useGetRaitingList()
  const [sortesData, setSortedData]=useState<TRaitngItem[]>()

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
  return (
    <div className={s.raiting_wrapper}>
      <div className={s.raiting_title_wrap}>
        <p className={s.title}>World leaderboard</p>
      </div>
      <ul className={s.raiting_list}>
        {sortesData?.map((elem,index)=>(
          <RaitingItem
          key={index}
          place={index++}
          {...elem}
        />
        ))}

        {/* {RAITINGLIST.map((elem, index) => (
          <RaitingItem
            isMe={elem.isMe}
            key={index}
            coinQuantity={elem.coinQuantity}
            placeNumber={elem.placeNumber}
            userLvl={elem.userLvl}
            userName={elem.userName}
          />
        ))} */}
      </ul>
    </div>
  );
};
