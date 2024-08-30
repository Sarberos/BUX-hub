import { TDayBoxProps } from "../types/dayBox";
import first from '@shared/Home/assets/home_img/1day_reward.svg'
import second from '@shared/Home/assets/home_img/2day_reward.svg'
import third from '@shared/Home/assets/home_img/3day_reward.svg'
import fourth from '@shared/Home/assets/home_img/4day_reward.svg'
import fifth from '@shared/Home/assets/home_img/5day_reward.svg'
import sixth from '@shared/Home/assets/home_img/6day_reward.svg'
import seventh from '@shared/Home/assets/home_img/7day_reward.svg'


export const DAYBOXLIST:&Omit<TDayBoxProps,'currentDay'>[]=[
    {
        boxImg:first,
        rewardDay:1,
        rewardValue: 10000 ,
    },
    {
        boxImg:second,
        rewardDay:2,
        rewardValue: 15000,
    },
    {
        boxImg:third,
        rewardDay:3,
        rewardValue: 20000,
    },
    {
        boxImg:fourth,
        rewardDay:4,
        rewardValue: 25000,
    },
    {
        boxImg:fifth,
        rewardDay:5,
        rewardValue: 35000,
    },
    {
        boxImg:sixth,
        rewardDay:6,
        rewardValue: 55000,
    },
    {
        boxImg:seventh,
        rewardDay:7,
        rewardValue: 75000,
    },
]