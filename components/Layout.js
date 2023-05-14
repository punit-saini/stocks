import React, { Suspense } from 'react';
import Head from 'next/head';

// import Navbar from './Navbar';
// import Footer from './Footer';



const Layout = ({ children }) => {

  return (
    
    <div className="layout sm:w-[100%] lg:w-[30%] md:w-[40%] my-auto mx-auto">
      <Head>
        <title>Stocks</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
          <link rel="shortcut icon" href="./favicon.ico" />
      </Head>
      
          
        <header className="bg-[#22292e]">
          {/* <Navbar /> */}
        </header>
        <main className={`main-container min-h-screen `}>
          {children}
        </main>
        {/* <Footer/> */}

    
  
    </div>
  )
}

export default Layout