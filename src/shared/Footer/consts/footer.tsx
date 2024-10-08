import home_ico from '@shared/assets/high quality svg/home_black_red.svg'
import tasks_ico from '@shared/assets/high quality svg/tasks_black_red.svg'
import raiting_ico from '@shared/assets/high quality svg/raiting_black.svg';
import frens_ico from '@shared/assets/high quality svg/frens_black_red.svg'
import home_active_ico from '@shared/assets/high quality svg/home_red.svg'
import tasks_active_ico from '@shared/assets/high quality svg/tasks_red.svg'
import raiting_active_ico from '@shared/assets/high quality svg/raiting.svg';
import frens_active_ico from '@shared/assets/high quality svg/frens_red.svg'
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