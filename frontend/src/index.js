import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Home,
  Root,
  Login,
  Signup,
  Notfound
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="" element={<Home/>}></Route>
          <Route path="Login" element={<Login/>}></Route>
          <Route path="Signup" element={<Signup/>}></Route>
          <Route path="*" element={<Notfound/>}></Route>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
