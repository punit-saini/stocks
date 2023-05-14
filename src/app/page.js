"use client";
import { useEffect, useState } from 'react';
import StockTable from '../../components/StockTable';
import axios from 'axios';




export default function Home() {


  return (
    <main className="min-h-screen items-center p-24">
      <div className="z-10 w-full">
 
        <h1>Hell, uncle namaste chalo kaam ki baat pe aate hain.</h1>
        
        <StockTable />
      </div>
    </main>
  );
}

