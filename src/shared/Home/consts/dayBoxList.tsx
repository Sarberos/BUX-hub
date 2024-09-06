import { TDayBoxProps } from "../types/dayBox";
import first from '@shared/Home/assets/home_img/day 1.png'
import second from '@shared/Home/assets/home_img/day 2.png'
import third from '@shared/Home/assets/home_img/day 3.png'
import fourth from '@shared/Home/assets/home_img/day 4.png'
import fifth from '@shared/Home/assets/home_img/day 5.png'
import sixth from '@shared/Home/assets/home_img/day 6.png'
import seventh from '@shared/Home/assets/home_img/day 7.png'


export const DAYBOXLIST:&Omit<TDayBoxProps,'currentDay'>[]=[
    {
        boxImg:first,
        rewardDay:1,
        rewardLabel: '10',
        rewardValue: 10,
    },
    {
        boxImg:second,
        rewardDay:2,
        rewardLabel: '20',
        rewardValue: 20,
    },
    {
        boxImg:third,
        rewardDay:3,
        rewardLabel: '30',
        rewardValue: 30,
    },
    {
        boxImg:fourth,
        rewardDay:4,
        rewardLabel: '40',
        rewardValue: 40,
    },
    {
        boxImg:fifth,
        rewardDay:5,
        rewardLabel: '60',
        rewardValue: 60,
    },
    {
        boxImg:sixth,
        rewardDay:6,
        rewardLabel: '80',
        rewardValue: 80,
    },
    {
        boxImg:seventh,
        rewardDay:7,
        rewardLabel: '100',
        rewardValue: 100,
    },
]