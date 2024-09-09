// import home_ico from '@shared/Footer/assets/footer_img/google_fonts_ico.svg'
import home_ico from '@shared/Footer/assets/footer_img/Mask group600px_new_home.svg'
import tasks_ico from '@shared/Footer/assets/footer_img/Mask group600px_new_tasks.svg'
import raiting_ico from '@shared/Footer/assets/footer_img/Mask group600px_new_raiting.svg'
import frens_ico from '@shared/Footer/assets/footer_img/Mask group600px_new_frens.svg'
import home_active_ico from '@shared/Footer/assets/footer_img/Mask group300px_new_a_home.svg'
import tasks_active_ico from '@shared/Footer/assets/footer_img/Mask group600px_new_a_tasks.svg'
import raiting_active_ico from '@shared/Footer/assets/footer_img/Mask group600px_new_a_raiting.svg'
import frens_active_ico from '@shared/Footer/assets/footer_img/Mask group600px_new_a_frens.svg'
import { TPagesItem } from '@shared/Footer/types/footer/footer'


export const PAGESNAMES:TPagesItem[]=[
    {
        id:1,
        img: home_ico,
        activeImg:home_active_ico,
        link:'/'
    },
    {
        id:2,
        img: tasks_ico ,
        activeImg: tasks_active_ico ,
        link:'/tasks'
    },
    {
        id:3,
        img: raiting_ico,
        activeImg: raiting_active_ico,
        link:'/raiting'
    },
    {
        id:4,
        img: frens_ico,
        activeImg: frens_active_ico,
        link:'/frens'
    }
]