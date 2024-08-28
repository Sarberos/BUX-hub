import s from './InvitePopUp.module.scss'
import MainBtn from '@widgets/UI/MainBtn/MainBtn'
import tg_ico from '@shared/Frens/assets/frens_img/tg_ico.svg'
import copy_ico from '@shared/Frens/assets/frens_img/copy_ico.svg'
import { useTelegramApi } from '@shared/Home/hooks/useTelegramApi'
import  { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@shared/utilits/redux/hooks'
import { setInviteStatus } from '@shared/utilits/redux/redux_slice/frens_slice'


export default function(){
  const {t} = useTranslation()
  const {user,tg}=useTelegramApi()
  const dispatch= useAppDispatch()
  const currentLink=`https://t.me/SarberosBot?start=${user?.id}`;
  
const copyToClipboard =(textToCopy: string) => {
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      toast.success(t("successCop"));
      dispatch(setInviteStatus(false))
    })
    .catch((err) => {
      toast.error(err);
    });
};  

const hadleSendToTelegram = () => {
  debugger;
  tg.openTelegramLink(`https://t.me/SarberosBot?start=895313334&text=Присоединяйся`)
  dispatch(setInviteStatus(false))
};
    
    return (
      <div className={s.invite_pop_up_wrap}>
        <p className={s.invite_title}>{t("sendInvite")}</p>
        <div className={s.btn_group}>
          <MainBtn event={()=>hadleSendToTelegram()}>
            <div className={s.bnt_info_wrap}>
              <div className={s.btn_img_wrap}>
                <img src={tg_ico} alt="" className={s.btn_img} />
              </div>
              <p className={s.btn_title}>{t("sendToTelgram")}</p>
            </div>
          </MainBtn>
          <MainBtn event={()=>copyToClipboard(currentLink)}>
            <div className={s.bnt_info_wrap}>
              <div className={s.btn_img_wrap}>
                <img src={copy_ico} alt="" className={s.btn_img} />
              </div>
              <p
                className={s.btn_title}
              >
                {t("copyLink")}
              </p>
            </div>
          </MainBtn>
        </div>
      </div>
    );
}