import React from 'react';
import { Camera, SunMedium, Focus, AlertCircle, HelpCircle } from 'lucide-react';

export const ImageQualityInsightsCard: React.FC = () => {
  const qualityMetrics = [
    {
      label: 'Focal Blur / Motion Shake',
      status: 'Optimal (1.2% flag)',
      rate: 98.8,
      indicator: 'pass',
      icon: Focus,
      tip: 'Stable camera shutter speed and ring flash sync.',
    },
    {
      label: 'Ring Flash & Lighting Exposure',
      status: 'Uniform (96.4% pass)',
      rate: 96.4,
      indicator: 'pass',
      icon: SunMedium,
      tip: 'Minor reflection on palatal mirror in 3.6% of series.',
    },
    {
      label: 'Arch & Quadrant Coverage',
      status: 'Full Arch (97.1% coverage)',
      rate: 97.1,
      indicator: 'pass',
      icon: Camera,
      tip: 'Cheek retractors positioned properly for clear view.',
    },
    {
      label: 'Potential Retake Frequency',
      status: 'Low (1 Case Recommended)',
      rate: 95.8,
      indicator: 'warn',
      icon: AlertCircle,
      tip: 'Case OV-DEMO-1049 retake advised for uneven lighting.',
    },
  ];

  return (
    <div
      className="card"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>
            Intraoral Image Quality Insights
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Simulated optical benchmarks for clinical photograph clarity
          </span>
        </div>
        <span className="badge badge-brand">
          94.6% Overall Pass
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {qualityMetrics.map((item, idx) => {
          const Icon = item.icon;
          const isPass = item.indicator === 'pass';

          return (
            <div
              key={idx}
              style={{
                padding: '0.75rem 0.875rem',
                backgroundColor: isPass ? '#f8fafc' : '#fffbeb',
                border: isPass ? '1px solid #e2e8f0' : '1px solid #fef3c7',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.375rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Icon size={14} color={isPass ? '#0e7490' : '#d97706'} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>
                    {item.label}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: isPass ? '#059669' : '#d97706',
                  }}
                >
                  {item.rate}%
                </span>
              </div>

              <div
                style={{
                  height: 4,
                  backgroundColor: '#e2e8f0',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${item.rate}%`,
                    backgroundColor: isPass ? '#0e7490' : '#f59e0b',
                  }}
                />
              </div>

              <div style={{ fontSize: '0.6875rem', color: '#64748b', lineHeight: 1.3 }}>
                {item.tip}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          borderTop: '1px solid #f1f5f9',
          paddingTop: '0.625rem',
          fontSize: '0.6875rem',
          color: '#94a3b8',
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
        }}
      >
        <HelpCircle size={12} color="#94a3b8" />
        <span>
          Illustrative frontend indicators designed to assist photographic consistency, not a verified medical device quality metric.
        </span>
      </div>
    </div>
  );
};
