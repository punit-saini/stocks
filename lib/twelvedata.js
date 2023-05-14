const API_KEY = 'sdfsdjk';

export const getStockData = async ({ page = 1, limit = 25 } = {}) => {
  const url = `https://api.twelvedata.com/stocks?exchange=NASDAQ&source=docs&page=${page}&size=${limit}&apikey=${API_KEY}`;
  const response = await fetch(url);
  const { data } = await response.json();
  console.log('data is :', data)
  return data.map((stock) => ({
    symbol: stock.symbol,
    name: stock.name,
    logo_url: stock.logo_url,
    price: stock.close,
    change: stock.change,
    change_percent: stock.percent_change,
    volume: stock.volume,
    market_cap: stock.market_cap,
  }));
};