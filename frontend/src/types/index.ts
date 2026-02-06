export interface Currency {
  id: string;
  name: string;
  code: string;
  symbol: string;
  flag?: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  type: 'fiat' | 'crypto';
}

export interface ChartDataPoint {
  date: string;
  value: number;
  timestamp: number;
}

export interface CandlestickData {
  date: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type TimeRange = '1D' | '7D' | '1M' | '1Y' | 'ALL';

export type ViewMode = 'home' | 'solo' | 'compare';

export interface AppState {
  viewMode: ViewMode;
  soloCurrency: Currency | null;
  fromCurrency: Currency | null;
  toCurrency: Currency | null;
  timeRange: TimeRange;
}
