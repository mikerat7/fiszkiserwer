import { signup_fetch } from "./network_manager"

class LoginManager{
    async signup(username, password, email){
        return await signup_fetch(username, password, email)
    }
}

let LoginMan = new LoginManager()

export default LoginMan