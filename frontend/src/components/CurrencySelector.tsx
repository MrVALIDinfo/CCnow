import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { Currency } from '@/types';
import { fiatCurrencies, cryptoCurrencies } from '@/data/mockData';
import { cn } from '@/utils/cn';

interface CurrencySelectorProps {
  value: Currency | null;
  onChange: (currency: Currency) => void;
  label: string;
  excludeId?: string;
  variant?: 'from' | 'to';
}

type TabType = 'fiat' | 'crypto';

export function CurrencySelector({ 
  value, 
  onChange, 
  label, 
  excludeId,
  variant = 'from' 
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('fiat');
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter currencies based on search and tab
  const getFilteredCurrencies = (type: TabType) => {
    const currencies = type === 'fiat' ? fiatCurrencies : cryptoCurrencies;
    return currencies.filter(c => {
      if (excludeId && c.id === excludeId) return false;
      if (!search) return true;
      const query = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(query) ||
        c.code.toLowerCase().includes(query)
      );
    });
  };

  const filteredCurrencies = getFilteredCurrencies(activeTab);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Set initial tab based on selected value type
  useEffect(() => {
    if (value) {
      setActiveTab(value.type);
    }
  }, [value]);

  const handleSelect = (currency: Currency) => {
    onChange(currency);
    setIsOpen(false);
    setSearch('');
  };

  const getCurrencyIcon = (currency: Currency) => {
    if (currency.type === 'fiat') {
      return currency.flag || currency.symbol;
    }
    return currency.symbol;
  };

  const formatPrice = (currency: Currency) => {
    if (currency.type === 'crypto') {
      if (currency.price >= 1000) return `$${currency.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
      if (currency.price >= 1) return `$${currency.price.toFixed(2)}`;
      return `$${currency.price.toFixed(6)}`;
    }
    return currency.price.toFixed(4);
  };

  return (
    <div ref={containerRef} className="relative flex-1">
      <label className="mb-2 block text-xs font-medium text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 rounded-2xl border-2 bg-slate-800/50 p-4 text-left transition-all duration-200",
          "hover:bg-slate-800/80 hover:border-slate-600",
          isOpen 
            ? variant === 'from' ? "border-violet-500 ring-4 ring-violet-500/20" : "border-cyan-500 ring-4 ring-cyan-500/20"
            : "border-slate-700/50",
          value && "border-slate-600"
        )}
      >
        {value ? (
          <>
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl text-xl",
              value.type === 'crypto' 
                ? "bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-violet-300"
                : "bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-2xl"
            )}>
              {getCurrencyIcon(value)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">{value.code}</span>
                <span className={cn(
                  "text-[10px] font-medium px-2 py-0.5 rounded-full uppercase",
                  value.type === 'crypto' 
                    ? "bg-violet-500/20 text-violet-300" 
                    : "bg-emerald-500/20 text-emerald-300"
                )}>
                  {value.type}
                </span>
              </div>
              <p className="text-sm text-slate-400 truncate">{value.name}</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-700/50 text-slate-500">
              <Search className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-medium text-slate-500">Select currency</p>
              <p className="text-sm text-slate-600">Fiat or Crypto</p>
            </div>
          </>
        )}
        <ChevronDown className={cn(
          "h-5 w-5 text-slate-400 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900 shadow-2xl shadow-black/50 animate-scale-in">
          {/* Tabs */}
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setActiveTab('fiat')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200",
                activeTab === 'fiat'
                  ? "bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-400"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              )}
            >
              <span className="text-lg">💵</span>
              <span>Fiat</span>
              <span className="text-xs text-slate-500">({fiatCurrencies.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('crypto')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200",
                activeTab === 'crypto'
                  ? "bg-violet-500/10 text-violet-400 border-b-2 border-violet-400"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              )}
            >
              <span className="text-lg">₿</span>
              <span>Crypto</span>
              <span className="text-xs text-slate-500">({cryptoCurrencies.length})</span>
            </button>
          </div>

          {/* Search input */}
          <div className="relative border-b border-slate-800 p-3">
            <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${activeTab === 'fiat' ? 'fiat currencies' : 'cryptocurrencies'}...`}
              className="w-full rounded-xl bg-slate-800/50 py-3 pl-10 pr-10 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-violet-500/30"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Currency List */}
          <div className="max-h-72 overflow-y-auto">
            {filteredCurrencies.length > 0 ? (
              <div className="py-2">
                {filteredCurrencies.map(currency => (
                  <button
                    key={currency.id}
                    onClick={() => handleSelect(currency)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                      "hover:bg-slate-800/50",
                      value?.id === currency.id && "bg-slate-800"
                    )}
                  >
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      currency.type === 'crypto'
                        ? "bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-violet-300 text-lg"
                        : "bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-2xl"
                    )}>
                      {getCurrencyIcon(currency)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{currency.code}</span>
                        <span className="text-sm text-slate-400 truncate">— {currency.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white tabular-nums">
                        {formatPrice(currency)}
                      </p>
                      <p className={cn(
                        "text-xs font-medium tabular-nums",
                        currency.changePercent24h >= 0 ? "text-emerald-400" : "text-rose-400"
                      )}>
                        {currency.changePercent24h >= 0 ? '+' : ''}{currency.changePercent24h.toFixed(2)}%
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-slate-500">No {activeTab} currencies found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
