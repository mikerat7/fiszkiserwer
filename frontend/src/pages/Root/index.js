import { Outlet } from "react-router-dom";
import "./style.scss";
import Menubar from "../../widget/menubar"

export default function Root() {

  return (
    <div id="main">
      <Menubar />
      <Outlet></Outlet>
    </div>
  );
}
