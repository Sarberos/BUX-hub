import s from './InvitePopUp.module.scss'
import MainBtn from '@widgets/UI/MainBtn/MainBtn'
import tg_ico from '@shared/Frens/assets/frens_img/tg_ico.svg'
import copy_ico from '@shared/Frens/assets/frens_img/copy_ico.svg'
import BottomLine from '@widgets/UI/BottomLine/BottomLine'
import { useTelegramApi } from '@shared/Home/hooks/useTelegramApi'
import  { Toaster } from 'react-hot-toast';
import { copyToClipboard } from '@features/Frens/copyLink'


export default function(){
    const {user,tg}=useTelegramApi()

    const hadleSendToTelegram=()=>{
      tg.openInvoice(`https://t.me/SarberosBot?start=${user?.id}`,()=>{console.log('SEND TG END');
      })
    }
    
    return (
      <div className={s.invite_pop_up_wrap}>
        <p className={s.invite_title}>Send Invite</p>
        <div className={s.btn_group}>
          <MainBtn event={()=>hadleSendToTelegram()}>
            <div className={s.bnt_info_wrap}>
              <div className={s.btn_img_wrap}>
                <img src={tg_ico} alt="" className={s.btn_img} />
              </div>
              <p className={s.btn_title}>Send to Telegram</p>
            </div>
          </MainBtn>
          <MainBtn event={()=>copyToClipboard(`https://t.me/SarberosBot?start=${user?.id}`)}>
            <div className={s.bnt_info_wrap}>
              <div className={s.btn_img_wrap}>
                <img src={copy_ico} alt="" className={s.btn_img} />
              </div>
              <p
                className={s.btn_title}
              >
                Copy link
              </p>
              <Toaster />
            </div>
          </MainBtn>
        </div>
        <div className={s.bottom_line}>
          <BottomLine />
        </div>
      </div>
    );
}