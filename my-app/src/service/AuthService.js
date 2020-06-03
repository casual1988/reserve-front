import axios from 'axios';

<<<<<<< HEAD
const USER_API_BASE_URL = 'http://localhost:8080/token/';
=======
const USER_API_BASE_URL = 'http://185.125.123.102:8282/token/';
>>>>>>> moj_branch

class AuthService {

    login(credentials){
        return axios.post(USER_API_BASE_URL + "generate-token", credentials);
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
        return {headers: {Authorization: 'Bearer ' + this.getUserInfo().token }};
    }
<<<<<<< HEAD
=======
    getAuthToken() {
        return 'Bearer ' + this.getUserInfo().token;
    }
>>>>>>> moj_branch

    logOut() {
        localStorage.removeItem("userInfo");
        return axios.post(USER_API_BASE_URL + 'logout', {}, this.getAuthHeader());
    }
}

export default new AuthService();