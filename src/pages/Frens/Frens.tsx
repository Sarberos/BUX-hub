import s from '@pages/Frens/Frens.module.scss'
import { FRENSLIST } from '@shared/Frens/consts/frensList'
import BottomPopUp from '@widgets/UI/BottomPopUp/BottomPopUp'
import FrensItem from '@widgets/Frens/FrensItem/FrensItem'
import InvitePopUp from '@widgets/Frens/InvitePopUp/InvitePopUp'
import MainBtn from '@widgets/UI/MainBtn/MainBtn'

export const Frens=({setInvateStat,inviteStat}:{inviteStat?:boolean,setInvateStat: (value:boolean)=>void})=>{

    return(
        <div className={s.frens_wrap}>
            <div className={s.title_wrap}>
                <p className={s.title}>Invite frens</p>
            </div>
            <div className={s.frens_coins_wrap}>
                <div className={s.frens_coins_wrap}>
                    <p className={s.frens_coins_value}>0</p>
                    <button className={s.frens_coin_claim_btn}>Claim 05h 41m</button>
                </div>
            </div>
            <div className={s.subtitle_wrap}>
                <p className={s.subtitle}>You receive a 5% bonus on points earned by friends</p>
            </div>
            <div className={s.frens_list_wrap}>
                <p className={s.frens_amount}>{`${200} frens`}</p>
                <ul className={s.frens_list}>
                    {FRENSLIST.map((elem,index)=>(
                        <FrensItem key={index} {...elem} /> 
                    ))}
                </ul>
            </div>
            <div onClick={()=>setInvateStat(true)} className={s.invite_frens_btn}>
                <MainBtn>Invite a fren</MainBtn>
            </div>
            <div className={inviteStat ?  `${s.invite_fren_pop_up} ${s.active}`:`${s.invite_fren_pop_up}`}>
                <BottomPopUp onClose={()=>setInvateStat(false)}>
                  <InvitePopUp />
                </BottomPopUp>
            </div>
        </div>

    )
}