import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
const Nav = () => {
  return (
    <>
      {" "}
      <div className="Nav">
        <div className="back-home">
          <Link to={"/"}>← Back home</Link>
        </div>
        <div className="back-home">
          Already have an account?
          <Link to={"/register"}> Login</Link>
        </div>
      </div>
      <h3>Create Account</h3>{" "}
    </>
  );
};

export default Nav;
