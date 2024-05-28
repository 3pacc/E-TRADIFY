
//================================================================================================================================
//Using Binance API
//================================================================================================================================

/*
import React, { useState, useEffect } from 'react';
import './style.css'; 

function CryptoPrices() {
    const [prices, setPrices] = useState({
        btc: { price: '', imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029' },
        eth: { price: '', imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029' },
        xrp: { price: '', imageUrl: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=029' },
        ada: { price: '', imageUrl: 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=029' },
        sol: { price: '', imageUrl: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=029' },
        bnb: { price: '', imageUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029' },
        bch: { price: '', imageUrl: 'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.svg?v=029' },
        trx: { price: '', imageUrl: 'https://cryptologos.cc/logos/tron-trx-logo.svg?v=029' },
    });

    useEffect(() => {
        const fetchData = async () => {
            const endpoint = 'https://api.binance.com';
            const queries = {
                btc: '/api/v3/ticker/price?symbol=BTCUSDT',
                eth: '/api/v3/ticker/price?symbol=ETHUSDT',
                xrp: '/api/v3/ticker/price?symbol=XRPUSDT',
                ada: '/api/v3/ticker/price?symbol=ADAUSDT',
                sol: '/api/v3/ticker/price?symbol=SOLUSDT',
                bnb: '/api/v3/ticker/price?symbol=BNBUSDT',
                bch: '/api/v3/ticker/price?symbol=BCHUSDT',
                trx: '/api/v3/ticker/price?symbol=TRXUSDT',
            };

            const requests = Object.keys(queries).map(async (key) => {
                const response = await fetch(endpoint + queries[key]);
                const data = await response.json();
                return {
                    [key]: {
                        ...prices[key],
                        price: data['price'],
                    }
                };
            });

            const results = await Promise.all(requests);
            const updatedPrices = Object.assign({}, ...results);
            setPrices(updatedPrices);
        };

        fetchData();
        const interval = setInterval(fetchData, 3000); // Mise à jour toutes les 5 secondes

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h3>Crypto Prices</h3>
            {Object.entries(prices).map(([key, value]) => (
                <div key={key} className="priceItem">
                    <img src={value.imageUrl} alt={key.toUpperCase()} style={{ width: '20px', marginRight: '10px', verticalAlign: 'middle' }} />
                    <strong>{key.toUpperCase()}USDT :</strong> {value.price}
                </div>
            ))}
        </div>
    );
}

export default CryptoPrices; 


*/





/*
========================================================================================================================
//Using coingecko API 
========================================================================================================================

import React, { useState, useEffect } from 'react';
import './style.css'; 

function CryptoPrices() {
    const [prices, setPrices] = useState({
        btc: { price: '', imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029' },
        eth: { price: '', imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029' },
        xrp: { price: '', imageUrl: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=029' },
        ada: { price: '', imageUrl: 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=029' },
        sol: { price: '', imageUrl: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=029' },
        bnb: { price: '', imageUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029' },
        bch: { price: '', imageUrl: 'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.svg?v=029' },
        trx: { price: '', imageUrl: 'https://cryptologos.cc/logos/tron-trx-logo.svg?v=029' },
    });

    useEffect(() => {
        const fetchData = async () => {
            const ids = [
                'bitcoin', 'ethereum', 'ripple', 'cardano', 
                'solana', 'binancecoin', 'bitcoin-cash', 'tron'
            ].join(',');
            const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                const updatedPrices = Object.keys(prices).map(key => {
                    // Mapping de l'identifiant CoinGecko au symbole utilisé dans l'état local
                    const idMap = {
                        btc: 'bitcoin',
                        eth: 'ethereum',
                        xrp: 'ripple',
                        ada: 'cardano',
                        sol: 'solana',
                        bnb: 'binancecoin',
                        bch: 'bitcoin-cash',
                        trx: 'tron',
                    };
                    const coingeckoId = idMap[key];
                    return {
                        [key]: {
                            ...prices[key],
                            price: data[coingeckoId]?.usd || 'N/A',
                        },
                    };
                }).reduce((acc, val) => ({ ...acc, ...val }), {});
                
                setPrices(updatedPrices);
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 2000); // Mise à jour toutes les 60 secondes pour limiter les appels API

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h3>Crypto Prices</h3>
            {Object.entries(prices).map(([key, value]) => (
                <div key={key} className="priceItem">
                    <img src={value.imageUrl} alt={key.toUpperCase()} style={{ width: '20px', marginRight: '10px', verticalAlign: 'middle' }} />
                    <strong>{key.toUpperCase()}USDT :</strong> {value.price}
                </div>
            ))}
        </div>
    );
}

export default CryptoPrices;
===============================================================================================================================
*/


