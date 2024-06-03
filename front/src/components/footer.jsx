import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Footer = () => {
  return (
      <div className="footer-container">
        <div className="footer-left">
          <h3>PeakPredict</h3>
          <p>© 2024 PeakPredict. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
          <div className="footer-social">
            <a href="#"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
            <a href="#"><FontAwesomeIcon icon={['fab', 'fa-twitter']} /></a>
            <a href="#"><FontAwesomeIcon icon={['fab', 'fa-instagram']} /></a>
            <a href="#"><FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a>
            <a href="#"><FontAwesomeIcon icon={['fab', 'fa-telegram']} /></a>
            <a href="#"><FontAwesomeIcon icon={['fab', 'fa-discord']} /></a>
          </div>
        </div>
      </div>
  );
};

export default Footer;