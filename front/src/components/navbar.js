import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import './Drop.jsx';
import ConnectWalletModal from './ConnectWalletModal'; 


const Navbar = () => {
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const toggleWalletModal = () => {
    setIsWalletModalOpen(!isWalletModalOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">PeakPredict</div>
      <ul className="navbar-list">
        <li>
          <a href="/CryptoPrices">Home</a>
        </li>
        <li className="dropdown">
          <a href="/CryptoCharts" onPointerDown={toggleDropdown1}>
            Charts
          </a>
          {isDropdownOpen1 && (
            <ul className="dropdown-menu">
              <li>
                <a href="/btc-chart">BTC</a>
              </li>
              <li>
                <a href="/eth-chart">ETH</a>
              </li>
              <li>
                <a href="/ripple-chart">Ripple</a>
              </li>
            </ul>
          )}
        </li>
        <li className="dropdown">
          <a href="/#" onMouseDown={toggleDropdown2}>
            Indicators
          </a>
          {isDropdownOpen2 && (
            <ul className="dropdown-menu">
              <li>
                <a href="/#">Link 4</a>
              </li>
              <li>
                <a href="/#">Link 5</a>
              </li>
            </ul>
          )}
        </li>
        {/* <Drop/> */} <li>
        <Link to="/buycrypto">Buy Crypto</Link>  {/* Utilisez Link pour la navigation */}
        </li>
        <li>
          <button className="connect-wallet-button" onClick={toggleWalletModal}>Connect Wallet</button>
        </li>
      </ul>
      {isWalletModalOpen && <ConnectWalletModal onClose={toggleWalletModal} />}
    </nav>
  );
};

export default Navbar;