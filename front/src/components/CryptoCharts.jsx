import React, { /*useEffect,*/ useRef } from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import './CryptoCharts.css'; 
function CryptoCharts() {
  const containerRef = useRef(null);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
  //   script.async = true;
  //   script.innerHTML = JSON.stringify({
  //     interval: '1m',
  //     width: 425,
  //     isTransparent: false,
  //     height: 450,
  //     symbol: 'BINANCE:BTCUSDT',
  //     showIntervalTabs: true,
  //     displayMode: 'single',
  //     locale: 'en',
  //     colorTheme: 'light',
  //     backgroundColor:'rgb(214, 230, 238)'
  //   });

  //   containerRef.current.appendChild(script);

  //   return () => {
  //     containerRef.current.removeChild(script);
  //   };
  // }, []);

    return (
      <div className='crypto-charts-container' ref={containerRef} >
      <div className='crypto-charts'>
        <h2>Bitcoin Chart</h2>
        <TradingViewWidget
          symbol="BINANCE:BTCUSDT"
          width="100%"
          height="400"
          locale="en"
          dateRange="12M"
          colorTheme="dark"
        />
        {/* <div className="tradingview-widget-container">
          <div ref={containerRef} className="tradingview-widget-container__widget"></div>
          <div className="tradingview-widget-copyright">
            <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
            </a>
          </div>
        </div> */}
        <h2>Ethereum Chart</h2>
        <TradingViewWidget
          symbol="BINANCE:ETHUSDT"
          width="100%"
          height="400"
          locale="en"
          dateRange="6M"
          colorTheme="light"
        />
  
        <h2>Ripple Chart</h2>
        <TradingViewWidget
          symbol="BINANCE:XRPUSDT"
          width="100%"
          height="400"
          locale="en"
          dateRange="3M"
          colorTheme="dark"
        />
        <h2>Cardano Chart</h2>
        <TradingViewWidget
          symbol="BINANCE:ADAUSDT"
          width="100%"
          height="400"
          locale="en"
          dateRange="3M"
          colorTheme="dark"
        />
        <h2>Solana Chart</h2>
        <TradingViewWidget
          symbol="BINANCE:SOLUSDT"
          width="100%"
          height="400"
          locale="en"
          dateRange="3M"
          colorTheme="dark"
        />
        <h2>BNB Chart</h2>
        <TradingViewWidget
          symbol="BINANCE:BNBUSDT"
          width="100%"
          height="400"
          locale="en"
          dateRange="3M"
          colorTheme="dark"
        />
        <h2>Bitcoin cash Chart</h2>
        <TradingViewWidget
          symbol="BINANCE:BCHUSDT"
          width="100%"
          height="400"
          locale="en"
          dateRange="3M"
          colorTheme="dark"
        />
        <h2>Tron 'TRX' Chart</h2>
        <TradingViewWidget
          symbol="BINANCE:TRXUSDT"
          width="100%"
          height="400"
          locale="en"
          dateRange="3M"
          colorTheme="dark"
        />
        </div>
      </div>
    );
  }
  
  export default CryptoCharts;