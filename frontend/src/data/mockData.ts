import { Currency, ChartDataPoint, CandlestickData, TimeRange } from '@/types';

export const fiatCurrencies: Currency[] = [
  {
    id: 'usd',
    name: 'US Dollar',
    code: 'USD',
    symbol: '$',
    flag: '🇺🇸',
    price: 1.00,
    change24h: 0,
    changePercent24h: 0.02,
    volume24h: 6800000000000,
    type: 'fiat'
  },
  {
    id: 'eur',
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
    flag: '🇪🇺',
    price: 1.09,
    change24h: 0.003,
    changePercent24h: 0.28,
    volume24h: 2300000000000,
    type: 'fiat'
  },
  {
    id: 'gbp',
    name: 'British Pound',
    code: 'GBP',
    symbol: '£',
    flag: '🇬🇧',
    price: 1.27,
    change24h: -0.004,
    changePercent24h: -0.31,
    volume24h: 1200000000000,
    type: 'fiat'
  },
  {
    id: 'jpy',
    name: 'Japanese Yen',
    code: 'JPY',
    symbol: '¥',
    flag: '🇯🇵',
    price: 0.0065,
    change24h: 0.00002,
    changePercent24h: 0.31,
    volume24h: 1100000000000,
    type: 'fiat'
  },
  {
    id: 'chf',
    name: 'Swiss Franc',
    code: 'CHF',
    symbol: 'Fr',
    flag: '🇨🇭',
    price: 1.13,
    change24h: 0.005,
    changePercent24h: 0.44,
    volume24h: 340000000000,
    type: 'fiat'
  },
  {
    id: 'cad',
    name: 'Canadian Dollar',
    code: 'CAD',
    symbol: 'C$',
    flag: '🇨🇦',
    price: 0.74,
    change24h: -0.002,
    changePercent24h: -0.27,
    volume24h: 280000000000,
    type: 'fiat'
  },
  {
    id: 'aud',
    name: 'Australian Dollar',
    code: 'AUD',
    symbol: 'A$',
    flag: '🇦🇺',
    price: 0.66,
    change24h: 0.003,
    changePercent24h: 0.46,
    volume24h: 220000000000,
    type: 'fiat'
  },
  {
    id: 'cny',
    name: 'Chinese Yuan',
    code: 'CNY',
    symbol: '¥',
    flag: '🇨🇳',
    price: 0.14,
    change24h: -0.001,
    changePercent24h: -0.71,
    volume24h: 190000000000,
    type: 'fiat'
  },
  {
    id: 'inr',
    name: 'Indian Rupee',
    code: 'INR',
    symbol: '₹',
    flag: '🇮🇳',
    price: 0.012,
    change24h: 0.00003,
    changePercent24h: 0.25,
    volume24h: 85000000000,
    type: 'fiat'
  },
  {
    id: 'krw',
    name: 'South Korean Won',
    code: 'KRW',
    symbol: '₩',
    flag: '🇰🇷',
    price: 0.00075,
    change24h: -0.000002,
    changePercent24h: -0.27,
    volume24h: 65000000000,
    type: 'fiat'
  },
  {
    id: 'sgd',
    name: 'Singapore Dollar',
    code: 'SGD',
    symbol: 'S$',
    flag: '🇸🇬',
    price: 0.75,
    change24h: 0.002,
    changePercent24h: 0.27,
    volume24h: 45000000000,
    type: 'fiat'
  },
  {
    id: 'hkd',
    name: 'Hong Kong Dollar',
    code: 'HKD',
    symbol: 'HK$',
    flag: '🇭🇰',
    price: 0.13,
    change24h: 0.0001,
    changePercent24h: 0.08,
    volume24h: 38000000000,
    type: 'fiat'
  }
];

