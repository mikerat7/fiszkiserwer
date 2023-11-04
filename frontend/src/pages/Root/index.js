import { Outlet } from "react-router-dom";
import "./style.scss";
import {Menubar, Menubar2} from "../../widget/menubar"
import LoginMan from "../../login_manager";

export default function Root() {

  return (
    <div id="main">
      {
        LoginMan.loggedin() ? (<Menubar2 />) : (<Menubar />)
      }
      <Outlet></Outlet>
    </div>
  );
}
