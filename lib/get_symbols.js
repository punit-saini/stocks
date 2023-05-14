// Define the API URL
const apiUrl = 'https://financialmodelingprep.com/api/v3/available-traded/list?apikey=9a0f6f050add887edaf50159a25d6ce0';

// Define the US stock exchanges
const usExchanges = ['NYSE', 'NASDAQ', 'AMEX'];

// Filter the US and other stocks by exchange
async function filterStocks() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  const usStocks = data.filter(stock => usExchanges.includes(stock.exchangeShortName));
  const otherStocks = data.filter(stock => !usExchanges.includes(stock.exchangeShortName));

  return {
    usStocks,
    otherStocks
  };
}

// Classify the stock symbols by index
function classifySymbols(symbols) {
  const dowJonesSymbols = symbols.filter(symbol => symbol.startsWith('^DJI'));
  const sp500Symbols = symbols.filter(symbol => symbol.startsWith('^GSPC'));
  const nasdaqSymbols = symbols.filter(symbol => symbol.startsWith('^IXIC'));
  const russell2000Symbols = symbols.filter(symbol => symbol.startsWith('^RUT'));


  return {
    dowJones: dowJonesSymbols,
    sp500: sp500Symbols,
    nasdaq: nasdaqSymbols,
    russell2000: russell2000Symbols,
  };
}

// Write the stock symbols to their corresponding files
async function writeSymbolsToFile() {
  const { usStocks, otherStocks } = await filterStocks();
  
  const usStockSymbols = usStocks.map(stock => stock.symbol);
  const usSymbolsByIndex = classifySymbols(usStockSymbols);
  
  const { dowJones, sp500, nasdaq, russell2000 } = usSymbolsByIndex;

  const writeToFile = async (fileName, data) => {
    const blob = new Blob([JSON.stringify(data)], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  await Promise.all([
    writeToFile('dowJonesSymbols.json', dowJones),
    writeToFile('sp500Symbols.json', sp500),
    writeToFile('nasdaqSymbols.json', nasdaq),
    writeToFile('russell2000Symbols.json', russell2000)
  ]);

}

export default writeSymbolsToFile;

