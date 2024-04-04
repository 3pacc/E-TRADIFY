import React, { useState }  from 'react'

export default function Drop() {
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);


  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  return (
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
  )
}
