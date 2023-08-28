import { Outlet } from "react-router-dom";
import "./style.scss";

export default function Root() {

  return (
    <div id="main">
      <Outlet></Outlet>
    </div>
  );
}
