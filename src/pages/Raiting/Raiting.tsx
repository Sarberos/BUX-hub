import s from "@pages/Raiting/Raiting.module.scss";
// import { RAITINGLIST } from "@shared/Raiting/consts/raitingList";
import { useGetRaitingList } from "@shared/Raiting/hooks/useGetRaitingList";
import RaitingItem from "@widgets/Raiting/RaitingItem";
import {useEffect} from 'react'

export const Raiting = () => {
  const{data:raitingData}=useGetRaitingList()

  useEffect(()=>{
    if (raitingData) {
      
    }
  },[raitingData])
  return (
    <div className={s.raiting_wrapper}>
      <div className={s.raiting_title_wrap}>
        <p className={s.title}>World leaderboard</p>
      </div>
      <ul className={s.raiting_list}>
        {raitingData?.raiting.map((elem,index)=>(
          <RaitingItem
          key={index}
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
