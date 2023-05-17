"use client";
import React, { useState, useEffect, Fragment, useRef } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import usStockSymbols from '../usStockSymbols';
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components';
import Modal from 'react-modal';
import ChartSyntax from './chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


const StockTable = () => {

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const [outputData, setOutputData] = useState([]);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [gainerData, setGainerData] = useState([])
  const [loserData, setLosserData] = useState([])
  const [defaultData, setDefaultData]=useState([])
  const [filterChangeLoader, setFilterChangeLoader]= useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const promises = usStockSymbols.slice((page - 1) * 10, page * 10).map(async (stock) => {
        const dataURL = `https://financialmodelingprep.com/api/v3/profile/${stock}?apikey=${API_KEY}`;
        const response = await axios.get(dataURL);
        const companyData = response.data[0];

        if (companyData) {
          const formattedData = {
            symbol: stock,
            logo: companyData?.image,
            market_cap: companyData?.mktCap,
            price: companyData?.price,
            volume: companyData?.volAvg,
            name: companyData?.companyName,
            percent_change: companyData?.changes,
          };
          return formattedData;
        } else {
          return null;
        }
      });

      const results = await Promise.all(promises);
      const filteredResults = results.filter((item) => item !== null);
      setPage(page + 1);
      setDefaultData([...filteredResults])
      setOutputData([...outputData, ...filteredResults]);
      setIsLoading(false)
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    if(defaultData.length>=1){
      setPage(1)
      setOutputData[defaultData]
      console.log('default data is already present')
    }
    setIsLoading(true)
    const promises = usStockSymbols.slice((page - 1) * 10, page * 10).map(async (stock) => {
      const dataURL = `https://financialmodelingprep.com/api/v3/profile/${stock}?apikey=${API_KEY}`;
      const response = await axios.get(dataURL);
      const companyData = response.data[0];

      if (companyData) {
        const formattedData = {
          symbol: stock,
          logo: companyData?.image,
          market_cap: companyData?.mktCap,
          price: companyData?.price,
          volume: companyData?.volAvg,
          name: companyData?.companyName,
          percent_change: companyData?.changes,
          description: companyData?.description,
          industry: companyData?.industry,
        };
        return formattedData;
      } else {
        return null;
      }
    });


    const results = await Promise.all(promises);
    const filteredResults = results.filter((item) => item !== null);
    setPage(page + 1);
    page==1 ? setOutputData([...filteredResults]) : setOutputData([...outputData, ...filteredResults]);
    setIsLoading(false)
  };

  // Gainers 


async function gainer(){
      
  setFilterChangeLoader(true)
      if(gainerData.length>=1){
        console.log('gainer data is already present')
        setOutputData(gainerData)
        setPage(1)
        setFilterChangeLoader(false)
        return;
      }
      setIsLoading(true)
      const symbolFetcher = `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${API_KEY}`
      const response = await axios.get(symbolFetcher)
        //    console.log('initial response is : ', response.data)
        // const stockSymbols =   response.data.map((stock)=> stock.symbol)
        const promises = response.data.slice(0,30).map(async (stock) => {
          const dataURL = `https://financialmodelingprep.com/api/v3/profile/${stock.symbol}?apikey=${API_KEY}`;
          const response = await axios.get(dataURL);
          const companyData = response.data[0];
    
          if (companyData) {
            const formattedData = {
              symbol: stock.symbol,
              logo: companyData?.image,
              market_cap: companyData?.mktCap,
              price: stock?.price,
              volume: companyData?.volAvg,
              name: companyData?.companyName,
              percent_change: stock?.changesPercentage,
              description: companyData?.description,
              industry: companyData?.industry,
            };
            return formattedData;
          } else {
            return null;
          }
        });
        const results = await Promise.all(promises);
        const filteredResults = results.filter((item) => item !== null);
        setGainerData([...filteredResults])
        setOutputData([...filteredResults]);
        setPage(1)
        setIsLoading(false)
        setFilterChangeLoader(false)
    }


