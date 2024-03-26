import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./login/style.css";
import CryptoPrices from "./components/CryptoPrices"; // Assurez-vous que le chemin est correct
import SignInForm from "./login/SignIn";
import SignUpForm from "./login/SignUp";

export default function App() {
  const [type, setType] = useState("signIn");

  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <div className={containerClass} id="container">
            <SignUpForm />
            <SignInForm />
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
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
        } />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/CryptoPrices" element={<CryptoPrices />} />
        {/* Ajoutez d'autres routes ici si nécessaire */}
      </Routes>
    </div>
  );
}
