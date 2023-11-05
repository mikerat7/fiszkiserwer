import React from "react";
import "./style.scss";
import LoginMan from "../../login_manager";
import Icon from './userdefault.js'

// (con) ? val1 : val2

export function Menubar() {

    return (
     <div class="menubar">
        <a href="/">Home</a>
        <a href="Login">Log in</a>
        <a href="Signup">Sign up</a>
        <a>Language</a>
        <a>Set</a>
     </div>
    );
  }
  export function Menubar2() {
   async function logout(){
      if(await LoginMan.logout()){
         window.location = window.location
      }else{
         LoginMan.force_logout()
         window.alert("no logout")
         window.location = window.location
      }
   }
   return (
    <div class="menubar">
       <a href="/">Home</a>
       <a onClick={async () => await logout()}>Log Out</a>
       <a href="Profile" id="UserBtn">
            <span>{LoginMan.username()}</span>
            {LoginMan.pfp() != "" ? (<img src={LoginMan.pfp()} id="pfp"/>) : <Icon />}
         </a>
       <a>Language</a>
       <a>Set</a>
    </div>
   );
 }  
