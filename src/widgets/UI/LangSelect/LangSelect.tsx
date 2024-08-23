import select_img from '@shared/Home/assets/home_img/select_img.svg'
import {useEffect, useState} from 'react'
import s from "./LangSelect.module.scss"
import { LANGLIST } from '@shared/UIComponents/consts/langSelect'
import i18next from 'i18next'
import { LangItems } from '@shared/UIComponents/types/langSelect'


export const  LangSelect=()=>{
    const [activeLang, setActiveLang]=useState<LangItems>({
      value:'ru',
      name:'RU'
    })
    const [langBurg,setLangBurger]=useState(false)
    function changeLng(lng:string) {
      i18next.changeLanguage(lng);
    }
    useEffect(()=>{
      changeLng(activeLang.value)
    },[activeLang])

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
            <div className={s.lang_title}>{activeLang?.name}</div>

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
                if (elem.name !==  activeLang?.name) {
                    return(
                        <div key={index} onClick={()=>setActiveLang(elem)} className={`${s.language_item}  ${s.burger}`}>
                            <div className={s.lang_title}>{elem.name}</div>
                        </div>
                    )
                }
                return
            })}
          
        </div>
      </div>
    );
}

