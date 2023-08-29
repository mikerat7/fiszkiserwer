import { Outlet } from "react-router-dom";
import "./style.scss";
import menubar from "../../widget/menubar"

export default function Root() {

  return (
    <div id="main">
      <Outlet></Outlet>
      <menubar />
    </div>
  );
}
