import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/Login.css";
import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SERVER_URL = "http://localhost:3000/users";

export default function Login() {
  const [authMode, setAuthMode] = useState("Sign In");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const changeAuthMode = () => {
    setAuthMode(authMode === "Sign In" ? "Sign Up" : "Sign In");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    const body = { username: username, password: password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    authMode === "Sign In"
      ? await fetch(SERVER_URL + "/login", options)
          .then((res) => res.json())
          .then((data) => {
            Cookies.set("JWTtoken", data.token);
            Cookies.set("Username", username);
            navigate("/app");
          })
          .catch(() => setErrorMessage("Paire login/mot de passe incorrecte"))
      : await fetch(SERVER_URL + "/register", options)
          .then((res) => res.json())
          .then((data) => {
            alert(`Welcome ${data.result.username}, your successfully created an account, you can now login !`);
            setAuthMode("Sign In");
          })
          .catch((e) => setErrorMessage(e.message));
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">{authMode}</h3>
          <div className="text-center">
            Not registered yet?
            <span className="link-primary" onClick={changeAuthMode}>
              {authMode === "Sign In" ? " Sign Up" : " Sign In"}
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input type="username" className="form-control mt-1" placeholder="Enter username" />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input type="password" className="form-control mt-1" placeholder="Enter password" />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
        {errorMessage && errorMessage}
      </form>
    </div>
  );
}
