import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const iconDimensions = {
    sm: { width: 28, height: 28, titleSize: '1rem', subSize: '0.625rem' },
    md: { width: 34, height: 34, titleSize: '1.2rem', subSize: '0.6875rem' },
    lg: { width: 44, height: 44, titleSize: '1.45rem', subSize: '0.75rem' },
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
      {/* Geometric Tooth + Visual Intelligence Orbital Nexus */}
      <svg
        width={iconDimensions.width}
        height={iconDimensions.height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="logoToothGrad" x1="20" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="60%" stopColor="#0e7490" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <linearGradient id="logoRingGrad" x1="10" y1="50" x2="90" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Outer Circular Optical Ring */}
        <circle cx="50" cy="50" r="46" fill="#f0fdfa" stroke="#ccfbf1" strokeWidth="2" />
        
        {/* Orbital Visual Intelligence Field */}
        <ellipse
          cx="50"
          cy="50"
          rx="38"
          ry="17"
          transform="rotate(-26 50 50)"
          stroke="url(#logoRingGrad)"
          strokeWidth="2.5"
          strokeDasharray="4 2.5"
        />

        {/* Minimal Geometric Tooth Silhouette */}
        <path
          d="M34 32 C34 22, 45 21, 50 27 C55 21, 66 22, 66 32 C66 42, 63 53, 60 70 C58 77, 54 77, 51 68 C50 65, 50 65, 49 68 C46 77, 42 77, 40 70 C37 53, 34 42, 34 32 Z"
          fill="url(#logoToothGrad)"
        />

        {/* Focal Crosshair Center & Insights Node */}
        <circle cx="50" cy="41" r="3.5" fill="#ffffff" />
        <circle cx="50" cy="41" r="1.5" fill="#0891b2" />
        <circle cx="78" cy="38" r="3" fill="#06b6d4" />
        <circle cx="23" cy="62" r="2.5" fill="#14b8a6" />
      </svg>

      {/* Brand Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: iconDimensions.titleSize,
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: '-0.025em',
            }}
          >
            Oral<span style={{ color: '#0e7490' }}>Verse</span>
          </span>
        </div>
        {showTagline && (
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: iconDimensions.subSize,
              fontWeight: 500,
              color: '#64748b',
              letterSpacing: '0.02em',
            }}
          >
            by <strong style={{ color: '#0e7490', fontWeight: 600 }}>Asymptote.ai</strong>
          </span>
        )}
      </div>
    </div>
  );
};
