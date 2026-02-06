import { useState } from 'react';
import { Currency, ViewMode } from '@/types';
import { Header } from '@/components/Header';
import { SoloView } from '@/components/SoloView';
import { ComparePanel } from '@/components/ComparePanel';
import { TopCurrencies } from '@/components/TopCurrencies';
import { ArrowLeftRight, Activity } from 'lucide-react';
import { cn } from '@/utils/cn';

export function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [soloCurrency, setSoloCurrency] = useState<Currency | null>(null);
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);

  // Handle currency selection from search or top charts -> Solo View
  const handleSelectCurrency = (currency: Currency) => {
    setSoloCurrency(currency);
    setViewMode('solo');
  };

  // Handle Compare button click -> Compare View
  const handleCompareClick = () => {
    setViewMode('compare');
  };

  // Close any view and go back to home
  const handleClose = () => {
    setViewMode('home');
    setSoloCurrency(null);
  };

  // Close compare view
  const handleCloseCompare = () => {
    setViewMode('home');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-500/8 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 h-[300px] w-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative">
        <Header
          onSelectCurrency={handleSelectCurrency}
          onCompareClick={handleCompareClick}
          onHomeClick={handleClose}
          viewMode={viewMode}
        />

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Solo View */}
          {viewMode === 'solo' && soloCurrency && (
            <SoloView currency={soloCurrency} onClose={handleClose} />
          )}

          {/* Compare View */}
          {viewMode === 'compare' && (
            <ComparePanel
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              onFromChange={setFromCurrency}
              onToChange={setToCurrency}
              onClose={handleCloseCompare}
            />
          )}

          {/* Home View */}
          {viewMode === 'home' && (
            <div className="animate-fade-in">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Currency Analytics,{' '}
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Simplified
                  </span>
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                  Explore real-time charts, compare exchange rates, and analyze price movements
                  for any fiat or cryptocurrency.
                </p>

                {/* Compare Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleCompareClick}
                    className={cn(
                      "group relative flex items-center gap-4 rounded-2xl border-2 border-violet-500/30 bg-violet-500/5 px-8 py-5 text-left transition-all duration-300",
                      "hover:border-violet-500 hover:bg-violet-500/10 hover:scale-[1.02]"
                    )}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400 group-hover:scale-110 transition-transform">
                      <ArrowLeftRight className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">Compare Currencies</p>
                      <p className="text-sm text-slate-400">Fiat ↔ Crypto, any combination</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Current Mode Indicator */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-slate-500">
                  Select any currency below to view its chart • Use search for quick access
                </span>
              </div>

              {/* Top Currencies Section */}
              <section>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    Top Charts
                  </h3>
                  <p className="text-sm text-slate-500">
                    Most traded currencies - click to view detailed chart
                  </p>
                </div>
                <TopCurrencies onSelectCurrency={handleSelectCurrency} />
              </section>

              {/* Quick Stats */}
              <section className="mt-12">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Total Currencies</p>
                    <p className="text-2xl font-bold text-white">24</p>
                    <p className="text-xs text-slate-500">12 Fiat • 12 Crypto</p>
                  </div>
                  <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">BTC Price</p>
                    <p className="text-2xl font-bold text-white">$104,235</p>
                    <p className="text-xs text-emerald-400">+2.11%</p>
                  </div>
                  <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">ETH Price</p>
                    <p className="text-2xl font-bold text-white">$3,892</p>
                    <p className="text-xs text-rose-400">-1.16%</p>
                  </div>
                  <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">EUR/USD</p>
                    <p className="text-2xl font-bold text-white">1.0900</p>
                    <p className="text-xs text-emerald-400">+0.28%</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Footer */}
          <footer className="border-t border-slate-800/50 pt-8 mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
                <span>Live rates • Updated in real-time</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-slate-600">Data for demonstration purposes</span>
                <span className="text-slate-600">© 2024 CCnow</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
