import React, { useEffect, useRef, useState } from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import './coin.css'

import ChartWidget from '../components/ChartWidget'
function BTC() {
  const containerRef = useRef(null);
  const [scriptElement, setScriptElement] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: '1m',
      width: 425,
      isTransparent: false,
      height: 450,
      symbol: 'BINANCE:BTCUSDT',
      showIntervalTabs: true,
      displayMode: 'single',
      locale: 'en',
      colorTheme: 'dark',
      backgroundColor:'rgb(5, 18, 56)'
    });

    containerRef.current.appendChild(script);
    setScriptElement(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(scriptElement);
      }
    };
  }, []);

    return (
      <div className="coin-container">
            <h2>Bitcoin Chart</h2>
            <div className='coin'>
            {/* <TradingViewWidget  
            symbol="BINANCE:BNBUSDT"
            width="100%"
            height="400"
            locale="en"
            dateRange="12M"
            colorTheme="dark"
            /> */} 
                <ChartWidget symbol="BINANCE:BTCUSDT"/>
                <div className="tradingview-widget-container">
                <div ref={containerRef} className="tradingview-widget-container__widget"></div>
                <div className="tradingview-widget-copyright">
                    <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    </a>
                </div>
                </div>
               
            </div>
            <div className='pred'>
                  <h3>By the analysis made with the machine learning module</h3>
                  <span> the Predicted price for the next day: <b>57274.51</b></span> 
                  <span className='decision'>Decision: Sell</span>
            </div>
        </div>
    );
  }
  
  export default BTC;