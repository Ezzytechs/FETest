import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../UI/Spinner/Spinner";
import image from "../../../assets/images/farm.jpg";
import "./Login.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    phoneError: false,
    passwordError: false,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginData = { phone: phoneNumber, password: password };
      const res = await axios.post(
        "https://www.dev.farmwarehouse.ng/api/users/login",
        loginData
      );
      setLoading(false);
      if (res.data) {
        navigate("/verification");
      }
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message);
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <img src={image} alt="Farm Warehouse" className="login-image" />
      </div>

      <div className="right-section">
        <div className="contents">
          <div className="back-button">
            ← <Link to={"/"}>Back home</Link>
          </div>
          <h2>Welcome back!</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email address / Phone number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={error?.phoneError ? "input-error" : ""}
                placeholder="+2348163542395"
              />
              {error?.phoneError && (
                <p className="error-text">
                  This phone number is not verified. Log in with email instead.
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error?.passwordError ? "input-error" : ""}
                placeholder="Password"
              />
              {error?.passwordError && (
                <p className="error-text">Wrong password</p>
              )}
            </div>
            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember for 30 days
              </label>
              <a href="/forgot-password">Forgot password</a>
            </div>
            <button type="submit" disabled={loading} className="login-button">
              {loading ? <Spinner /> : "Submit"}
            </button>
            <p className="signup-text">
              Don’t have an account? <Link href="/register">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
