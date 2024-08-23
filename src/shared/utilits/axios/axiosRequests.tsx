import api from "./axiosSetting";

class Fetching {
  static async farmStatus() {
    api.get('farm/status');
}
}
export default Fetching;
