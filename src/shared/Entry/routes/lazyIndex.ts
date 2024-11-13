import {lazy} from "react";

export const HomePage=lazy(()=>import('@pages/Home/Home.tsx'))
export const TasksPage=lazy(()=>import('@pages/Tasks/Tasks.tsx'))
export const RatingPage=lazy(()=>import('@pages/Raiting/Raiting.tsx'))
export const FrensPage=lazy(()=>import('@pages/Frens/Frens.tsx'))