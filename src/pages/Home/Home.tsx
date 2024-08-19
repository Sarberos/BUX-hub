import s from '@pages/Home/Home.module.scss'
import MainBtn from '@widgets/MainBtn/MainBtn';
import { Wrap } from '@widgets/Wrap/Wrap'

export function Home(){

    
    return(
        <Wrap>
            <div className={s.wrapper}>
                <div className={s.inner_wrapper}>
                    <div className={s.title_wrap}>
                        <p className={s.title}>Hello, User_Artem</p>  
                    </div>
                    <div className={s.language_wrap}>
                        <div className={s.language_select}>
                                <span>Eng
                                    <span>
                                        <img src={''} alt="" className={s.select_ico} />
                                    </span>
                                </span>
                        </div>
                        <div className={s.day_counter}>
                            <span className={s.day_counter_img}>
                                <span className={s.day_counter_img}><img src={''} alt="" /></span>
                                <span className={s.day_counter_txt}>day 1</span>
                            </span>
                        </div>
                    </div>
                    <div className={s.koin_quantity}>
                        <span>1,661.120
                            <img src={''} alt="" className={s.koin_quantity_img} />
                        </span>
                    </div>
                    <div className={s.main_img_wrap}>
                        <img src={''} alt="" className={s.main_img} />
                    </div>
                    <div className={s.farming_btn}>
                        <MainBtn>Start farming</MainBtn>
                    </div>
                </div>
            </div>
        </Wrap>
    )
}