// import './SimpleModal.css'
// import { Transition } from 'react-transition-group'
// import { ReactNode } from 'react';

// type TSimpleModal={
//     isOpen: boolean,
//     onClose:()=>void;
//     children: ReactNode
// }
// export const SimpleModal=({isOpen, onClose,children}:TSimpleModal)=>{
//     const onWrapperClick=(e:React.MouseEvent<HTMLDivElement>)=>{
//         const target = e.currentTarget as HTMLElement;
//         if(target.classList.contains('modal_wrapper')) {
//             onClose();
//     }
//     const preventCloseOnInputClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//         e.stopPropagation();
//       };
//     return(
//         <>
//         <Transition in={isOpen} timeout={300} unmountOnExit={true}>
//         {(state)=>(
//         <div className={`modal  modal__${state}`}>
//             <div className={'modal_wrapper'} onClick={(e)=>onWrapperClick}>
//                 <div className={'modal_content'}>
//                     <button onClick={()=>{onClose()}} className={'cross_btn'}>
//                     </button>
//                     <div onClick={preventCloseOnInputClick}>{children}</div>
//                 </div>
//             </div>
//         </div>)}
//         </Transition>
//         </>
//     )
// }}