async function loser(){
  setFilterChangeLoader(true)
    
      if(loserData.length>=1){
        console.log('loser data is already present')
        setOutputData(loserData)  
         setFilterChangeLoader(false)
       setPage(1)
        return;
      }
      setIsLoading(true)
      
      const symbolFetcher = `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${API_KEY}`
      const response = await axios.get(symbolFetcher)
           console.log('initial response is : ', response.data)
        // const stockSymbols =   response.data.map((stock)=> stock.symbol)
        // console.log(stockSymbols, 'is final stock data')
        const promises = response.data.slice(0,30).map(async (stock) => {
          const dataURL = `https://financialmodelingprep.com/api/v3/profile/${stock.symbol}?apikey=${API_KEY}`;
          const response = await axios.get(dataURL);
          const companyData = response.data[0];
    
          if (companyData) {
            const formattedData = {
              symbol: stock.symbol,
              logo: companyData?.image,
              market_cap: companyData?.mktCap,
              price: stock.price,
              volume: companyData?.volAvg,
              name: companyData?.companyName, 
              percent_change: stock?.changesPercentage,
              description: companyData?.description,
              industry: companyData?.industry,
            };
            return formattedData;
          } else {
            return null;
          }
        });
        const results = await Promise.all(promises);
        const filteredResults = results.filter((item) => item !== null);
        setLosserData([...filteredResults])
        setOutputData([...filteredResults]);
        setPage(1)
        setIsLoading(false)
        setFilterChangeLoader(false)
    }
  

  const formatMarketCap = (value) => {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    let suffixIndex = 0;

    while (value >= 1000 && suffixIndex < suffixes.length - 1) {
      value /= 1000;
      suffixIndex++;
    }

    return `${value.toFixed(1)} ${suffixes[suffixIndex]}`;
  };

  const formatPercentChange = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const formatPriceColor = (value) => {
    return value >= 0 ? 'green'
    : 'red';
};
const formatPercentChangeColor = (value) => {
  return value >= 0 ? 'green' : 'red';
  };
  
  const getArrowIcon = (value) => {
  return value >= 0 ? faArrowUp : faArrowDown;
  };

  const formatVolume = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleModalOpen = (rowData) => {
    setModalData({
      symbol: rowData.symbol,
      name: rowData.name,
      percent_change: rowData.percent_change,
      volume: rowData.volume,
      market_cap: rowData.market_cap,
      logo: rowData.logo,
      price: rowData.price,
      industry: rowData.industry,
      description: rowData.description,
    });
    setModalIsOpen(true);
  };
  

  const columns = [
  {
  name: 'Logo',
  selector: (row) => (
  <img
  onClick={() => {
   handleModalOpen(row)
  }}
  src={row.logo +`?apiKey=${API_KEY}`}
  style={{ width: '60px', padding: '10px', backgroundColor : 'rgba(19, 18, 18, 0.8)' , boxShadow : '2px 15px 10px rgb(226, 232, 240)', margin : '4px', cursor : 'pointer' }} 
  alt={row.symbol}
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop in case fallback image fails to load
    e.target.src = 'https://img.icons8.com/color/48/error--v1.png'; // Set the fallback image URL here
  }}
  />
  ),
  wrap: true,
  },
    {
      name: 'Symbol',
      selector: (row) => (
        <span style={{cursor : 'pointer'}} onClick={() => handleModalOpen(row)}>
          {row.symbol}
        </span>
      ),
     
    },
    {
      name: 'Name',
      selector: (row) => (
        <span style={{cursor : 'pointer'}} onClick={() => handleModalOpen(row)}>
          {row.name}
        </span>
      ),
      
    },
    
  {
    name: 'Volume',
    selector: (row) => formatVolume(row.volume),
  },
  {
  name: 'Market Cap',
  selector: (row) => formatMarketCap(row.market_cap),
  },
  {
  name: 'Percent Change',
  selector: (row) => (
  <span style={{ color: formatPercentChangeColor(row.percent_change) }}>
  {formatPercentChange(row.percent_change)}%
  <FontAwesomeIcon
  icon={getArrowIcon(row.percent_change)}
  style={{ marginLeft: '5px' }}
  />
  </span>
  ),
  },
  {
  name: 'Price',
  selector: (row) => (
  <span style={{ color: 'voilet', fontWeight : 'bold' }}>{row.price} $</span>
  ),
  },
  ];

  const [filterOption, setFilterOption] = useState('default')
  const handleFilterOptionChange = (e)=>{
    setFilterOption(e.target.value)
    if(e.target.value == 'gainers'){
       gainer()
       console.log('gainer')
    }
    else if(e.target.value == 'losers'){
      loser()
      console.log('loser')
    }
    else {
      handleClick()
      console.log('default');
    }
  }
  
  
  return (
  <>
  <div className="container mx-auto my-8">
  <div className="shadow-2xl">
    <div style={{ display : 'flex'}}>
        <select style={{ cursor : 'pointer'}} onChange={handleFilterOptionChange}>
          <option value="default">Default</option>
          <option value="gainers">Top Gainers</option>
          <option value="losers">Top Losers</option>
        </select>
   { filterChangeLoader && <img style={{  textAlign : 'center', width : '40px'}} src='loading.svg' />}

    </div>
      
  <DataTable
  columns={columns}
  data={outputData}
  highlightOnHover
  fixedHeaderScrollHeight="490px"
  fixedHeader={modalIsOpen ? false : true}
  />
  </div>

  
  {filterOption === 'default' ? (
  isLoading ? (
    <img
      style={{
        width: '35px',
        textAlign: 'center',
        margin: '10px auto 0 auto',
      }}
      src="loading.svg"
    />
  ) : (
    <p
      onClick={handleClick}
      style={{
        textAlign: 'center',
        cursor: 'pointer',
        color: '#fff',
        fontWeight: 'bold',
        padding: '10px 20px',
        border: '1px solid #ccc',
        backgroundColor: '#000',
        borderRadius: '5px',
        width: 'fit-content',
        margin: '10px auto 0 auto',
        ':hover': {
          background: '#000',
          color: '#fff',
          display: 'flex',
        },
      }}
    >
      Load More
    </p>
  )
) : (
  <div></div>
)}




   <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
    >
      {modalIsOpen && (
        <ChartSyntax
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          content={modalData}
        />
      )}
    </Modal>
  </div>
</>
);
};

export default StockTable;
