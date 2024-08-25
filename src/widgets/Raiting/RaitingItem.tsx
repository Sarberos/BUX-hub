import s from './RaitingItem.module.scss'
import React, { CSSProperties } from 'react'
import { TRaitngItem } from '@shared/Raiting/hooks/useGetRaitingList';
import { useTelegramApi } from '@shared/Home/hooks/useTelegramApi';

export type TRaitingItemStyle={
    backgroundColor: CSSProperties,
}

export default function ({active_usernames,coins,place,telegramId}:TRaitngItem&{place:number}){
    const{user}=useTelegramApi()
    const isMy:boolean|undefined=user && user.id===parseInt(telegramId)
    
    const meItemStyle: React.CSSProperties = isMy
      ? { backgroundColor: "#fff", position: "sticky", bottom: 0,}
      : {};  

    const text_color:string =place=== 1 ? '#FFCC48':place===2?'#ACACAC':place===3?'#9E5228':'';
    return(
        <div style={meItemStyle} className={ isMy  ? `${s.raiting_item_wrap} ${s.active}`: `${s.raiting_item_wrap}`}>
            <div className={s.raiting_info}>
                <p color={text_color} className={s.place_number}>{place}</p>
                <div className={s.raiting_title_wrap}>
                    <p className={s.raiting_title}>{active_usernames && active_usernames[0]}</p>
                    <p className={s.raiting_subtitle}>{`${3} lvl`}</p>
                </div>
            </div>
            <div className={s.coin_quantity}>{coins}</div>
        </div>
    )
}