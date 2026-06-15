'use client';

import { useId, useMemo, useState } from 'react';
import { Calendar } from 'lucide-react';

const dataPoints = [42, 55, 38, 72, 65, 88, 95, 78, 102, 115, 98, 125, 108, 135, 142, 128, 155, 148, 170, 165, 182, 195, 188, 210, 205, 228, 215, 240, 235, 252];

const labels = ['1', '5', '10', '15', '20', '25', '30'];

export default function ChartArea() {
  const [hovered, setHovered] = useState<number | null>(null);
  const uid = useId();
  const chartGradId = `chartGradient-${uid}`;
  const lineGradId = `lineGradient-${uid}`;

  const max = Math.max(...dataPoints);
  const min = Math.min(...dataPoints);
  const range = max - min || 1;

  const width = 700;
  const height = 280;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const points = dataPoints.map((val, i) => {
    const x = padding.left + (i / (dataPoints.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((val - min) / range) * chartHeight;
    return { x, y, val };
  });

  const { pathD, areaD } = useMemo(() => {
    const path = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');
    const area = `${path} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;
    return { pathD: path, areaD: area };
  }, [points, chartHeight, padding.top]);

  return (
    <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Payment Trends</h3>
          <p className="text-sm text-white/50">Daily transactions over the last 30 days</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70">
          <Calendar className="w-4 h-4" />
          Last 30 days
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          style={{ minHeight: 200 }}
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = padding.top + (i / 4) * chartHeight;
            return (
              <line
                key={i}
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
              />
            );
          })}

          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map((i) => {
            const val = Math.round(max - (i / 4) * range);
            const y = padding.top + (i / 4) * chartHeight;
            return (
              <text
                key={i}
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                fill="rgba(255,255,255,0.4)"
                fontSize={11}
              >
                {val}
              </text>
            );
          })}

          {/* X-axis labels */}
          {labels.map((label, i) => {
            const x = padding.left + (i / (labels.length - 1)) * chartWidth;
            return (
              <text
                key={label}
                x={x}
                y={height - 10}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize={11}
              >
                {label}
              </text>
            );
          })}

          {/* Area gradient */}
          <defs>
            <linearGradient id={chartGradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(99,102,241,0.3)" />
              <stop offset="100%" stopColor="rgba(99,102,241,0)" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path d={areaD} fill={`url(#${chartGradId})`} />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke={`url(#${lineGradId})`}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id={lineGradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>

          {/* Data points */}
          {points.map((p, i) => (
            <g
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className="cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={`Data point ${p.val}`}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={hovered === i ? 6 : 0}
                fill="#818cf8"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={2}
                className="transition-all duration-200"
              />
              {hovered === i && (
                <>
                  <rect
                    x={p.x - 35}
                    y={p.y - 35}
                    width={70}
                    height={24}
                    rx={6}
                    fill="rgba(15,23,42,0.9)"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={1}
                  />
                  <text
                    x={p.x}
                    y={p.y - 18}
                    textAnchor="middle"
                    fill="white"
                    fontSize={11}
                    fontWeight={600}
                  >
                    {p.val}
                  </text>
                </>
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
