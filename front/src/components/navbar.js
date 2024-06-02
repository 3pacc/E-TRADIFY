import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Utilisez Link pour la navigation
import './Navbar.css';
import ConnectWalletModal from './ConnectWalletModal'; // Assurez-vous que le chemin est correct

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
      <div className="logo">logo</div>
      <ul className="navbar-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="dropdown">
          <a href="#" onPointerDown={toggleDropdown1}>
            Algorithms
          </a>
          {isDropdownOpen1 && (
            <ul className="dropdown-menu">
              <li>
                <a href="#">Link 1</a>
              </li>
              <li>
                <a href="#">Link 2</a>
              </li>
              <li>
                <a href="#">Link 3</a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a href="#">Link 2</a>
        </li>
        <li className="dropdown">
          <a href="#" onMouseDown={toggleDropdown2}>
            Indicators
          </a>
          {isDropdownOpen2 && (
            <ul className="dropdown-menu">
              <li>
                <a href="#">Link 4</a>
              </li>
              <li>
                <a href="#">Link 5</a>
              </li>
            </ul>
          )}
        </li>
        <li>
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
