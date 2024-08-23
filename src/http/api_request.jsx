import AuthService from "./AuthService";

class Fetching {
  static async login(username, password) {
    try {
      const response = await AuthService.login(username, password);
      localStorage.setItem("access_token", response.data.access_token);
      return response
    } catch (e) {
      console.log(e +'login request errror');
    }
  }
  static async logout() {
    try {
      const response = await AuthService.logout()
      return response;
    } catch (e) {
      console.log(e+'logout request errror');
    }
  }
  static async userInf() {
    try {
      const response = await AuthService.userInf();
      return response;
    } catch (e) {
      console.log(e+'userInf request errror');
    }
  }
  static async filterInf() {
    try {
      const response = await AuthService.filterInf();
      return response;
    } catch (e) {
      console.log(e+'filterInf request errror');
    }
  }
  static async carList(carsLimit,listPage){
    try{
      const response= await AuthService.carList(carsLimit,listPage);
      return response;
    }catch(e){
      console.log(e);
    }
  }
  static async allCarList(carsLimit,listPage){
    try{
      return  await AuthService.allCarList(carsLimit,listPage);
      
    }catch(e){
      console.log(e);
    }
  }
  static async favourite(prebid_transport_id,add){
    try {
      return AuthService.favorite(prebid_transport_id,add)
    } catch (e) {
      console.log(e);
    }
  }
  static async favoriteCarList(carsLimit,listPage){
    try{
      const response= await AuthService.favoriteCarList(carsLimit,listPage);
      return response;
    }catch(e){
      console.log(e);
    }
  }
  static async getCountries(){
    try {
      return await AuthService.getCountries()
    } catch (e) {
      console.log(e);
    }
  }
  static async getAuctionList(auctionsLimit,listPage,search){
    try {
      return await AuthService.getAuctionList(auctionsLimit,listPage,search)
    } catch (e) {
      console.log(e);
    }
  }
  static async getListOptions(){
    try {
      return await AuthService.getListOptions()
    } catch (e) {
      console.log(e);
    }
  }
  static async getSalesCount(){
    try {
      return await AuthService.getSalesCount()
    } catch (e) {
      console.log(e);
    }
  }
  static async getMySales(lotsLimit,listPage,lotStatus){
    try {
      return await AuthService.getMySales(lotsLimit,listPage,lotStatus)
    } catch (e) {
      console.log(e);
    }
  }
  static async getCoordinLots(lotsLimit,listPage){
    try {
      return await AuthService.getCoordinLots(lotsLimit,listPage)
    } catch (e) {
      console.log(e);
    }
  }
  static async transport(createLot){
    
      return await AuthService.transport(createLot)
  }
  static async bidSearch(lotsLimit,listPage,search){
    try {
      return await AuthService.bidSearch(lotsLimit,listPage,search)
    } catch (e) {
      console.log(e);
    }
  }
  static async carFullProfile(carId){
    try {
      return await AuthService.carFullProfile(carId)
    } catch (e) {
      console.log(e);
    }
  }
  static async carUnAuthProfile(carId){
    try {
      return await AuthService.carUnAuthProfile(carId)
    } catch (e) {
      console.log(e);
    }
  }
  static async searchByVin(vin){
    try {
      return await AuthService.searchByVin(vin)
    } catch (e) {
      console.log(e);
    }
  }
  static async searchImg_ByVin(vin){
      return await AuthService.searchImg_ByVin(vin)  // добавление Promise.reject на уровне interceptor - ов .
  }
  static async createTransportLot(lotParams){
    try {
      return await AuthService.createTransportLot(lotParams)
    } catch (e) {
      console.log(e);
    }
  }
  static async updateTransportLot(lotNumber,lotParams){
    try {
      return await AuthService.updateTransportLot(lotNumber,lotParams)
    } catch (e) {
      console.log(e);
    }
  }
  static async getTransportLot(lotNumber){
    try {
      return await AuthService.getTransportLot(lotNumber)
    } catch (e) {
      console.log(e);
    }
  }
  static async setTransportImgs(formData){
    try {
      return await AuthService.setTransportImgs(formData)
    } catch (e) {
      console.log(e);
    }
  }
static async getSoldtLotsInfo(lotsLimit,listPage,status){
  return await AuthService.getSoldtLotsInfo(lotsLimit,listPage,status)
}


}
export default Fetching;
