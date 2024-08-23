import { useSelector } from "react-redux";
import api from "../shared/utilits/axios/axiosSetting";
import axios from "axios";


class AuthService {
  static async login(username, password) {
    return api.post("/user/login", {
      username,
      password,
      client_id: 6,
      client_secret: "XsCXIvC6CF6tGLSqWN7e7juDAe0DNeJBQ54JbH07",
    });
  }
  static async logout() {
    return await api.post("/user/logout")
  }
  static async userInf() {
    return await api.get("/user/information")
  }

  static async filterInf() {
    return await api.get("/transport/filters")
  }
  static async carList(carsLimit,listPage) {
    return await api.get(`/transport?page=${listPage}&limit=${carsLimit}&order=id&by=asc`)
  }
  static async allCarList(carsLimit,listPage) {
    return await api.get(`/transport/all?page=${listPage}&limit=${carsLimit}&order=id&by=asc`)
  }
  
  static async favorite(prebid_transport_id, add) {
    return await api.post("/transport/favourite", {prebid_transport_id, add});
  }
  static async favoriteCarList(carsLimit=10,listPage=1){
    return await api.get(`/transport/favourite?page=${listPage}&limit=${carsLimit}&order=id&by=asc`)
  }
  static async getCountries(){
    return await api.get(`/countries`)
  }
  static async getAuctionList(auctionsLimit,listPage,search) {
    return await api.post(`/auctions/search?page=${listPage}&limit=${auctionsLimit}`,{search})
  }
  static async getListOptions () {
    return await api.get(`/transport/list-options`)
  }
  static async getSalesCount () {
    return await api.get(`/transport/get-count-my-sale`)
  }
  static async getMySales(lotsLimit,listPage,lotStatus){
    return await api.get(`/transport/my-sales?page=${listPage}&limit=${lotsLimit}&status=${lotStatus}`)
  }
  static async  getCoordinLots(lotsLimit,listPage){
    return await api.get(`transport/search?page=${listPage}&limit=${lotsLimit}&status=0`)
  }
  static async transport(createLot) {
    return await api.post("/transport", {...createLot});
  }
  static async bidSearch(lotsLimit,listPage,search) {
    return await api.post(`/transport/bid/search?limit=${lotsLimit}&page=${listPage}`,{search});
  }
  static async carFullProfile(carId) {
    return await api.get(`/transport/with-user/${carId}`);
  }
  static async carUnAuthProfile(carId) {
    return await api.get(`/transport/${carId}`);
  }
  static async searchByVin(vin) {
    return await api.post(`/transport/vin`,{vin,});
  }
  static async searchImg_ByVin(vin) {
    return await api.post(`/transport/get-image-by-vin`,{vin,});
  }
  static async createTransportLot(lotParams) {
    return await api.post(`/transport`,{...lotParams});  // старый запрос 
  }
  static async updateTransportLot(lotNumber,lotParams) {
    return await api.put(`/transport/${lotNumber}`,{...lotParams}); //проверить
  }
  static async getTransportLot(lotNumber) {
    return await api.put(`transport/with-user/${lotNumber}`); // проверить 
  }
  static async setTransportImgs(formData) {
    return await api.post(`/transport/image`,formData);  
  }
  static async getSoldtLotsInfo(lotsLimit,listPage,status){
    return await api.post(`transport/search?page=${listPage}&limit=${lotsLimit}`,{search:{status}})
  }
  
}



export default AuthService;