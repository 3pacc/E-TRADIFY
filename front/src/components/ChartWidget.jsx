import React, { useEffect, useRef } from 'react';

const TradingViewWidget = ({ symbol }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: `${symbol}`, // Use the symbol prop here
      width: 350,
      height: 220,
      locale: 'en',
      dateRange: '12M',
      colorTheme: 'dark',
      isTransparent: false,
      autosize: false,
      largeChartUrl: '',
    });

    containerRef.current.appendChild(script);

    return () => {
      containerRef.current.removeChild(script);
    };
  }, [symbol]); // Add symbol to the dependency array

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" ref={containerRef}></div>
      <div className="tradingview-widget-copyright">
        {/* <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
        </a> */}
      </div>
    </div>
  );
};

export default TradingViewWidget;