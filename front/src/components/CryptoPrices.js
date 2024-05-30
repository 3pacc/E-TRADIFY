
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
    const [globalMarketCap, setGlobalMarketCap] = useState(null);
    const [globalMarketCapChange, setGlobalMarketCapChange] = useState(null);
    const [tradingVolume24h, setTradingVolume24h] = useState(null);
    const [trendingCoins, setTrendingCoins] = useState([]);
    const [largestGainers, setLargestGainers] = useState([]);

    useEffect(() => {
        

        const fetchData = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage or sessionStorage

        if (token) {
        // Make API requests with the token in the headers
            // const headers = { Authorization: `Bearer ${token}` };
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
                const response = await fetch(endpoint + queries[key]);
                const data = await response.json();
                const response24h = await fetch(endpoint + '/api/v3/ticker/24hr?symbol=' + key.toUpperCase() + 'USDT');
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
            await fetchMarketData();
        } else {
            console.log('User is not authenticated');
          }
    };

        fetchData();
        const interval = setInterval(fetchData, 30000); // Mise à jour toutes les 1 secondes

        return () => {
            clearInterval(interval);
          };
    }, [prices]);
    
    const [visibleCards] = useState();

    const fetchMarketData = async () => {
        try {
          const response = await fetch(' https://api.coingecko.com/api/v3/global');
          const data = await response.json();

          setGlobalMarketCap(data.data.total_market_cap.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
          setGlobalMarketCapChange(data.data.market_cap_change_percentage_24h_usd.toFixed(2));
          setTradingVolume24h(data.data.total_volume.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));

      
          const trendingResponse = await fetch(' https://api.coingecko.com/api/v3/search/trending');
          const trendingData = await trendingResponse.json();
          const trendingCoinsData = trendingData.coins.map((coin) => ({
            name: coin.item.name,
            price: coin.item.price_btc.toFixed(8),
            change: coin.item.score.toFixed(2),
          }));

        setTrendingCoins(trendingCoinsData.slice(0, 3));
      
          const gainersResponse = await fetch(` https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&price_change_percentage=24h`);          const gainersData = await gainersResponse.json();
          const largestGainersData = gainersData
            .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
            .slice(0, 3)
            .map((coin) => ({
              name: coin.name,
              price: coin.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
              change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
            }));
           
            setLargestGainers(largestGainersData);
              
        } catch (error) {
          console.error('Error fetching market data:', error);
        }
      };
  
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
                    <span className="network">{parseFloat(value.price).toFixed(3)} $</span>
                  </div>
                </div>
                <span className="percentage">{value.change24h}%</span>
                <span className="apy">Apy</span>
                <div className="details-container">
                  <div className="detail">
                    <span>TVL</span>
                    <span>${parseFloat(value.volume24h).toFixed(2)} M</span>
                  </div>
                  <div className="detail">
                    <span>Network</span>
                    <span>Binance</span>
                  </div>
                </div>
                <a href="staking-details.html" className="stack-button">
                  Predict
                </a>
              </div>
            </div>
          </div>
          
        );
      });
    };
  
    return (
        
      <div className="crypto-prices">
        {/* New section for market cap and trending coins */}
        
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
            {/* Market cap section */}
        <div className="market-cap-section">
        <h2>Cryptocurrency Prices by Market Cap</h2>
        <p>The global cryptocurrency market cap today is <b>{globalMarketCap}</b>, 
         a <b>{globalMarketCapChange}% </b>change in the last 24 hours.</p>
        <div className="market-cap-container">
            <div className="market-cap-value">
            <span>{globalMarketCap}</span>
            <span>Market Cap {globalMarketCapChange}%</span>
            </div>
            <div className="trading-volume">
            <span>{tradingVolume24h}</span>
            <span>24h Trading Volume</span>
            </div>
        </div>

        {/* Trending coins */}
        <div className="trending-section">
            <div className="trending-container">
            <h3>Trending</h3>
            <div className="trending-coins">
                {trendingCoins.map((coin, index) => (
                <div key={index} className="trending-coin">
                    <span>{coin.name}</span>
                    <span>{coin.price}</span>
                    <span>{coin.change}</span>
                </div>
                ))}
            </div>
            <span className="view-more">View more &gt;</span>
            </div>

            {/* Largest gainers */}
            <div className="gainers-container">
            <h3>Largest Gainers</h3>
            <div className="gainers-coins">
                {largestGainers.map((coin, index) => (
                <div key={index} className="gainer-coin">
                    <span>{coin.name}</span>
                    <span>{coin.price}</span>
                    <span>{coin.change}</span>
                </div>
                ))}
            </div>
            <span className="view-more">View more &gt;</span>
            </div>
        </div>
        </div>
        <h2>Crypto Prices</h2>
        <div className="card-container">
          <div className="card-wrapper">{renderCards()}</div>
        </div>
        {/* New section for the table */}
      <div className="table-section">
        <h2>Table of available coins</h2>
        <div className="table-container">
          <div className="table-header">
            <div>Rankings</div>
            <div>Blockchain</div>
            <div>Token Price</div>
            <div>24H Volume</div>
            <div>Market Cap</div>
            <div>TVL</div>
          </div>
          <div className="table-body">
            {Object.entries(prices).map(([key, value], index) => (
              <div className="table-row" key={key}>
                <div>{index + 1}</div>
                <div>
                  <img src={value.imageUrl} alt={key.toUpperCase()} style={{ width: '20px', marginRight: '10px', verticalAlign: 'middle' }} />
                  {key.toUpperCase()}
                </div>
                <div>${parseFloat(value.price).toFixed(2)}</div>
                <div>${parseFloat(value.volume24h).toLocaleString()}</div>
                <div>${parseFloat(value.marketCap).toLocaleString()}</div>
                <div>-</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
        <coingecko-coin-compare-chart-widget  coin-ids="bitcoin,ethereum,eos,ripple,litecoin" currency="usd" locale="en"></coingecko-coin-compare-chart-widget>
      </div>
    
    );
  }
  
  export default CryptoPrices;




