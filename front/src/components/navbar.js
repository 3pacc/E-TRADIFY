import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  return (
    <nav className="navbar">
      <div className="logo">logo</div>
      <ul className="navbar-list">
        <li>
          <a href="#">Link 1</a>
        </li>
        <li className="dropdown">
          <a href="#" onPointerDown={toggleDropdown1}>
            Dropdown 1
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
            Dropdown 2
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
      </ul>
    </nav>
  );
};

export default Navbar;