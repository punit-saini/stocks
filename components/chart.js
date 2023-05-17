import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const ChartSyntax = ({ content, modalIsOpen, setModalIsOpen }) => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [data, setData] = useState([]);
  const { symbol, name, percent_change, volume, market_cap, description, industry, price, logo } = content;

  useEffect(() => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const fetchData = async () => {
      const result = await axios(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${API_KEY}&from=${startDate.toISOString().substring(0, 10)}`
      );
      setData(
        result.data.historical.map((item) => ({
          x: new Date(item.date),
          y: [item.open, item.high, item.low, item.close],
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <>
      <img
        onClick={(e) => {
          setModalIsOpen(false);
        }}
        style={{ width: 40, height: 40, position: 'absolute', right: '24px', cursor: 'pointer' }}
        src={'https://img.icons8.com/fluency-systems-regular/48/multiply.png'}
        alt="Close Icon"
      />

      <div style={{ overflowX: 'auto' }}>
        <div className="p-12 w-5/6 mx-auto mt-20">
          <div className="p-12 w-5/6 mx-auto mt-20">
            <div
              style={{ display: 'flex', marginTop: 40, marginBottom: 20, gap: '80px', width: '100%' }}
              className="data-container"
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    style={{ width: 110, padding: 10, backgroundColor: '#faffff' }}
                    className="w-40 h-10"
                    src={logo}
                    alt="Company Logo"
                  />
                  <p style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', marginTop: 6 }}>
                    {symbol}:US
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h1 style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>{name}</h1>
                <p style={{ fontSize: 18, margin: '10px 0 0 0' }}>{industry}</p>
                <p style={{ fontSize: 16, margin: '10px 0 0 0' }}>
                  <strong>Volume:</strong> {volume}
                </p>
                <p style={{ fontSize: 16, margin: '10px 0 0 0' }}>
                  <strong>Market Cap:</strong> {market_cap}
                </p>
              </div>
              <div
                className="price-container"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'left' }}
              >
                <h1
                  style={{ fontSize: 24, fontWeight: 'bold', color: percent_change >= 0 ? 'green' : 'red', margin: 0 }}
                >
                  {price}
                </h1>
                <h1
                  style={{ fontSize: 24, fontWeight: 'bold', color: percent_change >= 0 ? 'green' : 'red', margin: 0 }}
                >
                  {percent_change}%
                </h1>
              </div>
            </div>
            <hr style={{ borderTop: '1px solid #eaeaea' }} />
          </div>

          <div className="w-11/12 mx-auto">
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
        </div>
      </div>
    </>
  );
};

export default ChartSyntax;
