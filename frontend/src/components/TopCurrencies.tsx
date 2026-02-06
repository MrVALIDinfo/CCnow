import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Sparkles, BarChart3 } from 'lucide-react';
import { Currency } from '@/types';
import { topFiatCurrencies, topCryptoCurrencies } from '@/data/mockData';
import { cn } from '@/utils/cn';

interface TopCurrenciesProps {
  onSelectCurrency: (currency: Currency) => void;
}

// Mini sparkline component
function MiniSparkline({ isPositive }: { isPositive: boolean }) {
  const points = useMemo(() => {
    const pts: number[] = [];
    let val = 10;
    for (let i = 0; i <= 12; i++) {
      val = Math.max(2, Math.min(18, val + (Math.random() - (isPositive ? 0.45 : 0.55)) * 4));
      pts.push(val);
    }
    return pts;
  }, [isPositive]);

  const path = `M0,${points[0]} ${points.slice(1).map((y, i) => `L${(i + 1) * 5},${y}`).join(' ')}`;

  return (
    <svg className="w-[60px] h-5" viewBox="0 0 60 20" preserveAspectRatio="none">
      <path
        d={path}
        fill="none"
        stroke={isPositive ? "#10b981" : "#f43f5e"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface CurrencyRowProps {
  currency: Currency;
  rank: number;
  onClick: () => void;
}

function CurrencyRow({ currency, rank, onClick }: CurrencyRowProps) {
  const isPositive = currency.changePercent24h >= 0;
  const isCrypto = currency.type === 'crypto';

  const formatPrice = (price: number) => {
    if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    if (price >= 0.0001) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(6)}`;
  };

  const formatVolume = (vol: number) => {
    if (vol >= 1e12) return `$${(vol / 1e12).toFixed(1)}T`;
    if (vol >= 1e9) return `$${(vol / 1e9).toFixed(1)}B`;
    if (vol >= 1e6) return `$${(vol / 1e6).toFixed(0)}M`;
    return `$${vol.toLocaleString()}`;
  };

  const getCurrencyIcon = () => {
    if (currency.type === 'fiat') {
      return currency.flag || currency.symbol;
    }
    return currency.symbol;
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full flex items-center gap-3 sm:gap-4 rounded-xl p-3 sm:p-4 transition-all duration-200",
        "bg-slate-800/30 border border-transparent",
        "hover:bg-slate-800/60 hover:border-slate-700/50",
        "active:scale-[0.99]"
      )}
    >
      {/* Rank */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-700/50 text-xs font-semibold text-slate-400">
        {rank}
      </div>

      {/* Icon and name */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg",
          isCrypto
            ? "bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-violet-300"
            : "bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-xl"
        )}>
          {getCurrencyIcon()}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">{currency.code}</span>
          </div>
          <p className="text-xs text-slate-500 truncate">{currency.name}</p>
        </div>
      </div>

      {/* Sparkline - hidden on mobile */}
      <div className="hidden md:block">
        <MiniSparkline isPositive={isPositive} />
      </div>

      {/* Price */}
      <div className="text-right shrink-0">
        <p className="font-semibold text-white tabular-nums">
          {isCrypto ? formatPrice(currency.price) : currency.price.toFixed(4)}
        </p>
        <p className="text-xs text-slate-500 hidden sm:block">
          Vol: {formatVolume(currency.volume24h)}
        </p>
      </div>

      {/* Change */}
      <div className={cn(
        "flex items-center gap-1 rounded-lg px-2 py-1.5 shrink-0",
        isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
      )}>
        {isPositive ? (
          <TrendingUp className="h-3.5 w-3.5" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5" />
        )}
        <span className="text-xs font-semibold tabular-nums">
          {isPositive ? '+' : ''}{currency.changePercent24h.toFixed(2)}%
        </span>
      </div>

      {/* View chart indicator */}
      <div className="hidden group-hover:flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400">
        <BarChart3 className="h-4 w-4" />
      </div>
    </button>
  );
}

export function TopCurrencies({ onSelectCurrency }: TopCurrenciesProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Top Fiat */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-slate-800/50 p-4 sm:p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
            <Sparkles className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Top Fiat Currencies</h3>
            <p className="text-xs text-slate-500">Click to view chart</p>
          </div>
        </div>
        <div className="p-3 sm:p-4 space-y-2">
          {topFiatCurrencies.map((currency, index) => (
            <CurrencyRow
              key={currency.id}
              currency={currency}
              rank={index + 1}
              onClick={() => onSelectCurrency(currency)}
            />
          ))}
        </div>
      </div>

      {/* Top Crypto */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-slate-800/50 p-4 sm:p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20">
            <Sparkles className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Top Cryptocurrencies</h3>
            <p className="text-xs text-slate-500">Click to view chart</p>
          </div>
        </div>
        <div className="p-3 sm:p-4 space-y-2">
          {topCryptoCurrencies.map((currency, index) => (
            <CurrencyRow
              key={currency.id}
              currency={currency}
              rank={index + 1}
              onClick={() => onSelectCurrency(currency)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