/*
===============================================================================================================================
Using Binance and Coincgecko API 
===============================================================================================================================

import React, { useState, useEffect } from 'react';
import './style.css'; 

function CryptoPrices() {
    const [cryptoData, setCryptoData] = useState({});

    useEffect(() => {
        const fetchPrices = async () => {
            const binanceURL = 'https://api.binance.com/api/v3/ticker/price';
            const symbols = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'ADAUSDT', 'SOLUSDT', 'BNBUSDT', 'BCHUSDT', 'TRXUSDT'];
            const priceRequests = symbols.map(symbol =>
                fetch(`${binanceURL}?symbol=${symbol}`).then(response => response.json())
            );

            const prices = await Promise.all(priceRequests);
            const priceData = prices.reduce((acc, data) => {
                acc[data.symbol] = { price: data.price };
                return acc;
            }, {});

            setCryptoData(prevData => ({ ...prevData, ...priceData }));
        };

        const fetchAdditionalData = async () => {
            const coingeckoURL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,solana,binancecoin,bitcoin-cash,tron&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true';
            const response = await fetch(coingeckoURL);
            const data = await response.json();

            
            const additionalData = {
                BTCUSDT: { marketCap: data.bitcoin.usd_market_cap, dailyChange: data.bitcoin.usd_24h_change, volume: data.bitcoin.usd_24h_vol },
                ETHUSDT: { marketCap: data.ethereum.usd_market_cap, dailyChange: data.ethereum.usd_24h_change, volume: data.ethereum.usd_24h_vol },
                XRPUSDT: { marketCap: data.xrp.usd_market_cap, dailyChange: data.xrp.usd_24h_change, volume: data.xrp.usd_24h_vol },
                ADAUSDT: { marketCap: data.cardano.usd_market_cap, dailyChange: data.cardano.usd_24h_change, volume: data.cardano.usd_24h_vol },
                SOLUSDT: { marketCap: data.solana.usd_market_cap, dailyChange: data.solana.usd_24h_change, volume: data.solana.usd_24h_vol },
                BNBUSDT: { marketCap: data.bnb.usd_market_cap, dailyChange: data.bnb.usd_24h_change, volume: data.bnb.usd_24h_vol }
                //more..
            };

            setCryptoData(prevData => {
                return Object.keys(prevData).reduce((acc, key) => {
                    acc[key] = { ...prevData[key], ...additionalData[key] };
                    return acc;
                }, {});
            });
        };

        fetchPrices();
        fetchAdditionalData();
        const intervalId = setInterval(() => {
            fetchPrices();
            fetchAdditionalData();
        }, 10000); // Mise à jour toutes les 2 secondes

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h3>Crypto Prices and Info</h3>
            {Object.entries(cryptoData).map(([symbol, data]) => (
                <div key={symbol} className="cryptoItem">
                    <strong>{symbol} :</strong> Price: {data.price}, Market Cap: {data.marketCap}, Daily Change: {data.dailyChange}%, Volume: {data.volume}
                </div>
            ))}
        </div>
    );
}

export default CryptoPrices;


*/




//==========================================================================
//Most Data Market from Binance API
//==========================================================================


import React, { useState, useEffect } from 'react';
import './style.css'; 


