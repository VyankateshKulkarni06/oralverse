import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { CaseItem } from '../types';

interface QualityDistributionCardProps {
  cases: CaseItem[];
}

export const QualityDistributionCard: React.FC<QualityDistributionCardProps> = ({ cases }) => {
  const readyCount = cases.filter((c) => c.reviewStatus === 'ready').length;
  const inReviewCount = cases.filter((c) => c.reviewStatus === 'in_review').length;
  const reviewedCount = cases.filter((c) => c.reviewStatus === 'reviewed').length;
  const retakeCount = cases.filter((c) => c.reviewStatus === 'retake_recommended').length;
  const total = cases.length || 1;

  const statuses = [
    {
      label: 'Ready for Review',
      count: readyCount,
      percent: Math.round((readyCount / total) * 100),
      color: '#0e7490',
      bgColor: '#ecfeff',
      icon: Clock,
    },
    {
      label: 'Review in Progress',
      count: inReviewCount,
      percent: Math.round((inReviewCount / total) * 100),
      color: '#0284c7',
      bgColor: '#f0f9ff',
      icon: ShieldCheck,
    },
    {
      label: 'Reviewed & Complete',
      count: reviewedCount,
      percent: Math.round((reviewedCount / total) * 100),
      color: '#059669',
      bgColor: '#ecfdf5',
      icon: CheckCircle2,
    },
    {
      label: 'Needs Quality Retake',
      count: retakeCount,
      percent: Math.round((retakeCount / total) * 100),
      color: '#e11d48',
      bgColor: '#fff1f2',
      icon: AlertTriangle,
    },
  ];

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
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>
            Case Review Pipeline Status
          </h4>
          <span className="badge badge-demo">Current Queue</span>
        </div>
        <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
          Real-time triage and distribution of active cases
        </p>
      </div>

      {/* Stacked Progress Bar */}
      <div>
        <div
          style={{
            height: '10px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#f1f5f9',
            overflow: 'hidden',
            display: 'flex',
            marginBottom: '0.875rem',
          }}
        >
          {statuses.map((s, idx) => (
            <div
              key={idx}
              style={{
                width: `${s.percent}%`,
                backgroundColor: s.color,
                transition: 'width 0.3s ease',
              }}
              title={`${s.label}: ${s.count} (${s.percent}%)`}
            />
          ))}
        </div>

        {/* Detailed Status Breakdown Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {statuses.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: s.bgColor,
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${s.color}20`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon size={14} color={s.color} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>
                    {s.label}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: s.color }}>
                    {s.count}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                    ({s.percent}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid #f1f5f9',
          paddingTop: '0.75rem',
          fontSize: '0.6875rem',
          color: '#94a3b8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>Total Workspace Cases: <strong>{cases.length}</strong></span>
        <span>Avg. Turnaround: <strong>4.2 mins</strong></span>
      </div>
    </div>
  );
};
