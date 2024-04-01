  import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const fixedTopRef = useRef(null);
  const navbarTogglerRef = useRef(null);
  const singleItemRef = useRef(null);
  const leftNavIconRef = useRef(null);
  const sectionRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        fixedTopRef.current.classList.add('animated', 'fadeInDown', 'header-fixed');
      } else {
        fixedTopRef.current.classList.remove('animated', 'fadeInDown', 'header-fixed');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavbarClick = (e) => {
    e.target.closest('li').classList.add('active');
    e.target.closest('li').siblings().classList.remove('active');
  };

  const handleHeaderClick = (e) => {
    e.target.closest('.single-item').classList.add('active');
    e.target.closest('.single-item').siblings().classList.remove('active');
  };

  const handleLeftNavIconClick = () => {
    leftNavIconRef.current.classList.toggle('show');
  };

  const handleSectionClick = () => {
    singleItemRef.current.classList.remove('active');
  };


  return (
    <header className="header-section ">
      <div>test1</div>
      <div>test1</div>
      <div>test1</div>
      <div>test1</div>
      <div>test1</div>
      <div>test1</div>
      <div>test1</div>
      <div>test1</div>
      <div>test1</div>
      {/* <div className="navbar_mainhead header-fixed w-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <nav className="navbar navbar-expand-lg position-relative py-md-3 py-lg-6">
                <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                  <img src="assets/images/logo.png" className="logo" alt="logo" />
                </Link>
                <div className="collapse navbar-collapse justify-content-between" id="navbar-content">
                  <ul className="navbar-nav d-flex align-items-lg-center gap-5 gap-lg-1 gap-xl-4 gap-xxl-7 py-2 py-lg-0 ms-2 ms-xl-10 ms-xxl-20 ps-0 ps-xxl-10 align-self-center">
                    <li className="dropdown">
                      <Link to="/" className="fs-ten">
                        Home
                      </Link>
                    </li>
                    <li className="dropdown show-dropdown">
                      <button
                        type="button"
                        aria-label="Navbar Dropdown Button"
                        className="dropdown-toggle dropdown-nav d-flex align-items-center fs-ten"
                      >
                        Staking
                        <i className="ti ti-chevron-down"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="staking" className="dropdown-item fs-ten">
                            Staking Pool
                          </Link>
                        </li>
                        <li>
                          <Link to="staking-details" className="dropdown-item fs-ten">
                            Pool details
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown show-dropdown">
                      <button
                        type="button"
                        aria-label="Navbar Dropdown Button"
                        className="dropdown-toggle dropdown-nav d-flex align-items-center fs-ten"
                      >
                        IDO
                        <i className="ti ti-chevron-down"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="ido" className="dropdown-item fs-ten">
                            IDO
                          </Link>
                        </li>
                        <li>
                          <Link to="idodetails" className="dropdown-item fs-ten">
                            IDO Details
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown show-dropdown">
                      <button
                        type="button"
                        aria-label="Navbar Dropdown Button"
                        className="dropdown-toggle dropdown-nav d-flex align-items-center fs-ten"
                      >
                        Swap
                        <i className="ti ti-chevron-down"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="swap" className="dropdown-item fs-ten">
                            Swap
                          </Link>
                        </li>
                        <li>
                          <Link to="swap-checkout" className="dropdown-item fs-ten">
                            Swap to share
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown show-dropdown">
                      <Link to="apex" className="fs-ten">
                        ApeX
                      </Link>
                    </li>
                    <li className="dropdown show-dropdown">
                      <button
                        type="button"
                        aria-label="Navbar Dropdown Button"
                        className="dropdown-toggle dropdown-nav d-flex align-items-center fs-ten"
                      >
                        Buy Crypto
                        <i className="ti ti-chevron-down"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="buycrypto" className="dropdown-item fs-ten">
                            Buy Crypto
                          </Link>
                        </li>
                        <li>
                          <Link to="pricing-plan" className="dropdown-item fs-ten">
                            Pricing plan
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown show-dropdown">
                      <button
                        type="button"
                        aria-label="Navbar Dropdown Button"
                        className="dropdown-toggle dropdown-nav d-flex align-items-center fs-ten"
                      >
                        Pages
                        <i className="ti ti-chevron-down"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="rewards" className="dropdown-item fs-ten">
                            Rewards
                          </Link>
                        </li>
                        <li>
                          <Link to="blogresource" className="dropdown-item fs-ten">
                            Blog
                          </Link>
                        </li>
                        <li>
                          <Link to="blogdetails" className="dropdown-item fs-ten">
                            Blog details
                          </Link>
                        </li>
                        <li>
                          <Link to="contact-us" className="dropdown-item fs-ten">
                            Contact us
                          </Link>
                        </li>
                        <li>
                          <Link to="terms-conditaions" className="dropdown-item fs-ten">
                            Terms & condition
                          </Link>
                        </li>
                        <li>
                          <Link to="404" className="dropdown-item fs-ten">
                            Error
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="right-area custom-pos position-relative d-flex gap-0 gap-lg-2 align-items-center">
                  <div className="single-item cart-area search-area">
                    <div className="cmn-head">
                      <button
                        type="button"
                        aria-label="Shopping Button"
                        className="common_toggles2 icon-area p-0 me-3 me-lg-0 box-second d-center position-relative"
                      >
                        <i className="ti ti-search slide-toggle2 fs-four p6-color"></i>
                      </button>
                      <div className="msg_area common_area2 p2-bg p-5 rounded-2">
                        <form className="d-flex align-items-center ">
                          <input type="text" />
                          <button type="submit" className="p-2">
                            <i className="ti ti-search slide-toggle2 fs-four p2-color"></i>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    aria-label="Navbar Toggler"
                    data-target="#navbar-content"
                    aria-expanded="true"
                    id="nav-icon3"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div> */}
    </header>
  );
};

export default Navbar;