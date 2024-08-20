import { TTaskItemProps } from "../types/tasks";
import fire_ico from '@shared/Tasks/assets/tasks_img/tasksFIre.svg'
import facebook_ico from '@shared/Tasks/assets/tasks_img/facebook_ico.svg'
import inst_ico from '@shared/Tasks/assets/tasks_img/inst_ico.svg'


export const TASKLIST:TTaskItemProps[]=[
    {
        icoUrl: fire_ico,
        title:'Quest',
        isMiniTasks: true,
        minitasksAmount: 3,
        reward: 100,
    },
    {
        icoUrl: facebook_ico,
        title:'Join Facebook',
        isMiniTasks: false,
        reward: 100,
    },
    {
        icoUrl: inst_ico,
        title:'Join Instagram',
        isMiniTasks: false,
        reward: 100,
    },
]