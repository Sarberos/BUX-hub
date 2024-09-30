import { TDayBoxProps } from "../types/dayBox";
import first from '@shared/Home/assets/home_img/сундук1.svg'
import second from '@shared/Home/assets/home_img/сундук2.svg'
import third from '@shared/Home/assets/home_img/сундук3.svg'
import fourth from '@shared/Home/assets/home_img/сундук4.svg'
import fifth from '@shared/Home/assets/home_img/сундук5.svg'
import sixth from '@shared/Home/assets/home_img/сундук6.svg'
import seventh from '@shared/Home/assets/home_img/сундук7.svg'


export type StyleProps = {  
    width: string;  
    top:string;
    left?:string;

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
            width:'86px',
            top:'21%',
            left: '4px',
        }
    },
    {
        boxImg:second,
        rewardDay:2,
        rewardLabel: '30',
        rewardValue: 30,
        style:{
            width:'96px',
            top:'18%',
            left: '3px',
        }
    },
    {
        boxImg:third,
        rewardDay:3,
        rewardLabel: '40',
        rewardValue: 40,
        style:{
            width:'95px',
            top:'21%',
            left: '-1px',
        }
    },
    {
        boxImg:fourth,
        rewardDay:4,
        rewardLabel: '60',
        rewardValue: 60,
        style:{
            width:'120px',
            top:'14%',
            left:'-10px',
        }
    },
    {
        boxImg:fifth,
        rewardDay:5,
        rewardLabel: '80',
        rewardValue: 80,
        style:{
            width:'110px',
            top:'6%',
            left:'-6px',
        }
    },
    {
        boxImg:sixth,
        rewardDay:6,
        rewardLabel: '100',
        rewardValue: 100,
        style:{
            width:'100px',
            top:'7%',
        }
    },
    {
        boxImg:seventh,
        rewardDay:7,
        rewardLabel: '150',
        rewardValue: 150,
        style:{
            width:'114px',
            top:'13%',
            left: '-7px',
        }
    },
]