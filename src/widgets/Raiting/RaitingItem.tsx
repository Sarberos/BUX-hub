import s from './RaitingItem.module.scss'
import React, { CSSProperties } from 'react'
import { TRaitngItem } from '@shared/Raiting/hooks/useGetRaitingList';
import { useTelegramApi } from '@shared/Home/hooks/useTelegramApi';

export type TRaitingItemStyle={
    backgroundColor: CSSProperties,
}

export default function ({active_usernames,coins,place}:TRaitngItem&{place:number}){
    const meItemStyle: React.CSSProperties = false
      ? { backgroundColor: "#fff", position: "sticky", bottom: 0,}
      : {};  
    const{user}=useTelegramApi()
    console.log(user);
    
    return(
        <div style={meItemStyle} className={ false  ? `${s.raiting_item_wrap} ${s.active}`: `${s.raiting_item_wrap}`}>
            <div className={s.raiting_info}>
                <p className={s.place_number}>{place}</p>
                <div className={s.raiting_title_wrap}>
                    <p className={s.raiting_title}>{active_usernames && active_usernames[0]}</p>
                    <p className={s.raiting_subtitle}>{`${3} lvl`}</p>
                </div>
            </div>
            <div className={s.coin_quantity}>{coins}</div>
        </div>
    )
}