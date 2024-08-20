import s from "@pages/Raiting/Raiting.module.scss";
import { RAITINGLIST } from "@shared/Raiting/consts/raitingList";
import RaitingItem from "@widgets/Raiting/RaitingItem";

export const Raiting = () => {
  return (
    <div className={s.raiting_wrapper}>
      <div className={s.raiting_title_wrap}>
        <p className={s.title}>World leaderboard</p>
      </div>
      <ul className={s.raiting_list}>
        {RAITINGLIST.map((elem, index) => (
          <RaitingItem
            isMe={elem.isMe}
            key={index}
            coinQuantity={elem.coinQuantity}
            placeNumber={elem.placeNumber}
            userLvl={elem.userLvl}
            userName={elem.userName}
          />
        ))}
        {/* <div className={s.my_raiting_item}>
            <RaitingItem
                    coinQuantity={3000}
                    placeNumber={12}
                    userLvl={3}
                    userName={'You'}
            />
        </div> */}
      </ul>
    </div>
  );
};
