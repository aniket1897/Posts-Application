class Auth {

    constructor(){
        this.token = null;
    }

    setToken(token){
        this.token = token;
    }

    getToken(){
        return localStorage.getItem('token');
    }
}

export default new Auth();