import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Home from "./Home/Home";
import Success from "./Register/Success/Success";
import "./Content.scss";

const Content = () => {
  return (
    <>
      <div className="Content">
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/success" Component={Success} />
          <Route path="/" Component={Home} />
        </Routes>
      </div>
    </>
  );
};

export default Content;
