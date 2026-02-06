import { useState, useRef, useEffect } from 'react';
import { TrendingUp, Activity, Search, X, ArrowRight } from 'lucide-react';
import { Currency } from '@/types';
import { allCurrencies } from '@/data/mockData';
import { cn } from '@/utils/cn';

interface HeaderProps {
  onSelectCurrency: (currency: Currency) => void;
  onCompareClick: () => void;
  onHomeClick?: () => void;
  viewMode: 'home' | 'solo' | 'compare';
}

export function Header({ onSelectCurrency, onCompareClick, onHomeClick, viewMode }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCurrencies = allCurrencies.filter(c => {
    if (!searchQuery) return false;
    const query = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.code.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSelect = (currency: Currency) => {
    onSelectCurrency(currency);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const getCurrencyIcon = (currency: Currency) => {
    if (currency.type === 'fiat') {
      return currency.flag || currency.symbol;
    }
    return currency.symbol;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/50 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - Clickable to go home */}
          <button 
            onClick={onHomeClick}
            className="flex items-center gap-3 group transition-all duration-200 hover:opacity-80"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-500 shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block text-left">
              <h1 className="text-lg font-bold tracking-tight text-white">
                CC<span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">now</span>
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Currency Compare</p>
            </div>
          </button>

          {/* Global Search */}
          <div ref={searchRef} className="relative flex-1 max-w-md">
            <div 
              className={cn(
                "relative flex items-center rounded-xl border-2 bg-slate-900/80 transition-all duration-200",
                isSearchOpen 
                  ? "border-violet-500 ring-4 ring-violet-500/20" 
                  : "border-slate-700/50 hover:border-slate-600"
              )}
            >
              <Search className="absolute left-3 h-4 w-4 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!isSearchOpen) setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search currencies..."
                className="w-full bg-transparent py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-500 hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {isSearchOpen && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto rounded-xl border border-slate-700/50 bg-slate-900 shadow-2xl shadow-black/50 animate-scale-in">
                {filteredCurrencies.length > 0 ? (
                  <div className="py-2">
                    {filteredCurrencies.slice(0, 8).map(currency => (
                      <button
                        key={currency.id}
                        onClick={() => handleSelect(currency)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-slate-800/50"
                      >
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg",
                          currency.type === 'crypto' 
                            ? "bg-violet-500/20 text-violet-300" 
                            : "bg-emerald-500/20 text-lg"
                        )}>
                          {getCurrencyIcon(currency)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{currency.code}</span>
                            <span className={cn(
                              "text-[10px] font-medium px-1.5 py-0.5 rounded-full uppercase",
                              currency.type === 'crypto' 
                                ? "bg-violet-500/20 text-violet-400" 
                                : "bg-emerald-500/20 text-emerald-400"
                            )}>
                              {currency.type}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 truncate">{currency.name}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-slate-500">No currencies found</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Compare button */}
            <button
              onClick={onCompareClick}
              className={cn(
                "hidden sm:flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                viewMode === 'compare'
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/25"
                  : "border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
              )}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Compare</span>
            </button>
            
            {/* Live indicator */}
            <div className="hidden items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1.5 sm:flex">
              <Activity className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-slate-300">Live</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
