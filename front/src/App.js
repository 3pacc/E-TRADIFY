import React, { useState, useEffect, lazy } from "react";
import { Routes , Route, Navigate, useNavigate } from "react-router-dom";
import "./login/style.css";
import './components/style.css'; 

import CryptoPrices from "./components/CryptoPrices";
import Navbar from './components/navbar';
import SignInForm from "./login/SignIn";
import SignUpForm from "./login/SignUp";
import CryptoCharts from "./components/CryptoCharts";
// import Charts from "./components/charts";
import Footer from "./components/footer";
// import ProtectedRoute from "./components/ProtectedRoute";

// const CryptoCharts = lazy(() => import("./components/CryptoCharts"));

export default function App() {
  const [type, setType] = useState("signIn");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const decodedToken = tokenVerification(token);
  //     if (decodedToken) {
  //       setIsLoggedIn(true);
  //     } else {
  //       // Token is invalid or expired, handle the case accordingly
  //       localStorage.removeItem('token');
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token'); // Remove the token from localStorage or sessionStorage
    setIsLoggedIn(false);
    // navigate("/signin");
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  if (isLoggedIn) {
    return (
      <div className="components">
              <Navbar />
                <Routes>
                  <Route path="/CryptoPrices" element={<CryptoPrices />} />
                  <Route path="*" element={<Navigate to="/CryptoPrices" />} />
                  <Route path="/CryptoCharts" element={<CryptoCharts />} />
                </Routes>
              <Footer/>
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
          path="/logout"
          element={<div>
            <p>You have been logged out.</p>
            <SignInForm setIsLoggedIn={setIsLoggedIn} />
          </div>}
        />
        <Route
          path="/CryptoPrices"
          element={
            isLoggedIn ? (
              <div className="components">
                <Navbar />
                <CryptoPrices />
                <Footer/>
              </div>
            ) : (
              null
              // <Navigate to="/signin" replace={true} />
            )
          }
        />
        <Route
          path="/CryptoCharts"
          element={
            isLoggedIn ? (
              <div className="components">
                <Navbar />
                <CryptoCharts/>
                <Footer/>
              </div>
            ) : (
              null
              // <Navigate to="/signin" replace={true} />
            )
          }
        />
        
      {/* <ProtectedRoute path="/CryptoCharts" component={CryptoCharts} /> */}
      </Routes>
    </div>
  );
}
