import axios from "axios";
import jwt from "jsonwebtoken";

const USER_API_BASE_URL = "http://185.125.123.102:8282/token/";

class AuthService {
  login(credentials) {
    return axios.post(USER_API_BASE_URL + "generate-token", credentials);
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  getAuthHeader() {
    return { headers: { Authorization: "Bearer " + this.getUserInfo().token } };
  }
  getAuthToken() {
    return "Bearer " + this.getUserInfo().token;
  }

  logOut() {
    localStorage.removeItem("userInfo");
    // TODO: razviti servise na backendu za logout kako bi se unistila sesija za usera
    //return axios.post(USER_API_BASE_URL + "logout", {}, this.getAuthHeader());
  }

  isLoggedIn() {
    if (!this.getUserInfo() || !this.getUserInfo().token) {
      return false;
    }

    const decode = jwt.decode(this.getUserInfo().token, { complete: true });
    if (new Date() > new Date(decode.payload.exp * 1000)) {
      console.log("token has expired");
      return false;
    }

    return true;
  }
}

export default new AuthService();