export const cryptoCurrencies: Currency[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    code: 'BTC',
    symbol: '₿',
    price: 104235.42,
    change24h: 2156.30,
    changePercent24h: 2.11,
    volume24h: 48500000000,
    type: 'crypto'
  },
  {
    id: 'eth',
    name: 'Ethereum',
    code: 'ETH',
    symbol: 'Ξ',
    price: 3892.18,
    change24h: -45.62,
    changePercent24h: -1.16,
    volume24h: 21300000000,
    type: 'crypto'
  },
  {
    id: 'sol',
    name: 'Solana',
    code: 'SOL',
    symbol: '◎',
    price: 178.45,
    change24h: 8.92,
    changePercent24h: 5.26,
    volume24h: 4200000000,
    type: 'crypto'
  },
  {
    id: 'bnb',
    name: 'BNB',
    code: 'BNB',
    symbol: '◆',
    price: 712.33,
    change24h: 15.44,
    changePercent24h: 2.22,
    volume24h: 1800000000,
    type: 'crypto'
  },
  {
    id: 'xrp',
    name: 'Ripple',
    code: 'XRP',
    symbol: '✕',
    price: 2.34,
    change24h: 0.12,
    changePercent24h: 5.41,
    volume24h: 3400000000,
    type: 'crypto'
  },
  {
    id: 'ada',
    name: 'Cardano',
    code: 'ADA',
    symbol: '₳',
    price: 1.08,
    change24h: -0.03,
    changePercent24h: -2.70,
    volume24h: 890000000,
    type: 'crypto'
  },
  {
    id: 'avax',
    name: 'Avalanche',
    code: 'AVAX',
    symbol: '▲',
    price: 42.67,
    change24h: 1.89,
    changePercent24h: 4.63,
    volume24h: 720000000,
    type: 'crypto'
  },
  {
    id: 'dot',
    name: 'Polkadot',
    code: 'DOT',
    symbol: '●',
    price: 8.92,
    change24h: -0.18,
    changePercent24h: -1.98,
    volume24h: 450000000,
    type: 'crypto'
  },
  {
    id: 'link',
    name: 'Chainlink',
    code: 'LINK',
    symbol: '⬡',
    price: 18.45,
    change24h: 0.76,
    changePercent24h: 4.29,
    volume24h: 680000000,
    type: 'crypto'
  },
  {
    id: 'matic',
    name: 'Polygon',
    code: 'MATIC',
    symbol: '⬣',
    price: 0.58,
    change24h: 0.02,
    changePercent24h: 3.57,
    volume24h: 320000000,
    type: 'crypto'
  },
  {
    id: 'doge',
    name: 'Dogecoin',
    code: 'DOGE',
    symbol: 'Ð',
    price: 0.42,
    change24h: 0.015,
    changePercent24h: 3.70,
    volume24h: 2100000000,
    type: 'crypto'
  },
  {
    id: 'shib',
    name: 'Shiba Inu',
    code: 'SHIB',
    symbol: '🐕',
    price: 0.000028,
    change24h: 0.0000008,
    changePercent24h: 2.94,
    volume24h: 890000000,
    type: 'crypto'
  }
];

export const allCurrencies = [...fiatCurrencies, ...cryptoCurrencies];

export const topFiatCurrencies = fiatCurrencies.slice(0, 6);
export const topCryptoCurrencies = cryptoCurrencies.slice(0, 6);

