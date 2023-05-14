

import fs from 'fs';
// Define the API URL
const apiUrl = 'https://financialmodelingprep.com/api/v3/available-traded/list?apikey=7ba7980ee499b9a7fee3ff52c10c0eaf';

// Define the US stock exchanges
    const usExchanges = ['NYSE', 'NASDAQ', 'AMEX'];

        const tophund = ['AAPL', 'MSFT', 'GOOG', 'GOOGL', 'AMZN', 'BRK/A', 'BRK/B', 'NVDA', 'META', 'TSLA', 'JNJ', 'V', 'UNH', 'TSM', 'XOM', 'LLY', 'WMT', 'JPM', 'NVO', 'PG', 'MA', 'MRK', 'CVX', 'HD', 'KO',
        'PEP', 'ORCL', 'AVGO', 'ABBV', 'ASML', 'AZN', 'COST', 'BABA', 'NVS', 'MCD', 'BAC', 'PFE', 'SHEL', 'TMO', 'CRM', 'TM', 'ABT', 'CSCO', 'NKE', 'LIN', 'FMX', 'ACN', 'TMUS', 'CMCSA', 'DIS',
        'DHR', 'VZ', 'NEE', 'AMD', 'ADBE', 'SAP', 'NFLX', 'HSBC', 'PM', 'BHP', 'TTE', 'TXN', 'UPS', 'WFC', 'BMY', 'RTX', 'MS', 'UL', 'SNY', 'RY', 'HON', 'HDB', 'AMGN', 'SBUX', 'T',
        'UNP', 'LOW', 'BUD', 'INTC', 'COP', 'BA', 'INTU', 'MDT', 'SPGI', 'SONY', 'PLD', 'QCOM', 'LMT', 'TD', 'IBM', 'DE', 'AXP', 'ELV', 'SYK', 'CAT', 'GE', 'ISRG', 'GS', 'MDLZ', 'BP'
        ]



// Filter the US and other stocks by exchange
async function filterStocks() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  const usStocks = data.filter(stock => usExchanges.includes(stock.exchangeShortName));
//   const usStocks = partiallyFiltered.filter(stock => tophun.includes(stock.symbol) )

  return {
    usStocks,
  };
}



// Write the stock symbols to their corresponding files
async function writeSymbolsToFile() {
  const { usStocks } = await filterStocks();
  const partialFilter = usStocks.filter(stock=> tophund.includes(stock.symbol))
  const finalFilter = partialFilter.map(stock => stock.symbol)
  const usStockSymbols = [ ...tophund, ...finalFilter ]
  fs.writeFileSync('usStockSymbols.js', `module.exports = ${JSON.stringify(usStockSymbols)};`);
}




async function main() {
  try {
    await writeSymbolsToFile();
    console.log('Stock symbols saved to file');
  } catch (error) {
    console.error(error);
  }
}
// main();
