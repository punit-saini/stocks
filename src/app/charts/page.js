'use client';
// const startDate = new Date();
//       startDate.setDate(startDate.getDate() - 30); // 30 days ago

//       const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${apiKey}&from=${startDate.toISOString().substring(0, 10)}`;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const AmazonChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
     
    const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // 30 days ago
    
    const fetchData = async () => {
      const result = await axios(
        `https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=b59ff3f14f4cdf4e5a66a71d3175be01&from=${startDate.toISOString().substring(0, 10)}`
      );
      setData(result.data.historical.map((item) => ({
        x: new Date(item.date),
        y: [item.open, item.high, item.low, item.close]
      })));
    };
    fetchData();
  }, []);

  return (
    <div className="w-5/6 mx-auto h-96">
      <Chart
        type="candlestick"
        options={{ 
          chart: { id: 'candles' },
          xaxis: { type: 'datetime' }
        }}
        series={[{ data }]}
        height={350}
      />
    </div>
  );
};

export default AmazonChart;
