import { TRaitingItemProps } from '@shared/Raiting/types/raitingItem'
import s from './RaitingItem.module.scss'
import React, { CSSProperties } from 'react'

export type TRaitingItemStyle={
    backgroundColor: CSSProperties,
}

export default function ({isMe,placeNumber,userName,userLvl,coinQuantity}:TRaitingItemProps){
    const meItemStyle: React.CSSProperties = isMe
      ? { backgroundColor: "#fff", position: "sticky", bottom: 0,}
      : {};  


    return(
        <div style={meItemStyle} className={ isMe  ? `${s.raiting_item_wrap} ${s.active}`: `${s.raiting_item_wrap}`}>
            <div className={s.raiting_info}>
                <p className={s.place_number}>{placeNumber}</p>
                <div className={s.raiting_title_wrap}>
                    <p className={s.raiting_title}>{userName}</p>
                    <p className={s.raiting_subtitle}>{`${userLvl} lvl`}</p>
                </div>
            </div>
            <div className={s.coin_quantity}>{coinQuantity}</div>
        </div>
    )
}