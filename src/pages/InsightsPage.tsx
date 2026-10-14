import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Info,
  TrendingUp,
} from 'lucide-react';
import {
  ACTIVITY_TRENDS,
  QUALITY_BY_VIEW_DATA,
  RETAKE_REASONS_DATA,
  REVIEW_CATEGORIES_DATA,
} from '../data/mockData';

export const InsightsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'ytd'>('30d');

  const currentActivityData = ACTIVITY_TRENDS[timeRange];

  // Dynamic metrics calculation based on time range
  const totalReviewed = currentActivityData.reduce((acc, curr) => acc + curr.reviewed, 0);
  const totalCreated = currentActivityData.reduce((acc, curr) => acc + curr.created, 0);
  const avgPassRate = Math.round(
    currentActivityData.reduce((acc, curr) => acc + curr.passRate, 0) / currentActivityData.length
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Filter and Clinical Analytics Header */}
      <div
        className="card"
        style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)',
          border: '1px solid #ccfbf1',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
              Clinical Analytics & Quality Intelligence
            </h2>
            <span className="badge badge-demo">Simulated Benchmarks</span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: '#475569', marginTop: '2px' }}>
            Photographic pass rates, triage velocity, and visual review distribution across the clinic
          </p>
        </div>

        {/* Date Filter Buttons */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            padding: '0.25rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-xs)',
            gap: '0.25rem',
          }}
        >
          {(['7d', '30d', '90d', 'ytd'] as const).map((range) => {
            const labels = {
              '7d': 'Last 7 Days',
              '30d': 'Last 30 Days',
              '90d': 'Last 90 Days',
              ytd: 'Year to Date',
            };

            return (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className="btn btn-sm"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: timeRange === range ? '#0e7490' : 'transparent',
                  color: timeRange === range ? '#ffffff' : '#64748b',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {labels[range]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Metric Highlights for Selected Filter */}
      <div className="grid-cols-4">
        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Cases Processed</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
            {totalCreated}
          </div>
          <span style={{ fontSize: '0.6875rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '4px' }}>
            <TrendingUp size={12} /> Intake throughput active
          </span>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Cases Completed</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0e7490', marginTop: '2px' }}>
            {totalReviewed}
          </div>
          <span style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
            Reviewed by Dr. Sharma
          </span>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Avg Turnaround</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
            4.2 mins
          </div>
          <span style={{ fontSize: '0.6875rem', color: '#059669', marginTop: '4px', display: 'block' }}>
            -35s faster review flow
          </span>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Optical Pass Rate</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#059669', marginTop: '2px' }}>
            {avgPassRate}%
          </div>
          <span style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
            Focus & exposure benchmark
          </span>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid-cols-2">
        {/* Case Activity Over Time */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>
                Case Activity & Clinical Review Throughput
              </h4>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Volume of cases uploaded vs verified
              </span>
            </div>
            <span className="badge badge-demo">Volume</span>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="insReviewed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0e7490" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#0e7490" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="reviewed"
                  name="Reviewed"
                  stroke="#0e7490"
                  strokeWidth={2.5}
                  fill="url(#insReviewed)"
                />
                <Area
                  type="monotone"
                  dataKey="created"
                  name="Created"
                  stroke="#06b6d4"
                  strokeWidth={1.8}
                  strokeDasharray="4 2"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quality Pass Rates by Anatomical View */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>
                Optical Quality Pass Rate by View Angle
              </h4>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Focus, lighting, and frame clarity percentages
              </span>
            </div>
            <span className="badge badge-demo">By Angle</span>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={QUALITY_BY_VIEW_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="view" tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis domain={[80, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="pass" name="Quality Pass %" fill="#0e7490" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Row: Retake Factors & Review Flag Categories */}
      <div className="grid-cols-2">
        {/* Retake Reasons Breakdown */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>
              Common Image Retake Factors
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Simulated root-cause breakdown of rejected or blurred captures
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {RETAKE_REASONS_DATA.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>{item.name}</span>
                  <span style={{ fontWeight: 700, color: item.color }}>{item.value}%</span>
                </div>
                <div style={{ height: 6, backgroundColor: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Review Findings Categories */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>
              Visual Landmark & Attention Categories
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Simulated distribution of regions flagged for clinical verification
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {REVIEW_CATEGORIES_DATA.map((cat, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.625rem 0.875rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: cat.color }} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0f172a' }}>
                    {cat.category}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{cat.count} flags</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0e7490' }}>
                    {cat.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.875rem 1.25rem',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 'var(--radius-lg)',
          fontSize: '0.75rem',
          color: '#64748b',
        }}
      >
        <Info size={16} color="#0e7490" style={{ flexShrink: 0 }} />
        <span>
          <strong>Methodology Note:</strong> All metrics, percentages, and trends displayed here reflect the fictional demonstration environment and should not be used as clinical trial evidence or diagnostic validation.
        </span>
      </div>
    </div>
  );
};
