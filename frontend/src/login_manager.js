import { login_fetch, signup_fetch } from "./network_manager"

class LoginManager{
    async signup(username, password, email){
        return await signup_fetch(username, password, email)
    }
    async login(username, password) {
        return await login_fetch(username, password)  
    }
}


let LoginMan = new LoginManager()

export default LoginMan