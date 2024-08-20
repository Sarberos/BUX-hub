import s from '@pages/Home/Home.module.scss'
import MainBtn from '@widgets/MainBtn/MainBtn';
import { Wrap } from '@widgets/Wrap/Wrap'
import select_img from '@shared/assets/home_img/select_img.svg'
import fire_ico from '@shared/assets/home_img/day_fire.svg'
import coin_ico from '@shared/assets/home_img/coin_ico.svg'
import main_img from '@shared/assets/home_img/main_img.png'
import {useState} from 'react'

export function Home(){
    const [isChangeLang, setLangStatus]=useState(false)
    const lang = [{ 
        label: "RU",
        value: "ru" 
    },
    {
        label: "ENG",
        value: "en" 
    }
];    

    return (
      <Wrap>
        <div className={s.wrapper}>
          <div className={s.inner_wrapper}>
            <div className={s.title_wrap}>
              <p className={s.title}>Hello, User_Artem</p>
            </div>
            <div className={s.language_wrap}>
              <div className={s.language_select}>
                <div className={s.language_txt}>
                  <span>ENG</span>
                  <div className={s.select_ico_wrap}>
                    <img src={select_img} alt="" className={s.select_ico} />
                  </div>
                </div>
              </div>
              <div className={`${s.language_select} ${s.days}`}>
                <div className={s.day_counter}>
                  <div className={s.day_counter_img_wrap}>
                    <img src={fire_ico} alt="" />
                  </div>
                  <div className={s.day_counter_txt}>day 1</div>
                </div>
              </div>
            </div>
            <div className={s.koin_quantity}>
                <p className={s.koin_quantity_value}>1,661.120</p>
                <div className={s.koin_quantity_img}>
                  <img src={coin_ico} alt="" className={s.koin_quantity_img} />
                </div>
            </div>
            <div className={s.main_img_wrap}>
              <img src={main_img} alt="" className={s.main_img} />
            </div>
            <div className={s.farming_btn}>
              <MainBtn>Start farming</MainBtn>
            </div>
          </div>
        </div>
      </Wrap>
    );
}