function CryptoPrices() {
    const [prices, setPrices] = useState({
        btc: { 
            price: '', 
            imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029', 
            change24h: '', 
            marketCap: '', 
            volume24h: '' 
        },
        eth: { 
            price: '', 
            imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029', 
            change24h: '', 
            marketCap: '', 
            volume24h: '' 
        },
        xrp: { 
            price: '', 
            imageUrl: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=029', 
            change24h: '', 
            marketCap: '', 
            volume24h: '' 
        },
        ada: { 
            price: '', 
            imageUrl: 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=029', 
            change24h: '', 
            marketCap: '', 
            volume24h: '' 
        },
        sol: { 
            price: '', 
            imageUrl: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=029', 
            change24h: '', 
            marketCap: '', 
            volume24h: '' 
        },
        bnb: { 
            price: '', 
            imageUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029', 
            change24h: '', 
            marketCap: '', 
            volume24h: '' 
        },
        bch: { 
            price: '', 
            imageUrl: 'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.svg?v=029', 
            change24h: '', 
            marketCap: '', 
            volume24h: '' 
        },
        trx: { 
            price: '', 
            imageUrl: 'https://cryptologos.cc/logos/tron-trx-logo.svg?v=029', 
            change24h: '', 
            marketCap: '', 
            volume24h: '' 
        },
    });

    useEffect(() => {
        const fetchData = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage or sessionStorage

        if (token) {
        // Make API requests with the token in the headers
            const headers = { Authorization: `Bearer ${token}` };
            const endpoint = 'https://api3.binance.com';
            const queries = {
                btc: '/api/v3/ticker/price?symbol=BTCUSDT',
                eth: '/api/v3/ticker/price?symbol=ETHUSDT',
                xrp: '/api/v3/ticker/price?symbol=XRPUSDT',
                ada: '/api/v3/ticker/price?symbol=ADAUSDT',
                sol: '/api/v3/ticker/price?symbol=SOLUSDT',
                bnb: '/api/v3/ticker/price?symbol=BNBUSDT',
                bch: '/api/v3/ticker/price?symbol=BCHUSDT',
                trx: '/api/v3/ticker/price?symbol=TRXUSDT',
            };

            const requests = Object.keys(queries).map(async (key) => {
                const response = await fetch(endpoint + queries[key], { headers });
                const data = await response.json();
                const response24h = await fetch(endpoint + '/api/v3/ticker/24hr?symbol=' + key.toUpperCase() + 'USDT', { headers });
                const data24h = await response24h.json();
                return {
                    [key]: {
                        ...prices[key],
                        price: data['price'],
                        change24h: data24h['priceChangePercent'],
                        marketCap: data24h['marketCap'],
                        volume24h: data24h['volume'],
                    }
                };
            });

            const results = await Promise.all(requests);
            const updatedPrices = Object.assign({}, ...results);
            setPrices(updatedPrices);
        } else {
            console.log('User is not authenticated');
          }
    };

        fetchData();
        const interval = setInterval(fetchData, 1000); // Mise à jour toutes les 5 secondes

        return () => clearInterval(interval);
    }, []);
    
    const [visibleCards, setVisibleCards] = useState();
  
    const renderCards = () => {
      const cryptoKeys = Object.keys(prices);
      const visibleCryptoKeys = cryptoKeys.slice(0, visibleCards);
  
      return visibleCryptoKeys.map((key) => {
        const value = prices[key];
        return (
          <div key={key} className="swiper-slide">
            <div className="items-wrapper">
              <div className="market-more-item">
                <div className="logo-container">
                  <div className="logo-wrapper">
                    <img className="logo" src={value.imageUrl} alt="icon" />
                  </div>
                  <div className="text-container">
                    <h3>{key.toUpperCase()}USDT</h3>
                    <span className="network">{value.price} $</span>
                  </div>
                </div>
                <span className="percentage">{value.change24h}%</span>
                <span className="apy">Apy</span>
                <div className="details-container">
                  <div className="detail">
                    <span>TVL</span>
                    <span>${parseFloat(value.marketCap).toFixed(2)} M</span>
                  </div>
                  <div className="detail">
                    <span>Network</span>
                    <span>Binance</span>
                  </div>
                </div>
                <a href="staking-details.html" className="stack-button">
                  Stack
                </a>
              </div>
            </div>
          </div>
        );
      });
    };
  
    return (
      <div className="crypto-prices">
        <h2>Crypto Prices</h2>
          <h2>It is {new Date().toLocaleTimeString()}.</h2>
        <div className="card-container">
          <div className="card-wrapper">{renderCards()}</div>
        </div>
      </div>

    );
  }
  
  export default CryptoPrices;




