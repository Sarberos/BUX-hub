export type TPagesItem={
    id:number,
    img: string,
    activeImg:string,
    link: string,
    whiteThemImg: string,
    whiteThemActiveImg: string,
}
export type TFooterProps={
    currenPageId:number,
    setCurrentPageId: (value:number)=>void,
  }