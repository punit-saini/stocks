"use client";
import React, { useState, useEffect, Fragment, useRef } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import usStockSymbols from '../usStockSymbols';
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components';


const StockTable = () => {

  // const [index, setIndex]=useState('sp500_constituent')
  const [outputData, setOutputData] = useState([])
  const [nextURL, setNextURL] = useState()
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  
  
  // useEffect(() => {
  //     console.log('data is : :::::::::: ', usStockSymbols.length)
  //   const promises = usStockSymbols.slice((page-1)*10,page*10).map(async (stock) => { // add async keyword
  //     const dataURL = `https://financialmodelingprep.com/api/v3/profile/${stock}?apikey=7ba7980ee499b9a7fee3ff52c10c0eaf`
  //     return axios.get(dataURL).then(response => { // return the promise here
  //       console.log('response main is : ', response.data[0])
  //       return {
  //         symbol: stock,
  //         logo : response.data[0]?.image,
  //         market_cap : response.data[0]?.mktCap,
  //         price : response.data[0]?.price,
  //         volume : response.data[0]?.volAvg,
  //         name : response.data[0]?.companyName,
  //         percent_change : `${response.data[0].changes}`
  //       };
  //     });
  //   });
  //   Promise.all(promises).then((results) => {
  //     console.log('results is : ', results)
  //     setPage(page+1)
  //     setOutputData([...outputData, ...results.filter(item => item.name !== undefined)]);
  //   });
  // }, []);
  


  const handleClick = ()=> {
    
    const promises = usStockSymbols.slice((page-1)*10,page*10).map(async (stock) => { // add async keyword
      const dataURL = `https://financialmodelingprep.com/api/v3/profile/${stock}?apikey=7ba7980ee499b9a7fee3ff52c10c0eaf`
      return axios.get(dataURL).then(response => { // return the promise here
        console.log('response main is : ', response.data[0])
        return {
          symbol: stock,
          logo : response.data[0]?.image,
          market_cap : response.data[0]?.mktCap,
          price : response.data[0]?.price,
          volume : response.data[0]?.volAvg,
          name : response.data[0]?.companyName,
          percent_change : `${response.data[0].changes}`
        };
      });
    });
    Promise.all(promises).then((results) => {
      console.log('results is : ', results)
      setPage(page+1)
      setOutputData([...outputData, ...results.filter(item => item.name !== undefined)]);
    });
    
  }


  const columns = [
    {
        name : 'Logo',
        selector : row => < img onClick={()=> (setOpen(true))} src={row.logo+`?apiKey=7ba7980ee499b9a7fee3ff52c10c0eaf`} />,
    },
    {
       name : 'Symbol',
       selector : row => row.symbol,
       sortable: true,
    },
    {
       name : 'Name',
       selector : row => row.name,
       sortable : true,
    },
    {
       name : 'volume',
       selector : row => row.volume
    },
    {
       name : 'Market Cap',
       selector : row => row.market_cap
    },
    {
       name : 'Percent Change',
       selector : row => row.percent_change
    },
    {
       name : 'Price',
       selector : row => row.price
    },

   
]

  return (

    <>

    <div className="container mx-auto my-8">
      
        <>
          <DataTable
            columns={columns}
            data={outputData}
            fixedHeader
            fixedHeaderScrollHeight='400px'
          />
        </> 
       <p onClick={handleClick}>Load More</p>
    </div>




  {/* ID */}


  <Transition.Root show={open} as={Fragment}>
  <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    </Transition.Child>

    <div className="fixed inset-0 rounded-lg sm:max-w-5/6 z-50  bg-black overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    

                    

              

             

          </div>
        </div>
      </Dialog>
    </Transition.Root>



 </>



  );
};

export default StockTable;
