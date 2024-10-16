import {lazy} from "react";

export const HomePage=lazy(()=>import('@pages/Home/Home.tsx'))
export const TasksPage=lazy(()=>import('@pages/Tasks/Tasks.tsx'))
export const RaitingPage=lazy(()=>import('@pages/Raiting/Raiting.tsx'))
export const FrernsPage=lazy(()=>import('@pages/Frens/Frens.tsx'))