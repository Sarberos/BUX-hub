import { TDayBoxProps } from "../types/dayBox";
import first from '@shared/assets/сундуки webЗ/день 1 новый-2.webp'
import second from 'shared/assets/сундуки webЗ/день 2 новый.webp'
import third from 'shared/assets/сундуки webЗ/день 3 новый.webp'
import fourth from 'shared/assets/сундуки webЗ/день 4 новый-2.webp'
import fifth from 'shared/assets/сундуки webЗ/день 5 новый.webp'
import sixth from 'shared/assets/сундуки webЗ/день 6 новый.webp'
import seventh from "shared/assets/сундуки webЗ/день 7 новый.webp"


export type StyleProps = {  
    width: string;
    top?:string,

}  
interface DayBoxItem extends Omit<TDayBoxProps, 'currentDay'> {
    style: StyleProps;
}
export const DAYBOXLIST:DayBoxItem[]=[
    {
        boxImg:first,
        rewardDay:1,
        rewardLabel: '20',
        rewardValue: 20,
        style:{
            width:'57px',
        }
    },
    {
        boxImg:second,
        rewardDay:2,
        rewardLabel: '30',
        rewardValue: 30,
        style:{
            width:'67px',
            // top:'18%',
        }
    },
    {
        boxImg:third,
        rewardDay:3,
        rewardLabel: '40',
        rewardValue: 40,
        style:{
            width:'78px',
            // top:'16%',
        }
    },
    {
        boxImg:fourth,
        rewardDay:4,
        rewardLabel: '60',
        rewardValue: 60,
        style:{
            width:'68px',
            // top:'12%',
        }
    },
    {
        boxImg:fifth,
        rewardDay:5,
        rewardLabel: '80',
        rewardValue: 80,
        style:{
            width:'78px',
            // top:'17%',
        }
    },
    {
        boxImg:sixth,
        rewardDay:6,
        rewardLabel: '100',
        rewardValue: 100,
        style:{
            width:'93px',
            // top:'15%',
        }
    },
    {
        boxImg:seventh,
        rewardDay:7,
        rewardLabel: '150',
        rewardValue: 150,
        style:{
            width:'75px',
            // top:'6%',
        }
    },
]