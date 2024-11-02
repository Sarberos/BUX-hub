import select_img from '@shared/Home/assets/home_img/select_img.svg'
import { useState} from 'react'
import s from "./LangSelect.module.scss"
import { LANGLIST } from '@shared/UIComponents/consts/langSelect'
import i18next from 'i18next'
import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks'
import { setLanguage } from '@shared/utilits/redux/redux_slice/home_slice'
import {useChangeLng} from "@shared/Home/hooks/useChangeLng.ts";


export const  LangSelect=()=>{
  const dispatch=useAppDispatch()
  const {mutate:changeLanguage}=useChangeLng()
  const homeState=useAppSelector(state=>state.home)
    const [langBurg,setLangBurger]=useState(false)
    function changeLng(lng:string) {
      i18next.changeLanguage(lng);
      changeLanguage(lng.toLowerCase())
      dispatch(setLanguage(lng))
    }

    return (
      <div 
      tabIndex={0}
      onBlur={() => setLangBurger(false)}
      onClick={() => setLangBurger((prevState) => !prevState)}
      className={s.wrap}>
        <div
          className={langBurg?`${s.language_select} ${s.active}`:`${s.language_select}`}
        >
          <div  className={`${s.language_item} ${s.active}`}>
            <div className={s.lang_title}>{homeState.lang.toUpperCase()}</div>

            <div className={s.active_language_item}>
              <img src={select_img} alt="" className={s.select_ico} />
            </div>
          </div>
        </div>
        <div
          className={
            langBurg
              ? `${s.language_burger} ${s.active}`
              : `${s.language_burger}`
          }
        >
            {LANGLIST.map((elem,index)=>{
                if (elem!==homeState.lang) {
                    return(
                        <div key={index} onClick={()=>changeLng(elem)} className={`${s.language_item}  ${s.burger}`}>
                            <div className={s.lang_title}>{elem.toUpperCase()}</div>
                        </div>
                    )
                }
                return
            })}
          
        </div>
      </div>
    );
}