// Generate realistic chart data with trends
export const generateChartData = (
  timeRange: TimeRange,
  baseValue: number = 1,
  isPositive: boolean = true
): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = Date.now();
  
  let points: number;
  let interval: number;
  let volatility: number;
  
  switch (timeRange) {
    case '1D':
      points = 48;
      interval = 30 * 60 * 1000; // 30 minutes
      volatility = 0.003;
      break;
    case '7D':
      points = 42;
      interval = 4 * 60 * 60 * 1000; // 4 hours
      volatility = 0.012;
      break;
    case '1M':
      points = 30;
      interval = 24 * 60 * 60 * 1000; // 1 day
      volatility = 0.025;
      break;
    case '1Y':
      points = 52;
      interval = 7 * 24 * 60 * 60 * 1000; // 1 week
      volatility = 0.06;
      break;
    case 'ALL':
      points = 72;
      interval = 30 * 24 * 60 * 60 * 1000; // 1 month
      volatility = 0.1;
      break;
  }
  
  // Start from a different value to create trend
  let value = baseValue * (isPositive ? 0.88 : 1.12);
  
  for (let i = points; i >= 0; i--) {
    const timestamp = now - i * interval;
    const date = new Date(timestamp);
    
    // Add trend direction with some momentum
    const trendFactor = isPositive ? 0.0015 : -0.0015;
    const randomChange = (Math.random() - 0.5) * 2 * volatility * value;
    const momentum = (Math.random() - 0.4) * volatility * value * 0.3;
    
    value = value + randomChange + (value * trendFactor) + momentum;
    value = Math.max(value, baseValue * 0.3);
    value = Math.min(value, baseValue * 1.7);
    
    let dateStr: string;
    if (timeRange === '1D') {
      dateStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    } else if (timeRange === '7D') {
      dateStr = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
    } else if (timeRange === '1M') {
      dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else if (timeRange === '1Y') {
      dateStr = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    } else {
      dateStr = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    
    data.push({
      date: dateStr,
      value: parseFloat(value.toFixed(10)),
      timestamp
    });
  }
  
  // Ensure last value is close to base value
  if (data.length > 0) {
    data[data.length - 1].value = baseValue;
  }
  
  return data;
};

export const generateComparisonData = (
  from: Currency,
  to: Currency,
  timeRange: TimeRange
): ChartDataPoint[] => {
  const rate = to.price / from.price;
  const combinedChange = to.changePercent24h - from.changePercent24h;
  const isPositive = combinedChange >= 0;
  return generateChartData(timeRange, rate, isPositive);
};

// Generate candlestick data for TradingView-style charts
export const generateCandlestickData = (
  timeRange: TimeRange,
  baseValue: number = 1,
  isPositive: boolean = true
): CandlestickData[] => {
  const data: CandlestickData[] = [];
  const now = Date.now();
  
  let points: number;
  let interval: number;
  let volatility: number;
  
  switch (timeRange) {
    case '1D':
      points = 24;
      interval = 60 * 60 * 1000; // 1 hour
      volatility = 0.008;
      break;
    case '7D':
      points = 28;
      interval = 6 * 60 * 60 * 1000; // 6 hours
      volatility = 0.015;
      break;
    case '1M':
      points = 30;
      interval = 24 * 60 * 60 * 1000; // 1 day
      volatility = 0.025;
      break;
    case '1Y':
      points = 52;
      interval = 7 * 24 * 60 * 60 * 1000; // 1 week
      volatility = 0.06;
      break;
    case 'ALL':
      points = 48;
      interval = 30 * 24 * 60 * 60 * 1000; // 1 month
      volatility = 0.1;
      break;
  }
  
  let currentPrice = baseValue * (isPositive ? 0.85 : 1.15);
  
  for (let i = points; i >= 0; i--) {
    const timestamp = now - i * interval;
    const date = new Date(timestamp);
    
    // Trend direction
    const trendFactor = isPositive ? 0.002 : -0.002;
    
    // Generate OHLC
    const open = currentPrice;
    const randomMove = (Math.random() - 0.5) * 2 * volatility * currentPrice;
    const trendMove = currentPrice * trendFactor;
    const close = currentPrice + randomMove + trendMove;
    
    // High and low based on volatility
    const wickVolatility = volatility * 0.6;
    const high = Math.max(open, close) + Math.random() * wickVolatility * currentPrice;
    const low = Math.min(open, close) - Math.random() * wickVolatility * currentPrice;
    
    // Volume variation
    const volume = 1000000 + Math.random() * 5000000;
    
    currentPrice = close;
    currentPrice = Math.max(currentPrice, baseValue * 0.3);
    currentPrice = Math.min(currentPrice, baseValue * 1.7);
    
    let dateStr: string;
    if (timeRange === '1D') {
      dateStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    } else if (timeRange === '7D') {
      dateStr = date.toLocaleDateString('en-US', { weekday: 'short', hour: '2-digit' });
    } else if (timeRange === '1M') {
      dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else if (timeRange === '1Y') {
      dateStr = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    } else {
      dateStr = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    
    data.push({
      date: dateStr,
      timestamp,
      open: parseFloat(open.toFixed(10)),
      high: parseFloat(high.toFixed(10)),
      low: parseFloat(low.toFixed(10)),
      close: parseFloat(close.toFixed(10)),
      volume: Math.round(volume)
    });
  }
  
  // Ensure last candle closes at base value
  if (data.length > 0) {
    data[data.length - 1].close = baseValue;
  }
  
  return data;
};

export const generateComparisonCandlestick = (
  from: Currency,
  to: Currency,
  timeRange: TimeRange
): CandlestickData[] => {
  const rate = to.price / from.price;
  const combinedChange = to.changePercent24h - from.changePercent24h;
  const isPositive = combinedChange >= 0;
  return generateCandlestickData(timeRange, rate, isPositive);
};
