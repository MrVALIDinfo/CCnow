import { useMemo, useState } from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { Currency, TimeRange } from '@/types';
import { generateCandlestickData } from '@/data/mockData';
import { CandlestickChart } from './CandlestickChart';
import { cn } from '@/utils/cn';

interface SoloViewProps {
  currency: Currency;
  onClose: () => void;
}

const timeRanges: TimeRange[] = ['1D', '7D', '1M', '1Y', 'ALL'];

export function SoloView({ currency, onClose }: SoloViewProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');

  const chartData = useMemo(() => {
    return generateCandlestickData(timeRange, currency.price, currency.changePercent24h >= 0);
  }, [currency, timeRange]);

  const isPositive = useMemo(() => {
    if (chartData.length < 2) return true;
    return chartData[chartData.length - 1].close >= chartData[0].open;
  }, [chartData]);

  const percentChange = useMemo(() => {
    if (chartData.length < 2) return 0;
    const first = chartData[0].open;
    const last = chartData[chartData.length - 1].close;
    return ((last - first) / first) * 100;
  }, [chartData]);

  const formatValue = (value: number) => {
    if (value >= 10000) return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    if (value >= 100) return `$${value.toFixed(2)}`;
    if (value >= 1) return `$${value.toFixed(4)}`;
    if (value >= 0.0001) return `$${value.toFixed(6)}`;
    return `$${value.toFixed(8)}`;
  };

  const formatPrice = (price: number) => {
    if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    if (price >= 1) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(8)}`;
  };

  const getCurrencyIcon = () => {
    if (currency.type === 'fiat') {
      return currency.flag || currency.symbol;
    }
    return currency.symbol;
  };

  // Calculate stats
  const high = Math.max(...chartData.map(d => d.high));
  const low = Math.min(...chartData.map(d => d.low));
  const avgClose = chartData.reduce((sum, d) => sum + d.close, 0) / chartData.length;
  const totalVolume = chartData.reduce((sum, d) => sum + d.volume, 0);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl text-3xl",
            currency.type === 'crypto'
              ? "bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-violet-300"
              : "bg-gradient-to-br from-emerald-500/20 to-cyan-500/20"
          )}>
            {getCurrencyIcon()}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">{currency.name}</h2>
              <span className={cn(
                "text-xs font-medium px-2.5 py-1 rounded-full uppercase",
                currency.type === 'crypto'
                  ? "bg-violet-500/20 text-violet-400"
                  : "bg-emerald-500/20 text-emerald-400"
              )}>
                {currency.type}
              </span>
            </div>
            <p className="text-slate-400">{currency.code}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Price and Change */}
      <div className="flex flex-wrap items-end gap-4 mb-8">
        <div>
          <p className="text-sm text-slate-500 mb-1">Current Price</p>
          <p className="text-4xl font-bold text-white tabular-nums">
            {formatPrice(currency.price)}
          </p>
        </div>
        <div className={cn(
          "flex items-center gap-2 rounded-xl px-4 py-2",
          isPositive ? "bg-emerald-500/10" : "bg-rose-500/10"
        )}>
          {isPositive ? (
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          ) : (
            <TrendingDown className="h-5 w-5 text-rose-400" />
          )}
          <span className={cn(
            "text-lg font-bold tabular-nums",
            isPositive ? "text-emerald-400" : "text-rose-400"
          )}>
            {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
          </span>
          <span className="text-sm text-slate-500">
            ({timeRange})
          </span>
        </div>
      </div>

      {/* Chart Card */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 overflow-hidden">
        {/* Chart Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white">Price Chart</h3>
            <span className="px-2 py-1 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-medium">
              Candlestick
            </span>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-1 p-1 rounded-xl bg-slate-800/70">
            {timeRanges.map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200",
                  timeRange === range
                    ? "bg-violet-500 text-white shadow-lg shadow-violet-500/25"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="p-4 sm:p-6">
          <div className="h-[350px] sm:h-[400px]">
            <CandlestickChart data={chartData} formatValue={formatValue} />
          </div>

          {/* OHLC Stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl bg-slate-800/50 p-4">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Open</p>
              <p className="text-lg font-bold text-white tabular-nums">
                {formatValue(chartData[0]?.open || 0)}
              </p>
            </div>
            <div className="rounded-xl bg-slate-800/50 p-4">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Close</p>
              <p className={cn(
                "text-lg font-bold tabular-nums",
                isPositive ? "text-emerald-400" : "text-rose-400"
              )}>
                {formatValue(chartData[chartData.length - 1]?.close || 0)}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-4">
              <p className="text-xs text-emerald-400/70 mb-1 uppercase tracking-wider">High</p>
              <p className="text-lg font-bold text-emerald-400 tabular-nums">
                {formatValue(high)}
              </p>
            </div>
            <div className="rounded-xl bg-rose-500/10 p-4">
              <p className="text-xs text-rose-400/70 mb-1 uppercase tracking-wider">Low</p>
              <p className="text-lg font-bold text-rose-400 tabular-nums">
                {formatValue(low)}
              </p>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-800/30 p-4">
              <p className="text-xs text-slate-500 mb-1">Avg Close</p>
              <p className="text-sm font-semibold text-white tabular-nums">{formatValue(avgClose)}</p>
            </div>
            <div className="rounded-xl bg-slate-800/30 p-4">
              <p className="text-xs text-slate-500 mb-1">Period Volume</p>
              <p className="text-sm font-semibold text-white tabular-nums">
                {totalVolume >= 1e9 
                  ? `$${(totalVolume / 1e9).toFixed(2)}B`
                  : totalVolume >= 1e6 
                    ? `$${(totalVolume / 1e6).toFixed(0)}M`
                    : `$${totalVolume.toLocaleString()}`
                }
              </p>
            </div>
            <div className="rounded-xl bg-slate-800/30 p-4">
              <p className="text-xs text-slate-500 mb-1">24h Change</p>
              <p className={cn(
                "text-sm font-semibold tabular-nums",
                currency.changePercent24h >= 0 ? "text-emerald-400" : "text-rose-400"
              )}>
                {currency.changePercent24h >= 0 ? '+' : ''}{currency.changePercent24h.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
