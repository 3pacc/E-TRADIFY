import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./login/style.css";
import './components/style.css';
import './App.css';

import CryptoPrices from "./components/CryptoPrices";
import Navbar from './components/navbar';
import SignInForm from "./login/SignIn";
import SignUpForm from "./login/SignUp";
import ConnectWalletModal from './components/ConnectWalletModal';

const BuyCrypto = React.lazy(() => import("./components/BuyCrypto"));
const CryptoCharts = React.lazy(() => import("./components/CryptoCharts"));

export default function App() {
  const [type, setType] = useState("signIn");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const handleConnectWallet = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      setIsWalletModalOpen(true);
    }
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const toggleWalletModal = () => {
    setIsWalletModalOpen(!isWalletModalOpen);
  };

  const handlePredictClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      navigate('/CryptoCharts');
    }
  };

  const promptLogin = () => {
    setShowAuthModal(true);
  };

  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      <Navbar onConnectWallet={handleConnectWallet} isWalletModalOpen={isWalletModalOpen} toggleWalletModal={toggleWalletModal} />
      <Routes>
        <Route path="/" element={<CryptoPrices onPredictClick={handlePredictClick} />} />
        <Route path="/buycrypto" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <BuyCrypto isLoggedIn={isLoggedIn} promptLogin={promptLogin} />
          </React.Suspense>
        } />
        <Route path="/cryptocharts" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <CryptoCharts />
          </React.Suspense>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {showAuthModal && (
        <div className="auth-modal">
          <div className={containerClass} id="container">
            <SignUpForm setIsLoggedIn={setIsLoggedIn} />
            <SignInForm setIsLoggedIn={setIsLoggedIn} />
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}>
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button className="ghost" id="signUp" onClick={() => handleOnClick("signUp")}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button className="close-modal" onClick={handleCloseAuthModal}>X</button>
        </div>
      )}
      {isWalletModalOpen && <ConnectWalletModal onClose={toggleWalletModal} />}
    </div>
  );
}
