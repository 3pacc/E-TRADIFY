import React, { useState } from 'react';
import './ConnectWalletModal.css';

const ConnectWalletModal = ({ onClose }) => {
  const [isTestWallet, setIsTestWallet] = useState(false);
  const [testAmount, setTestAmount] = useState('');

  const handleTestWalletChange = () => {
    setIsTestWallet(!isTestWallet);
  };

  const handleTestAmountChange = (e) => {
    setTestAmount(e.target.value);
  };

  const handleConnectWallet = async () => {
    if (isTestWallet && testAmount) {
      try {
        const response = await fetch('/api/auth/test-portfolio', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
          },
          body: JSON.stringify({ testPortfolio: isTestWallet, testAmount: parseFloat(testAmount) }),
        });
        if (response.ok) {
          console.log('Test wallet created/updated successfully');
          onClose();
        } else {
          console.error('Failed to create/update test wallet');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // Logique de connexion pour les autres portefeuilles
      console.log('Connecting to real wallet');
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Connect Your Wallet</h2>
        <button className="wallet-button">Connect with Metamask</button>
        <button className="wallet-button">Connect with WalletConnect</button>
        <div className="test-wallet">
          <label>
            <input type="checkbox" checked={isTestWallet} onChange={handleTestWalletChange} />
            Use Test Wallet
          </label>
          {isTestWallet && (
            <div className="test-amount">
              <label htmlFor="test-amount">Amount in USD:</label>
              <input
                type="number"
                id="test-amount"
                value={testAmount}
                onChange={handleTestAmountChange}
              />
            </div>
          )}
        </div>
        <button className="wallet-button" onClick={handleConnectWallet}>Connect Wallet</button>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
