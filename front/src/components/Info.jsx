import React from 'react';
import './style.css';

const InfoSection = () => {
  return (
    <div className="crypto-section">
      <h2>Smart Trading Tools</h2>
      <p>Stay ahead in the fast-paced cryptocurrency market with our intelligent trading tools.</p>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-gift"></i>
          </div>
          <h3>Trading Rewards</h3>
          <p>Receive surprise cryptocurrency bonuses and rewards to boost your trading journey.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <h3>Predictive Analytics</h3>
          <p>Get real-time, machine learning-driven predictions to make informed trading decisions.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-bell"></i>
          </div>
          <h3>Instant Alerts</h3>
          <p>Stay ahead with instant notifications on market trends, price changes, and trading signals.</p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;