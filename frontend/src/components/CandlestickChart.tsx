import { useMemo, useCallback } from 'react';
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import { CandlestickData } from '@/types';

interface CandlestickChartProps {
  data: CandlestickData[];
  formatValue: (value: number) => string;
}

// Custom tooltip for candlestick
const CandlestickTooltip = ({ 
  active, 
  payload,
  formatValue 
}: { 
  active?: boolean; 
  payload?: Array<{ payload: CandlestickData }>;
  formatValue: (value: number) => string;
}) => {
  if (!active || !payload || !payload[0]) return null;
  
  const data = payload[0].payload;
  const isUp = data.close >= data.open;
  const changePercent = ((data.close - data.open) / data.open) * 100;
  
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/95 backdrop-blur-sm p-4 shadow-2xl min-w-[200px]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-slate-400">{data.date}</p>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          isUp ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
        }`}>
          {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Open</span>
          <p className="text-sm font-semibold text-slate-300">{formatValue(data.open)}</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Close</span>
          <p className={`text-sm font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            {formatValue(data.close)}
          </p>
        </div>
        <div>
          <span className="text-[10px] text-emerald-400/70 uppercase tracking-wider">High</span>
          <p className="text-sm font-semibold text-emerald-400">{formatValue(data.high)}</p>
        </div>
        <div>
          <span className="text-[10px] text-rose-400/70 uppercase tracking-wider">Low</span>
          <p className="text-sm font-semibold text-rose-400">{formatValue(data.low)}</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Volume</span>
          <p className="text-sm font-semibold text-slate-400">
            {data.volume >= 1e6 ? `${(data.volume / 1e6).toFixed(2)}M` : data.volume.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

// Custom candlesticks renderer using SVG
const CandlestickSeries = ({ 
  data, 
  xScale, 
  yScale,
  width 
}: { 
  data: CandlestickData[];
  xScale: (value: string) => number;
  yScale: (value: number) => number;
  width: number;
}) => {
  const candleWidth = Math.max(Math.min(width / data.length * 0.6, 14), 3);
  
  return (
    <g className="candlesticks">
      {data.map((d, i) => {
        const x = xScale(d.date);
        const isUp = d.close >= d.open;
        const color = isUp ? '#10b981' : '#ef4444';
        
        const highY = yScale(d.high);
        const lowY = yScale(d.low);
        const openY = yScale(d.open);
        const closeY = yScale(d.close);
        
        const bodyTop = Math.min(openY, closeY);
        const bodyHeight = Math.max(Math.abs(closeY - openY), 1);
        
        return (
          <g key={i}>
            {/* Wick */}
            <line
              x1={x}
              y1={highY}
              x2={x}
              y2={lowY}
              stroke={color}
              strokeWidth={1.5}
            />
            {/* Body */}
            <rect
              x={x - candleWidth / 2}
              y={bodyTop}
              width={candleWidth}
              height={bodyHeight}
              fill={color}
              rx={1}
            />
          </g>
        );
      })}
    </g>
  );
};

export function CandlestickChart({ data, formatValue }: CandlestickChartProps) {
  // Calculate Y-axis domain from all OHLC values
  const yDomain = useMemo(() => {
    const allLows = data.map(d => d.low);
    const allHighs = data.map(d => d.high);
    const min = Math.min(...allLows);
    const max = Math.max(...allHighs);
    const padding = (max - min) * 0.1;
    return [min - padding, max + padding];
  }, [data]);

  const openPrice = data[0]?.open || 0;
  const lastClose = data[data.length - 1]?.close || 0;
  const isOverallPositive = lastClose >= openPrice;

  // Custom render for candlesticks overlay
  const renderCandlesticks = useCallback((chartState: { 
    xAxisMap?: Record<string, { scale: (v: string) => number }>;
    yAxisMap?: Record<string, { scale: (v: number) => number }>;
    width?: number;
  }) => {
    if (!chartState?.xAxisMap || !chartState?.yAxisMap) return null;
    
    const xAxis = Object.values(chartState.xAxisMap)[0];
    const yAxis = Object.values(chartState.yAxisMap)[0];
    
    if (!xAxis?.scale || !yAxis?.scale) return null;
    
    return (
      <CandlestickSeries
        data={data}
        xScale={xAxis.scale}
        yScale={yAxis.scale}
        width={chartState.width || 600}
      />
    );
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="gridGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#1e293b" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="url(#gridGradient)"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          stroke="#334155"
          tick={{ fill: '#64748b', fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: '#1e293b' }}
          tickMargin={10}
          interval="preserveStartEnd"
        />
        <YAxis
          stroke="#334155"
          tick={{ fill: '#64748b', fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(val) => formatValue(val).replace('$', '')}
          width={65}
          domain={yDomain}
          scale="linear"
        />
        <ReferenceLine
          y={openPrice}
          stroke={isOverallPositive ? '#10b981' : '#ef4444'}
          strokeDasharray="5 5"
          strokeWidth={1}
          strokeOpacity={0.4}
        />
        <Tooltip
          content={<CandlestickTooltip formatValue={formatValue} />}
          cursor={{ stroke: '#6366f1', strokeDasharray: '5 5', strokeOpacity: 0.3 }}
        />
        {/* Invisible reference areas to trigger tooltip for each candle */}
        {data.map((d, i) => (
          <ReferenceArea
            key={i}
            x1={d.date}
            x2={d.date}
            y1={yDomain[0]}
            y2={yDomain[1]}
            fill="transparent"
            stroke="transparent"
          />
        ))}
        {/* Custom candlesticks layer */}
        {({ xAxisMap, yAxisMap, width }: { 
          xAxisMap?: Record<string, { scale: (v: string) => number }>;
          yAxisMap?: Record<string, { scale: (v: number) => number }>;
          width?: number;
        }) => renderCandlesticks({ xAxisMap, yAxisMap, width })}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
