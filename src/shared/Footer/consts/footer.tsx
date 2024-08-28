import home_ico from '@shared/Footer/assets/footer_img/home_ico.svg'
import tasks_ico from '@shared/Footer/assets/footer_img/tasks_ico.svg'
import raiting_ico from '@shared/Footer/assets/footer_img/rating_ico.svg'
import frens_ico from '@shared/Footer/assets/footer_img/frens_ico.svg'
import home_active_ico from '@shared/Footer/assets/footer_img/home_ico_active.svg'
import tasks_active_ico from '@shared/Footer/assets/footer_img/tasks_active_ico.svg'
import raiting_active_ico from '@shared/Footer/assets/footer_img/rating_active_ico.svg'
import frens_active_ico from '@shared/Footer/assets/footer_img/frens_active_ico.svg'
import home_white_ico from '@shared/Footer/assets/footer_img/home_iwh_co.svg'
import tasks_white_ico from '@shared/Footer/assets/footer_img/tasks_wh_svg.svg'
import raiting_white_ico from '@shared/Footer/assets/footer_img/grey_google_person.svg'
import frens_white_ico from '@shared/Footer/assets/footer_img/frens_wh_ico.svg'
import home_white_active_ico from '@shared/Footer/assets/footer_img/home_wh_act.svg'
import tasks_white_active_ico from '@shared/Footer/assets/footer_img/tasks_white_act_svg.svg'
import raiting_white_active_ico from '@shared/Footer/assets/footer_img/peson_ico_google.svg'
import frens_white_active_ico from '@shared/Footer/assets/footer_img/frens_wh_act_ico.svg'
import { TPagesItem } from '@shared/Footer/types/footer/footer'


export const PAGESNAMES:TPagesItem[]=[
    {
        id:1,
        img: home_ico,
        activeImg:home_active_ico,
        whiteThemImg:home_white_ico,
        whiteThemActiveImg:home_white_active_ico,
        link:'/'
    },
    {
        id:2,
        img: tasks_ico ,
        activeImg: tasks_active_ico ,
        whiteThemImg:tasks_white_ico,
        whiteThemActiveImg: tasks_white_active_ico,
        link:'/tasks'
    },
    {
        id:3,
        img: raiting_ico,
        activeImg: raiting_active_ico,
        whiteThemImg:raiting_white_ico,
        whiteThemActiveImg:raiting_white_active_ico,
        link:'/raiting'
    },
    {
        id:4,
        img: frens_ico,
        activeImg: frens_active_ico,
        whiteThemImg:frens_white_ico,
        whiteThemActiveImg:frens_white_active_ico,
        link:'/frens'
    }
]