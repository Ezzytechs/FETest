import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
const Home = () => {
  return (
    <div className="Home">
      <div className="Items">
        <Link to={"/register"}>
          {" "}
          <button>Sign Up</button>
        </Link>
        <Link to={"/login"}>
          {" "}
          <button>Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
