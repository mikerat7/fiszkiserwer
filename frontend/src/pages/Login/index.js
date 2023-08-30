import React from "react";
import "./style.scss";

function Login() {

  return (
    <>
      <div id="content">
        <h1>Ekran logowania</h1>
        <form>
<<<<<<< Updated upstream
        <label for="uname">Username:</label><br />
        <input type="text" id="uname" name="uname" ></input><br />
        <label for="password">Password:</label><br />
        <input type="password" id="password" name="password" ></input><br />
        <input type="submit" value="Send"></input>
        <p>No account? <a href="Signup" id="link">Sign Up!</a></p>
=======
          <label for="uname">Username:</label><br />
          <input type="text" id="uname" name="uname" ></input><br />
          <label for="password">Password:</label><br />
          <input type="password" id="password" name="password" ></input><br />
          <input type="submit" value="Send"></input>
          <p>No account? <a href="Signup">Sign Up!</a></p>
>>>>>>> Stashed changes
        </form>
      </div>
    </>
  );
}

export default Login;
