import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./login/style.css";
import './components/style.css'; 

import CryptoPrices from "./components/CryptoPrices";
import Navbar from './components/navbar';
import SignInForm from "./login/SignIn";
import SignUpForm from "./login/SignUp";


export default function App() {
  const [type, setType] = useState("signIn");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  if (isLoggedIn) {
    return (
      <div className="components">
              <Navbar />
              <CryptoPrices />
            </div>
      );
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div className={containerClass} id="container">
              <SignUpForm setIsLoggedIn={setIsLoggedIn} />
              <SignInForm setIsLoggedIn={setIsLoggedIn} />
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>
                      To keep connected with us please login with your personal
                      info
                    </p>
                    <button
                      className="ghost"
                      id="signIn"
                      onClick={() => handleOnClick("signIn")}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button
                      className="ghost"
                      id="signUp"
                      onClick={() => handleOnClick("signUp")}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/signup"
          element={<SignUpForm setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signin"
          element={<SignInForm setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/CryptoPrices"
          element={
            isLoggedIn ? (
              <div className="components">
                <Navbar />
                <CryptoPrices />
              </div>
            ) : (
              <Navigate to="/signin" replace={true} />
            )
          }
        />
      </Routes>
    </div>
  );
}
