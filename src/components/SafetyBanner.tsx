import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export const SafetyBanner: React.FC = () => {
  return (
    <div className="safety-banner">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShieldAlert size={14} color="#0e7490" style={{ flexShrink: 0 }} />
        <span>
          <strong>Clinical Framing:</strong> OralVerse provides AI-assisted visual review concepts. It does not replace professional examination, clinical judgment, or appropriate diagnostic procedures.
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: '#0d9488',
            fontSize: '0.6875rem',
          }}
        >
          <Info size={12} />
          Simulated Sandbox
        </span>
      </div>
    </div>
  );
};
