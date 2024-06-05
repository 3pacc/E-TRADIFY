import React, { useState, useEffect } from "react";
import { Routes , Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import "./login/style.css";
import './components/style.css'; 
import BTC from './coins/BTC'
import ETH from './coins/ETH'
import XRP from './coins/XRP'
import ADA from './coins/ADA'
import SOL from './coins/SOL'
import BNB from './coins/BNB'
import CryptoPrices from "./components/CryptoPrices";
import Navbar from './components/navbar';
import SignInForm from "./login/SignIn";
import SignUpForm from "./login/SignUp";
import CryptoCharts from "./components/CryptoCharts";
import Footer from "./components/footer";
import BuyCrypto from "./components/BuyCrypto";
import ConnectWalletModal from "./components/ConnectWalletModal";

export default function App() {
  const [type, setType] = useState("signIn");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();


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
  

  const handlePredictClick = (crypto) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
        switch (crypto.toLowerCase()) {
          case 'btc':
            navigate('/btc-chart');
            break;
          case 'eth':
            navigate('/eth-chart');
            break;
          case 'xrp':
            navigate('/xrp-chart');
            break;
          case 'ada':
            navigate('/ada-chart');
            break;
          case 'sol':
            navigate('/sol-chart');
            break;
          case 'bnb':
            navigate('/bnb-chart');
            break;
          default:
            break;
        }
    }
  };

  const promptLogin = () => {
    setShowAuthModal(true);
  };


  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false);
    navigate("/signin"); 
  };
  

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  // if (isLoggedIn) {
  //   return (
  //     <div className="components">
  //             <Navbar 
  //             onConnectWallet={handleConnectWallet} 
  //             isWalletModalOpen={isWalletModalOpen} 
  //             toggleWalletModal={toggleWalletModal}
  //             handleLogout={handleLogout}/>
  //               <Routes>
  //                 <Route path="/CryptoPrices" element={<CryptoPrices onPredictClick={handlePredictClick}/>} />
  //                 <Route path="*" element={<Navigate to="/CryptoPrices" />} />
  //                 <Route path="/CryptoCharts" element={<CryptoCharts />} />
  //                 <Route path="/Buycrypto" element={<BuyCrypto isLoggedIn={isLoggedIn} promptLogin={promptLogin} />} />
  //                 <Route path="/logout" handleLogout={handleLogout} element={<div><SignInForm /><SignUpForm/></div>} />
  //                 <Route path="/btc-chart" element={<BTC />} />
  //                 <Route path="/eth-chart" element={<ETH />} />
  //                 <Route path="/xrp-chart" element={<XRP />} />
  //                 <Route path="/ada-chart" element={<ADA />} />
  //                 <Route path="/sol-chart" element={<SOL />} />
  //                 <Route path="/bnb-chart" element={<BNB />} />
  //               </Routes>
  //             <Footer/>
  //           </div>
  //     );
  // }

  return (
    <div className="App">
      <Navbar 
        onConnectWallet={handleConnectWallet} 
        isWalletModalOpen={isWalletModalOpen} 
        toggleWalletModal={toggleWalletModal}
        handleLogout={handleLogout}/>
          <Routes>
            <Route path="/" element={<CryptoPrices onPredictClick={handlePredictClick} />} />
            <Route path="/CryptoPrices" element={<CryptoPrices onPredictClick={handlePredictClick}/>} />
            <Route path="*" element={<Navigate to="/CryptoPrices" />} />
            <Route path="/CryptoCharts" element={<CryptoCharts />} />
            <Route path="/Buycrypto" element={<BuyCrypto isLoggedIn={isLoggedIn} promptLogin={promptLogin} />} />
            <Route path="/logout" handleLogout={handleLogout} element={<div><SignInForm /><SignUpForm/></div>} />
            <Route path="/btc-chart" element={<BTC />} />
            <Route path="/eth-chart" element={<ETH />} />
            <Route path="/xrp-chart" element={<XRP />} />
            <Route path="/ada-chart" element={<ADA />} />
            <Route path="/sol-chart" element={<SOL />} />
            <Route path="/bnb-chart" element={<BNB />} />
          </Routes>
        <Footer/>
      {showAuthModal && (
            <div className="auth-modal">
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
              <button className="close-modal" onClick={handleCloseAuthModal}>X</button>
              </div>
            )}
          {isWalletModalOpen && <ConnectWalletModal onClose={toggleWalletModal} />}
          </div>       
  );
}
        {/* <Route
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
              // null
              <Navigate to="/signin" replace={true} />
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
         <Route path="/Buycrypto" element={<BuyCrypto isLoggedIn={isLoggedIn} promptLogin={promptLogin} />} />
        
         <Route path="/btc-chart" element={<BTC />} />
         <Route path="/eth-chart" element={<ETH />} />
         <Route path="/xrp-chart" element={<XRP />} />
         <Route path="/ada-chart" element={<ADA />} />
         <Route path="/sol-chart" element={<SOL />} />
         <Route path="/bnb-chart" element={<BNB />} />
      <ProtectedRoute path="/CryptoCharts" component={CryptoCharts} />
      </Routes>
    </div>
  );
} */}
