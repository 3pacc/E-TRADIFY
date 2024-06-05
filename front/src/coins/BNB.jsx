import React, { useEffect, useRef } from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import ChartWidget from '../components/ChartWidget'
import './coin.css'

function BNB() {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: '1m',
      width: 425,
      isTransparent: false,
      height: 450,
      symbol: 'BINANCE:BNBUSDT',
      showIntervalTabs: true,
      displayMode: 'single',
      locale: 'en',
      colorTheme: 'dark',
    });

    containerRef.current.appendChild(script);

    return () => {
      containerRef.current.removeChild(script);
    };
  }, []);

    return (
        <div className="coin-container">
            <h2>BNB Chart</h2>
            <div className='coin'>
            {/* <TradingViewWidget  
            symbol="BINANCE:BNBUSDT"
            width="100%"
            height="400"
            locale="en"
            dateRange="12M"
            colorTheme="dark"
            /> */} 
                <ChartWidget symbol="BINANCE:BNBUSDT"/>
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
                  <span> Predicted price for the next day:  <b>622.57</b></span> 
                  <span className='decision'>Decision: Sell</span>
            </div>
        </div>
        
    );
  }
  
  export default BNB;