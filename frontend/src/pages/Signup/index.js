import React, { useEffect } from "react";
import "./style.scss";
import LoginMan from "../../login_manager";

function Signup() {

  useEffect(()=>{
    let form = document.getElementById("signup_form")
    let errmsg = document.getElementById("errormsg")
    
    form["send"].onclick = async (ev)=>{
      const username = form["uname"].value
      const passwd1 = form["password"].value
      const passwd2 = form["passwordconfirm"].value
      const email = form["mail"].value
      const re = /(?:[A-Z].*[0-9])|(?:[0-9].*[A-Z])/

      if(passwd1 != passwd2){
        errmsg.innerText = "The passwords don't match up!"
      }else if(passwd1.length < 8){
        errmsg.innerText = "Your password has to be at least 8 characters long!"
      }else if(!re.test(passwd1)){
        errmsg.innerText = "Your password has to contain a capitalized character and a number!"
      } else if(await LoginMan.signup(username, passwd1, email)){
        window.location = "/login"
      }else{
        errmsg.innerText = "User with given name already exists!"
      } 
      
      ev.preventDefault()
    }
  }, [])

  return (
    <>
      <div id="content">
        <h1>Ekran rejestracji</h1>
        <form id="signup_form">
          <label for="uname">Username:</label><br />
          <input type="text" id="uname" name="uname" ></input><br />
          <label for="mail">Email:</label><br />
          <input type="email" id="mail" name="mail" ></input><br />
          <label for="password">Password:</label><br />
          <input type="password" id="password" name="password" ></input><br />
          <label for="passwordconfirm">Confirm password:</label><br />
          <input type="password" id="passwordconfirm" name="passwordconfirm" ></input><br />
          <input type="button" id="send" name="send" value="Send"></input>
          <p>Already have account? <a href="Login">Log in!</a></p>
          <p id="errormsg"></p>
        </form>
      </div>
    </>
  );
}

export default Signup;
