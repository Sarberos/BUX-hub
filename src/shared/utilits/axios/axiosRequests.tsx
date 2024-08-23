import api from "./axiosSetting";

class Fetching {
  static async farmStatus() {
    api.get('farm/status');
}
  static async farmStart() {
    api.post('farm/start');
}
  static async farmClaim() {
    api.post('farm/claim');
}
}
export default Fetching;
