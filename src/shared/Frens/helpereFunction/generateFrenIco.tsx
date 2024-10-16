import unknown_ava from "@shared/Frens/assets/frens_img/unknown_avatar.webp"
import s from '@widgets/Frens/FrensItem/FrensItem.module.scss'



export const generateAva=(photo?:string,user?:{first_name:string,last_name?:string},color?:string)=>{
  if (photo){
    return <img src={photo} alt={''} className={s.fren_img_wrap}/>
  }else if(user?.last_name) {
    const {name}=generateFrenIco(user.first_name, user.last_name)
    return( <div style={{backgroundColor:color}} className={s.fren_generate_ico}>
      {name}
      </div>)
  } else {
    return <img alt="" src={unknown_ava} className={s.fren_img_wrap}/>
  }
}



const generateFrenIco=(name:string,surname:string):{name:string,color:string} =>{
  const letters = '0123456789ABCDEF';
  let color:string = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return{
    name : (name.slice(0,1) + surname.slice(0,1)).toUpperCase(),
    color: color,
};
}