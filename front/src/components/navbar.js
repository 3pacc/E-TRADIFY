import React, { useState } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import './Drop.jsx';
import ConnectWalletModal from './ConnectWalletModal'; 


const Navbar = ({onConnectWallet, isWalletModalOpen, toggleWalletModal}) => {
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <nav className="navbar">
      <div className="logo">PeakPredict</div>
      <ul className="navbar-list">
        <li>
          <Link to="/CryptoPrices" onClick={() => handleLinkClick('/CryptoPrices')} className={activeLink === '/CryptoPrices' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li className="dropdown">
          <Link to="/CryptoCharts" onClick={() => handleLinkClick('/CryptoCharts')} className={activeLink === '/CryptoCharts' ? 'active' : ''} onMouseEnter={toggleDropdown1}>
            Charts
          </Link>
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
          <a href="/binance.com" onMouseDown={toggleDropdown2}>
            Indicators
          </a>
          {isDropdownOpen2 && (
            <ul className="dropdown-menu">
              <li>
                <a href="/binance.com">Link 4</a>
              </li>
              <li>
                <a href="/#">Link 5</a>
              </li>
            </ul>
          )}
        </li>
        {/* <Drop/> */} <li>
        <Link to="/buycrypto" onClick={() => handleLinkClick('/buycrypto')} className={activeLink === '/buycrypto' ? 'active' : ''}>Buy Crypto</Link>  {/* Utilisez Link pour la navigation */}
        </li>
        <li>
          <button className="connect-wallet-button" onClick={onConnectWallet}>Connect Wallet</button>
        </li>
      </ul>
      {isWalletModalOpen && <ConnectWalletModal onClose={toggleWalletModal} />}
    </nav>
  );
};

export default Navbar;