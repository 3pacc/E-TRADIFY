
//================================================================================================================================
//Using Binance API
//================================================================================================================================

import React, { useState, useEffect } from 'react';
import './style.css'; // Assurez-vous que le chemin vers le fichier CSS est correct

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
                        price: data.price,
                    }
                };
            });

            const results = await Promise.all(requests);
            const updatedPrices = Object.assign({}, ...results);
            setPrices(updatedPrices);
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Mise à jour toutes les 5 secondes

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
import './style.css'; // Assurez-vous que le chemin vers le fichier CSS est correct

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

            // Adapter les clés et les données selon vos besoins
            const additionalData = {
                BTCUSDT: { marketCap: data.bitcoin.usd_market_cap, dailyChange: data.bitcoin.usd_24h_change, volume: data.bitcoin.usd_24h_vol },
                ETHUSDT: { marketCap: data.ethereum.usd_market_cap, dailyChange: data.ethereum.usd_24h_change, volume: data.ethereum.usd_24h_vol },
                // Ajoutez d'autres cryptomonnaies ici
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