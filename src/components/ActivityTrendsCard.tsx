import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Calendar, BarChart2 } from 'lucide-react';
import { ACTIVITY_TRENDS } from '../data/mockData';

export const ActivityTrendsCard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'ytd'>('7d');

  const data = ACTIVITY_TRENDS[timeRange];

  return (
    <div
      className="card"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      {/* Header with Title and Range Switcher */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#f0fdfa',
              border: '1px solid #ccfbf1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0e7490',
            }}
          >
            <BarChart2 size={16} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>
              Case Review Activity & Volume
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Fictional case throughput & clinical reviews
            </span>
          </div>
        </div>

        {/* Time range switcher */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '0.1875rem',
            borderRadius: 'var(--radius-md)',
            gap: '0.25rem',
          }}
        >
          {(['7d', '30d', '90d', 'ytd'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className="btn btn-sm"
              style={{
                padding: '0.1875rem 0.5rem',
                fontSize: '0.6875rem',
                fontWeight: 600,
                backgroundColor: timeRange === range ? '#ffffff' : 'transparent',
                color: timeRange === range ? '#0e7490' : '#64748b',
                boxShadow: timeRange === range ? 'var(--shadow-xs)' : 'none',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div style={{ width: '100%', height: 230 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReviewed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0e7490" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0e7490" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              tick={{ fill: '#64748b', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.08)',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="reviewed"
              name="Cases Reviewed"
              stroke="#0e7490"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorReviewed)"
            />
            <Area
              type="monotone"
              dataKey="created"
              name="Cases Uploaded"
              stroke="#06b6d4"
              strokeWidth={1.8}
              strokeDasharray="4 2"
              fillOpacity={1}
              fill="url(#colorCreated)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Note */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: '#64748b',
          borderTop: '1px solid #f1f5f9',
          paddingTop: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{ width: 12, height: 3, backgroundColor: '#0e7490', borderRadius: 2 }} />
            <span>Reviewed ({data.reduce((a, b) => a + b.reviewed, 0)})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{ width: 12, height: 3, backgroundColor: '#06b6d4', borderRadius: 2 }} />
            <span>Uploaded ({data.reduce((a, b) => a + b.created, 0)})</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem' }}>
          <Calendar size={12} />
          <span>Demo Data Stream</span>
        </div>
      </div>
    </div>
  );
};
