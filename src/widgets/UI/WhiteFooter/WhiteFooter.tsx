import { PAGESNAMES } from "@shared/Footer/consts/footer";
import s from "./WhiteFooter.module.scss";
import { TFooterProps } from "@shared/Footer/types/footer/footer";

export const WhiteFooter = ({ currenPageId, setCurrentPageId }: TFooterProps) => {
  return (
    <div className={s.inner_wrapper}>
      <nav className={s.navigation}>
        {PAGESNAMES.map((elem) => (
          <li onClick={() => setCurrentPageId(elem.id)} className={elem.id === currenPageId ?`${s.nav_item} ${s.active}`:`${s.nav_item}`}>
            {/* <Link to={elem.link}>  */}
            <img
              src={elem.id === currenPageId ? elem.whiteThemActiveImg : elem.whiteThemImg}
              alt=""
              className={s.nav_item_img}
            />
            {/* </Link> */}
          </li>
        ))}
      </nav>
      {/* <div className={s.line_wrap}>
                        <BottomLine/>
                </div> */}
    </div>
  );
};
