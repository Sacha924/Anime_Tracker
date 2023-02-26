import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/Login.css";
import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const SERVER_URL = "http://localhost:3000/users";

export default function Login() {
  const [authMode, setAuthMode] = useState("Sign In");
  const [errorMessage, setErrorMessage] = useState(null);
  const [mode_2FA, setMode_2FA] = useState(false);
  const [QRcodeURL, setQRcodeURL] = useState(null);
  const [secret, setSecret] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

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
          .then(async (data) => {
            Cookies.set("JWTtoken", data.token);
            Cookies.set("Username", username);
            const datas = await fetch(`${SERVER_URL}/me`, {
              method: "GET",
              headers: {
                Authorization: "Bearer " + Cookies.get("JWTtoken"),
              },
            })
              .then((response) => response.json())
              .then((data) => {
                return data;
              });
            datas.QRcodeURL !== undefined ? show2FAQRCode() : setModalIsOpen(true);
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

  const handleYesClick = () => {
    setModalIsOpen(false);
    setMode_2FA(true);
    show2FAQRCode();
  };

  const handleNoClick = () => {
    setModalIsOpen(false);
    navigate("/app");
  };

  const show2FAQRCode = async () => {
    // we are going to create a qrcode/secret that will be stored for the 2fa
    // but before that we need to check if the qrcode and secret were already created (it's the case if the user has already used the 2fa auth)
    setMode_2FA(true);
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const datas = await fetch(`${SERVER_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Cookies.get("JWTtoken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    if (datas.QRcodeURL && datas.secret) {
      setQRcodeURL(datas.QRcodeURL);
      setSecret(datas.secret);
    } else {
      const response = await fetch("http://localhost:3000/users/2fa", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      await fetch(`${SERVER_URL}/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("JWTtoken")}`,
        },
        body: JSON.stringify({
          username: username,
          password: password,
          secret: data.secret,
          QRcodeURL: data.QRcodeURL,
        }),
      })
        .then((response) => response.json())
        .catch((error) => console.log(error));

      setSecret(data.secret);
      setQRcodeURL(data.QRcodeURL);
    }
  };

  const codeVerification = async (e) => {
    e.preventDefault();
    const token = e.target[0].value;
    const body = { secret: secret, token: token };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    await fetch(SERVER_URL + "/2faVerify", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Code correct") {
          navigate("/app");
        } else {
          setErrorMessage(data.msg);
        }
      })
      .catch((e) => setErrorMessage(e.message));
  };

  return (
    <div className="Auth-form-container">
      <Modal isOpen={modalIsOpen} style={{ background: "black", color: "white" }}>
        <h2>Do you want to activate double authentication ?</h2>
        <button onClick={handleYesClick}>Yes</button>
        <button onClick={handleNoClick}>No</button>
      </Modal>
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
            <input type="username" className="form-control mt-1" placeholder="Enter username" ref={usernameRef} />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input type="password" className="form-control mt-1" placeholder="Enter password" ref={passwordRef} />
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

      {mode_2FA && QRcodeURL !== null && (
        <div>
          <p>Scan this QR code with your Google Authenticator app</p>
          <img src={QRcodeURL} />
          <form onSubmit={codeVerification}>
            <input type="text" placeholder="Enter your code" />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
