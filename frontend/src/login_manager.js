import { login_fetch, signup_fetch, logout_fetch } from "./network_manager"

class LoginManager{
    async signup(username, password, email){
        return await signup_fetch(username, password, email)
    }
    async login(username, password) {
        let userdata = await login_fetch(username, password) 
        if(userdata){
            localStorage.setItem("loggedin", "true")

            localStorage.setItem("userID", String(userdata.userID)) 
            localStorage.setItem("token", userdata.token) 
            window.alert(JSON.stringify(userdata))
            return true
        } else{
            return false
        }
    }
    async logout(){
        if(await logout_fetch(this.token())){
            localStorage.setItem("token", "false") 
            localStorage.setItem("userID", "-1")
            localStorage.setItem("loggedin", "")
        }
        else{
            return false
        }
    }

    async force_logout(){
        localStorage.setItem("token", "false") 
        localStorage.setItem("userID", "-1")
        localStorage.setItem("loggedin", "")
    }
userID(){
    let str = localStorage.getItem("userID")
    return parseInt(str)
}
token(){
    let str = localStorage.getItem("token")
    return str
}
loggedin(){
    let str = localStorage.getItem("loggedin")
    return str == "true"
}

}


let LoginMan = new LoginManager()

export default LoginMan