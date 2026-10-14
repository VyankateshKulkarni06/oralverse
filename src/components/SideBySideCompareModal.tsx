import React, { useState } from 'react';
import { X, Sliders, CheckCircle2, SplitSquareHorizontal } from 'lucide-react';
import { CaseImage } from '../types';

interface SideBySideCompareModalProps {
  imageA: CaseImage;
  imageB: CaseImage;
  onClose: () => void;
}

export const SideBySideCompareModal: React.FC<SideBySideCompareModalProps> = ({
  imageA,
  imageB,
  onClose,
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [mode, setMode] = useState<'split' | 'side-by-side'>('side-by-side');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '1080px', width: '95vw', padding: '1.25rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f1f5f9',
            paddingBottom: '0.875rem',
            marginBottom: '1rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a' }}>
              Intraoral Photograph Comparison Studio
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Comparative visual inspection of multiple anatomical angles
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                display: 'flex',
                backgroundColor: '#f1f5f9',
                padding: '0.1875rem',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <button
                onClick={() => setMode('side-by-side')}
                className="btn btn-sm"
                style={{
                  backgroundColor: mode === 'side-by-side' ? '#ffffff' : 'transparent',
                  color: mode === 'side-by-side' ? '#0e7490' : '#64748b',
                  fontSize: '0.75rem',
                }}
              >
                Dual Pane
              </button>
              <button
                onClick={() => setMode('split')}
                className="btn btn-sm"
                style={{
                  backgroundColor: mode === 'split' ? '#ffffff' : 'transparent',
                  color: mode === 'split' ? '#0e7490' : '#64748b',
                  fontSize: '0.75rem',
                }}
              >
                Split Wipe
              </button>
            </div>

            <button onClick={onClose} className="btn btn-ghost btn-sm" aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Comparison Stage */}
        {mode === 'side-by-side' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              backgroundColor: '#020617',
              padding: '1rem',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            {/* Left Image Pane */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '0.75rem' }}>
                <span style={{ fontWeight: 600 }}>Image A: {imageA.viewLabel}</span>
                <span style={{ color: '#34d399' }}>Pass ({imageA.qualityScore}%)</span>
              </div>
              <div
                style={{
                  height: '420px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  backgroundColor: '#090d16',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={imageA.url}
                  alt={imageA.viewLabel}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                Resolution: {imageA.resolution} • Case {imageA.caseId}
              </div>
            </div>

            {/* Right Image Pane */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '0.75rem' }}>
                <span style={{ fontWeight: 600 }}>Image B: {imageB.viewLabel}</span>
                <span style={{ color: '#34d399' }}>Pass ({imageB.qualityScore}%)</span>
              </div>
              <div
                style={{
                  height: '420px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  backgroundColor: '#090d16',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={imageB.url}
                  alt={imageB.viewLabel}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                Resolution: {imageB.resolution} • Case {imageB.caseId}
              </div>
            </div>
          </div>
        ) : (
          /* Split Wipe Overlay Mode */
          <div
            style={{
              position: 'relative',
              height: '460px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              backgroundColor: '#020617',
            }}
          >
            <img
              src={imageB.url}
              alt="Background"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: `${sliderPos}%`,
                overflow: 'hidden',
                borderRight: '2px solid #38bdf8',
              }}
            >
              <img
                src={imageA.url}
                alt="Foreground"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Slider bar control */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '10%',
                width: '80%',
                zIndex: 20,
                accentColor: '#0e7490',
              }}
            />
          </div>
        )}

        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
