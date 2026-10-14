import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: string;
  isPositiveTrend?: boolean;
  subtitle: string;
  icon: LucideIcon;
  sparklineData?: number[];
  color?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  isPositiveTrend = true,
  subtitle,
  icon: Icon,
  sparklineData = [12, 15, 14, 18, 17, 21, 25, 23, 28],
  color = '#0e7490',
}) => {
  // Generate a mini SVG sparkline path
  const minVal = Math.min(...sparklineData);
  const maxVal = Math.max(...sparklineData);
  const range = maxVal - minVal || 1;
  const height = 28;
  const width = 72;

  const points = sparklineData
    .map((d, i) => {
      const x = (i / (sparklineData.length - 1)) * width;
      const y = height - ((d - minVal) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div
      className="card"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {title}
          </span>
          <div
            style={{
              fontSize: '1.875rem',
              fontWeight: 700,
              color: '#0f172a',
              fontFamily: 'var(--font-display)',
              marginTop: '0.25rem',
              lineHeight: 1.1,
            }}
          >
            {value}
          </div>
        </div>

        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-lg)',
            backgroundColor: '#f0fdfa',
            border: '1px solid #ccfbf1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
          }}
        >
          <Icon size={20} />
        </div>
      </div>

      <div
        style={{
          marginTop: '1rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          {isPositiveTrend ? (
            <TrendingUp size={14} color="#059669" />
          ) : (
            <TrendingDown size={14} color="#d97706" />
          )}
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: isPositiveTrend ? '#059669' : '#d97706',
            }}
          >
            {trend}
          </span>
        </div>

        {/* Mini Sparkline */}
        <svg width={width} height={height} style={{ overflow: 'visible' }}>
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>

      <div style={{ marginTop: '0.375rem', fontSize: '0.6875rem', color: '#94a3b8' }}>
        {subtitle}
      </div>
    </div>
  );
};
