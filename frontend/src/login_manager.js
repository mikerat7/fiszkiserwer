import { login_fetch, signup_fetch, logout_fetch, userdata_fetch, changepfp_fetch } from "./network_manager"

class LoginManager{
    async signup(username, password, email){
        return await signup_fetch(username, password, email)
    }
    async login(username, password) {
        let userdata = await login_fetch(username, password) 
        if(userdata.status == 202){
            let res = await userdata.json()
            localStorage.setItem("loggedin", true)

            localStorage.setItem("userID", res.UserID) 
            localStorage.setItem("token", res.Token) 
            
            await this.UpdateUserInfo()

            return true
        } else{
            return false
        }
    }

    async UpdateUserInfo(){
        let userinfo = await userdata_fetch(this.userID())
        let res = await userinfo.json()

        localStorage.setItem("username", res.Username) 
        localStorage.setItem("pfp", res.Profilepic) 
    }

    async changepfp(file){
        return await changepfp_fetch(this.token(), file)
    }

    async logout(){
        if(await logout_fetch(this.token())){
            this.force_logout()

            return true
        }
        else{
            return false
        }
    }

    async force_logout(){
        localStorage.setItem("token", undefined) 
        localStorage.setItem("userID", -1)
        localStorage.setItem("loggedin", false)
        localStorage.setItem("username", undefined) 
        localStorage.setItem("pfp", undefined) 
    }

    userID(){
        return parseInt(localStorage.getItem("userID"))
    }

    token(){
        return localStorage.getItem("token")
    }

    loggedin(){
        return localStorage.getItem("loggedin") == "true"
    }

    username(){
        return localStorage.getItem("username")
    }

    pfp(){
        return localStorage.getItem("pfp")
    }
}


let LoginMan = new LoginManager()

export default LoginMan