import React, { useState } from 'react';
import './buyCrypto.css';

const BuyCrypto = () => {
  const [spendAmount, setSpendAmount] = useState('');
  const [spendCurrency, setSpendCurrency] = useState('BDT');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [receiveCurrency, setReceiveCurrency] = useState('USDT');
  const [network, setNetwork] = useState('Ethereum');
  const [walletAddress, setWalletAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/portfolios/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          spendAmount: parseFloat(spendAmount),
          spendCurrency,
          receiveAmount: parseFloat(receiveAmount),
          receiveCurrency,
          network,
          walletAddress,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Purchase successful', data);
        // Handle successful purchase
      } else {
        console.error('Failed to complete purchase', response.statusText);
        alert('Error during purchase: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error during purchase', error);
      alert('Network error during purchase');
    }
  };

  return (
    <section className="buy-crypto">
      <div className="container">
        <div className="row">
          <div className="column info-column">
            <div className="info-section">
              <h2 className="title">Effortlessly Buy Crypto Your Way, Anytime, Anywhere</h2>
              <div className="info-item">
                <div className="info-thumb">
                  <img src="assets/images/icon/accessible.png" alt="Accessible" />
                </div>
                <div className="info-content">
                  <h4>Accessible</h4>
                  <p>Easily purchase your favorite cryptocurrencies without any hassle</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-thumb">
                  <img src="assets/images/icon/convenient.png" alt="Convenient" />
                </div>
                <div className="info-content">
                  <h4>Convenient</h4>
                  <p>Choose from a wide range of payment options to buy crypto the way you prefer.</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-thumb">
                  <img src="assets/images/icon/low-cost.png" alt="Low-cost" />
                </div>
                <div className="info-content">
                  <h4>Low-cost</h4>
                  <p>Delight in advantageous pricing featuring competitive rates, low fees, and steady conversion rates.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="column form-column">
            <div className="form-section">
              <h2 className="form-title">Buy Crypto</h2>
              <span className="form-subtitle">Buy In Seconds</span>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="spend">Spend</label>
                  <div className="input-group">
                    <input
                      type="text"
                      id="spend"
                      value={spendAmount}
                      onChange={(e) => setSpendAmount(e.target.value)}
                      placeholder="2201-650,600"
                    />
                    <select
                      id="spend-currency"
                      value={spendCurrency}
                      onChange={(e) => setSpendCurrency(e.target.value)}
                    >
                      <option value="BDT">BDT</option>
                      <option value="ETH">ETH</option>
                      <option value="LFC">LFC</option>
                      <option value="TLP">TLP</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="receive">Receive</label>
                  <div className="input-group">
                    <input
                      type="text"
                      id="receive"
                      value={receiveAmount}
                      onChange={(e) => setReceiveAmount(e.target.value)}
                      placeholder="Enter purchase amount"
                    />
                    <select
                      id="receive-currency"
                      value={receiveCurrency}
                      onChange={(e) => setReceiveCurrency(e.target.value)}
                    >
                      <option value="USDT">USDT</option>
                      <option value="ETH">ETH</option>
                      <option value="LFC">LFC</option>
                      <option value="USDT">USDT</option>
                    </select>
                  </div>
                  <span className="exchange-rate">1 USDT = 126 BDT</span>
                </div>
                <div className="form-group">
                  <label htmlFor="network">Network</label>
                  <select
                    id="network"
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                  >
                    <option value="Ethereum">Ethereum</option>
                    <option value="ETH">ETH</option>
                    <option value="LFC">LFC</option>
                    <option value="USDT">USDT</option>
                  </select>
                  <div className="gas-fee">
                    <span>Gas fee</span>
                    <span className="fee-amount">5 USDT</span>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="wallet">Wallet Address</label>
                  <textarea
                    id="wallet"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Address"
                    cols="15"
                    rows="3"
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">Next</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyCrypto;
