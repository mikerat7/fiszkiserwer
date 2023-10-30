import React, { useEffect } from "react";
import "./style.scss";
import LoginMan from "../../login_manager";

function Login() {

  useEffect(()=>{
    let form = document.getElementById("login_form")
    let errmsg = document.getElementById("errormsg")
    
    form["send"].onclick = async (ev)=>{
      let loginuser = document.getElementById("uname").value
      let loginpass = document.getElementById("password").value   
      
      if(await LoginMan.login(loginuser, loginpass)){
        window.location = "/"
      }else{
        errmsg.innerText = "Thou shall not pass!"
      } 
      
      ev.preventDefault()
    }
  }, [])
  
  return (
    <>
      <div id="content">
        <h1>Ekran logowania</h1>
        <form id="login_form">
          <label for="uname">Username:</label><br />
          <input type="text" id="uname" name="uname" ></input><br />
          <label for="password">Password:</label><br />
          <input type="password" id="password" name="password" ></input><br />
          <input type="button" id="send" name="send" value="Send"></input>
          <p>No account? <a href="Signup">Sign Up!</a></p>
          <p id="errormsg"></p>
        </form>
      </div>
    </>
  );
}

export default Login;
