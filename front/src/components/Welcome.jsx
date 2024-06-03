import React from 'react';
import './style.css';
import InfoSection from './Info';

const Welcome = () => {
  return (
    <div className="predictive-insights">
      <div className="content">
        <h1>UNLOCK THE POWER OF PREDICTIVE CRYPTOCURRENCIES INSIGHTS</h1>
        <div>
            <div className="bonus-box">
            <i className="fa fa-gift"></i>
            <span>Free Trial Bonus</span>
            <p>Get a demo account to test our advanced AI prediction models.</p>
            </div>
            <div className="button-group">
            <button className="try-now">Try Now</button>
            <button className="about-us">About Us</button>
            </div>
        </div>
      {/* <InfoSection/> */}
      </div>
      <div className="background-image"></div>
    </div>
  );
};

export default Welcome;