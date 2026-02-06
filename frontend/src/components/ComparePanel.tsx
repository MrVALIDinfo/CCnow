import { useMemo, useState } from 'react';
import { ArrowLeftRight, TrendingUp, TrendingDown, X } from 'lucide-react';
import { Currency, TimeRange } from '@/types';
import { generateComparisonCandlestick } from '@/data/mockData';
import { CurrencySelector } from './CurrencySelector';
import { CandlestickChart } from './CandlestickChart';
import { cn } from '@/utils/cn';

interface ComparePanelProps {
  fromCurrency: Currency | null;
  toCurrency: Currency | null;
  onFromChange: (currency: Currency | null) => void;
  onToChange: (currency: Currency | null) => void;
  onClose: () => void;
}

const timeRanges: TimeRange[] = ['1D', '7D', '1M', '1Y', 'ALL'];

export function ComparePanel({
  fromCurrency,
  toCurrency,
  onFromChange,
  onToChange,
  onClose
}: ComparePanelProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');

  const exchangeRate = fromCurrency && toCurrency
    ? toCurrency.price / fromCurrency.price
    : null;

  const chartData = useMemo(() => {
    if (!fromCurrency || !toCurrency) return [];
    return generateComparisonCandlestick(fromCurrency, toCurrency, timeRange);
  }, [fromCurrency, toCurrency, timeRange]);

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

  const handleSwap = () => {
    const temp = fromCurrency;
    onFromChange(toCurrency);
    onToChange(temp);
  };

  const formatRate = (rate: number) => {
    if (rate >= 10000) return rate.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (rate >= 100) return rate.toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (rate >= 1) return rate.toFixed(4);
    if (rate >= 0.0001) return rate.toFixed(6);
    return rate.toFixed(8);
  };

  // Calculate stats
  const high = chartData.length > 0 ? Math.max(...chartData.map(d => d.high)) : 0;
  const low = chartData.length > 0 ? Math.min(...chartData.map(d => d.low)) : 0;

  const impliedChange = fromCurrency && toCurrency
    ? toCurrency.changePercent24h - fromCurrency.changePercent24h
    : 0;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Compare Currencies</h2>
          <p className="text-slate-400">Select two currencies to compare their exchange rate</p>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Compare Panel */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 mb-6">
        {/* Selectors row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-4">
          {/* From selector */}
          <CurrencySelector
            value={fromCurrency}
            onChange={onFromChange}
            label="From"
            excludeId={toCurrency?.id}
            variant="from"
          />

          {/* Swap button */}
          <div className="flex items-center justify-center lg:pb-2">
            <button
              onClick={handleSwap}
              disabled={!fromCurrency || !toCurrency}
              className={cn(
                "group relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300",
                fromCurrency && toCurrency
                  ? "border-slate-600 bg-slate-800 hover:border-violet-500 hover:bg-violet-500/10 hover:scale-110"
                  : "border-slate-700/50 bg-slate-800/50 cursor-not-allowed"
              )}
            >
              <ArrowLeftRight className={cn(
                "h-5 w-5 transition-all duration-300",
                fromCurrency && toCurrency
                  ? "text-slate-300 group-hover:text-violet-400 group-hover:rotate-180"
                  : "text-slate-600"
              )} />
            </button>
          </div>

          {/* To selector */}
          <CurrencySelector
            value={toCurrency}
            onChange={onToChange}
            label="To"
            excludeId={fromCurrency?.id}
            variant="to"
          />
        </div>

        {/* Exchange rate display */}
        {fromCurrency && toCurrency && exchangeRate !== null && (
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Exchange Rate</p>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    1 {fromCurrency.code} = {formatRate(exchangeRate)} {toCurrency.code}
                  </p>
                  <div className={cn(
                    "flex items-center gap-1 rounded-full px-2.5 py-1",
                    impliedChange >= 0
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-rose-500/10 text-rose-400"
                  )}>
                    {impliedChange >= 0 ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    <span className="text-sm font-semibold tabular-nums">
                      {impliedChange >= 0 ? '+' : ''}{impliedChange.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 rounded-lg px-3 py-2">
                <span>
                  1 {toCurrency.code} = {formatRate(1 / exchangeRate)} {fromCurrency.code}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      {fromCurrency && toCurrency && chartData.length > 0 && (
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 overflow-hidden">
          {/* Chart Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 border-b border-slate-800/50">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">
                    {fromCurrency.code} / {toCurrency.code}
                  </h3>
                  <span className="px-2 py-1 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-medium">
                    Candlestick
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "text-sm font-semibold tabular-nums",
                    isPositive ? "text-emerald-400" : "text-rose-400"
                  )}>
                    {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
                  </span>
                  <span className="text-xs text-slate-500">in {timeRange}</span>
                </div>
              </div>
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
              <CandlestickChart data={chartData} formatValue={formatRate} />
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl bg-slate-800/50 p-4">
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Open</p>
                <p className="text-lg font-bold text-white tabular-nums">
                  {formatRate(chartData[0]?.open || 0)}
                </p>
              </div>
              <div className="rounded-xl bg-slate-800/50 p-4">
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Close</p>
                <p className={cn(
                  "text-lg font-bold tabular-nums",
                  isPositive ? "text-emerald-400" : "text-rose-400"
                )}>
                  {formatRate(chartData[chartData.length - 1]?.close || 0)}
                </p>
              </div>
              <div className="rounded-xl bg-emerald-500/10 p-4">
                <p className="text-xs text-emerald-400/70 mb-1 uppercase tracking-wider">High</p>
                <p className="text-lg font-bold text-emerald-400 tabular-nums">
                  {formatRate(high)}
                </p>
              </div>
              <div className="rounded-xl bg-rose-500/10 p-4">
                <p className="text-xs text-rose-400/70 mb-1 uppercase tracking-wider">Low</p>
                <p className="text-lg font-bold text-rose-400 tabular-nums">
                  {formatRate(low)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state for chart */}
      {(!fromCurrency || !toCurrency) && (
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-8">
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 rounded-full bg-slate-700/50 flex items-center justify-center mb-4">
              <ArrowLeftRight className="w-10 h-10 text-slate-500" />
            </div>
            <p className="text-lg text-slate-400 font-medium">Select both currencies</p>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">
              Choose a "From" and "To" currency above to see the exchange rate chart
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
