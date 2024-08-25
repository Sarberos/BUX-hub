import { useNavigate } from "react-router"


export default function(){
    const navigate= useNavigate()

    return(
        <>
        <div onClick={()=>{navigate('/')}}>Домой</div>
        <strong>{'404 PAGE NOT FOUND or it`s in production :)'}</strong>
        </>
    )
}