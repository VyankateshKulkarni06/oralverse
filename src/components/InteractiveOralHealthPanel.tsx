import React, { useState } from 'react';
import {
  Eye,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sliders,
} from 'lucide-react';
import { CaseItem, AnnotationROI, ToothSegment } from '../types';

interface InteractiveOralHealthPanelProps {
  currentCase: CaseItem;
  onOpenCaseReview: (caseId: string, imageId?: string) => void;
  notationSystem: 'FDI' | 'Universal';
}

export const InteractiveOralHealthPanel: React.FC<InteractiveOralHealthPanelProps> = ({
  currentCase,
  onOpenCaseReview,
  notationSystem,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>('anno-2');
  const [selectedToothSegment, setSelectedToothSegment] = useState<ToothSegment | null>(null);
  const [showOverlays, setShowOverlays] = useState(true);
  const [showToothNumbers, setShowToothNumbers] = useState(true);

  const activeImage = currentCase.images[activeImageIndex] || currentCase.images[0];
  const selectedAnnotation: AnnotationROI | undefined = activeImage.annotations.find(
    (a) => a.id === selectedAnnotationId
  );

  return (
    <div
      className="card"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          borderBottom: '1px solid #f1f5f9',
          paddingBottom: '0.875rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#ecfeff',
              border: '1px solid #a5f3fc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0e7490',
            }}
          >
            <Sparkles size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                Oral Health Visual Intelligence Overview
              </h3>
              <span className="badge badge-brand">
                Case {currentCase.id}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Interactive intraoral photograph with simulated segmentation & tooth landmarks
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* View selector pills */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#f1f5f9',
              padding: '0.1875rem',
              borderRadius: 'var(--radius-md)',
              gap: '0.25rem',
            }}
          >
            {currentCase.images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setSelectedAnnotationId(img.annotations[0]?.id || null);
                  setSelectedToothSegment(null);
                }}
                className="btn btn-sm"
                style={{
                  padding: '0.25rem 0.625rem',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  backgroundColor: activeImageIndex === idx ? '#ffffff' : 'transparent',
                  color: activeImageIndex === idx ? '#0e7490' : '#64748b',
                  boxShadow: activeImageIndex === idx ? 'var(--shadow-xs)' : 'none',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {img.viewType === 'frontal'
                  ? 'Frontal'
                  : img.viewType === 'upper_occlusal'
                  ? 'Upper Arch'
                  : img.viewType === 'lower_occlusal'
                  ? 'Lower Arch'
                  : 'Lateral'}
              </button>
            ))}
          </div>

          {/* Toggle overlays */}
          <button
            onClick={() => setShowOverlays(!showOverlays)}
            className={`btn btn-sm ${showOverlays ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ fontSize: '0.75rem' }}
            title="Toggle Visual Overlays"
          >
            <Layers size={14} color={showOverlays ? '#0e7490' : '#64748b'} />
            <span>Overlays: {showOverlays ? 'On' : 'Off'}</span>
          </button>

          {/* Toggle tooth numbering */}
          <button
            onClick={() => setShowToothNumbers(!showToothNumbers)}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem' }}
            title="Toggle Tooth Numbering"
          >
            <Sliders size={14} />
            <span>{notationSystem} Labels</span>
          </button>

          <button
            onClick={() => onOpenCaseReview(currentCase.id, activeImage.id)}
            className="btn btn-primary btn-sm"
            style={{ fontSize: '0.75rem' }}
          >
            <span>Full Case Review</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Main interactive visualization layout: Large Image Viewer + Adjacent Details Inspector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.65fr) minmax(320px, 1fr)',
          gap: '1.25rem',
          alignItems: 'stretch',
        }}
      >
        {/* Left: Interactive Image with SVG Annotations Layer */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            backgroundColor: '#0f172a',
            border: '1px solid #cbd5e1',
            minHeight: '440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Intraoral Photo */}
          <img
            src={activeImage.url}
            alt={activeImage.viewLabel}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.2s ease',
            }}
          />

          {/* SVG Overlay for Segmentation & Annotations */}
          {showOverlays && (
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Tooth segments / boundaries */}
              {activeImage.toothSegments.map((seg) => {
                const isSelected = selectedToothSegment?.fdiNumber === seg.fdiNumber;
                return (
                  <g
                    key={seg.fdiNumber}
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedToothSegment(seg);
                      setSelectedAnnotationId(null);
                    }}
                  >
                    {/* Tooth Boundary Center Indicator */}
                    <circle
                      cx={seg.x}
                      cy={seg.y}
                      r={isSelected ? 4 : 2.5}
                      fill={
                        seg.status === 'review_indicated'
                          ? '#f59e0b'
                          : '#06b6d4'
                      }
                      fillOpacity={0.8}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 1.5 : 0.8}
                    />

                    {/* Tooth Number Label */}
                    {showToothNumbers && (
                      <g>
                        <rect
                          x={seg.x - 3.5}
                          y={seg.y - 7}
                          width={7}
                          height={4}
                          rx={1}
                          fill="rgba(15, 23, 42, 0.85)"
                          stroke={isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.4)'}
                          strokeWidth={isSelected ? 0.6 : 0.3}
                        />
                        <text
                          x={seg.x}
                          y={seg.y - 4.2}
                          fontSize={2.5}
                          fontFamily="var(--font-mono)"
                          fontWeight="700"
                          fill="#ffffff"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {notationSystem === 'FDI' ? seg.fdiNumber : seg.universalNumber}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Highlighted Bounding Boxes for Visual Findings (ROI) */}
              {activeImage.annotations.map((anno) => {
                const isSelected = selectedAnnotationId === anno.id;
                const strokeColor =
                  anno.severity === 'priority'
                    ? '#f43f5e'
                    : anno.severity === 'caution'
                    ? '#f59e0b'
                    : '#06b6d4';

                return (
                  <g
                    key={anno.id}
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedAnnotationId(anno.id);
                      setSelectedToothSegment(null);
                    }}
                  >
                    {/* Bounding Box */}
                    <rect
                      x={anno.x}
                      y={anno.y}
                      width={anno.width}
                      height={anno.height}
                      rx={1.5}
                      fill={strokeColor}
                      fillOpacity={isSelected ? 0.22 : 0.08}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 1.5 : 0.9}
                      strokeDasharray={isSelected ? 'none' : '3 1.5'}
                      filter={isSelected ? 'url(#glowFilter)' : 'none'}
                    />

                    {/* Corner Reticle brackets */}
                    <path
                      d={`M ${anno.x} ${anno.y + 3} L ${anno.x} ${anno.y} L ${anno.x + 3} ${anno.y}
                          M ${anno.x + anno.width - 3} ${anno.y} L ${anno.x + anno.width} ${anno.y} L ${anno.x + anno.width} ${anno.y + 3}
                          M ${anno.x} ${anno.y + anno.height - 3} L ${anno.x} ${anno.y + anno.height} L ${anno.x + 3} ${anno.y + anno.height}
                          M ${anno.x + anno.width - 3} ${anno.y + anno.height} L ${anno.x + anno.width} ${anno.y + anno.height} L ${anno.x + anno.width} ${anno.y + anno.height - 3}`}
                      stroke={strokeColor}
                      strokeWidth={1.2}
                      fill="none"
                    />

                    {/* Annotation Badge Pin */}
                    <circle
                      cx={anno.x + anno.width / 2}
                      cy={anno.y}
                      r={2}
                      fill={strokeColor}
                      stroke="#ffffff"
                      strokeWidth={0.6}
                    />
                  </g>
                );
              })}
            </svg>
          )}

          {/* Bottom Overlay Controls bar */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              right: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(8px)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem 0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#ffffff',
              fontSize: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontWeight: 600 }}>{activeImage.viewLabel}</span>
              <span style={{ color: '#94a3b8' }}>•</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#cbd5e1' }}>
                {activeImage.resolution}
              </span>
              <span style={{ color: '#94a3b8' }}>•</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: '#34d399',
                  fontWeight: 600,
                }}
              >
                <CheckCircle2 size={12} />
                Quality: {activeImage.qualityScore}% (Pass)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.6875rem', color: '#cbd5e1' }}>
                Click tooth or marker to inspect
              </span>
              <button
                onClick={() => onOpenCaseReview(currentCase.id, activeImage.id)}
                className="btn btn-ghost btn-sm"
                style={{ color: '#ffffff', padding: '0.125rem 0.375rem' }}
                title="Expand in Case Review"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Adjacent Findings & Segmentation Details Panel */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#0e7490',
                }}
              >
                Visual Finding Details
              </span>
              <span
                style={{
                  fontSize: '0.6875rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  padding: '0.125rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  color: '#64748b',
                  fontWeight: 500,
                }}
              >
                {selectedAnnotation
                  ? 'Finding Region'
                  : selectedToothSegment
                  ? 'Tooth Landmark'
                  : 'Overview'}
              </span>
            </div>

            {selectedAnnotation ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.875rem',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor:
                          selectedAnnotation.severity === 'priority'
                            ? '#f43f5e'
                            : selectedAnnotation.severity === 'caution'
                            ? '#f59e0b'
                            : '#06b6d4',
                      }}
                    />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a' }}>
                      {selectedAnnotation.label}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.6875rem',
                      color: '#64748b',
                      marginTop: '0.25rem',
                    }}
                  >
                    <span>Tooth: <strong>#{selectedAnnotation.toothNumber}</strong></span>
                    <span>•</span>
                    <span style={{ color: '#0e7490', fontWeight: 600 }}>
                      {selectedAnnotation.category}
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.8125rem', color: '#334155', lineHeight: 1.5 }}>
                  <strong style={{ color: '#0f172a' }}>Visual Observation: </strong>
                  {selectedAnnotation.description}
                </div>

                <div
                  style={{
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fef3c7',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem',
                    fontSize: '0.75rem',
                    color: '#92400e',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <AlertCircle size={14} color="#d97706" />
                    Clinician Review Prompt
                  </div>
                  <div>{selectedAnnotation.recommendation}</div>
                </div>

                <div
                  style={{
                    fontSize: '0.6875rem',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    backgroundColor: '#f1f5f9',
                    padding: '0.375rem 0.625rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <Info size={12} color="#0e7490" />
                  <span>{selectedAnnotation.confidenceText}</span>
                </div>
              </div>
            ) : selectedToothSegment ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.875rem',
                  }}
                >
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
                    {selectedToothSegment.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                    FDI: <strong>#{selectedToothSegment.fdiNumber}</strong> | Universal:{' '}
                    <strong>{selectedToothSegment.universalNumber}</strong> ({selectedToothSegment.quadrant})
                  </div>
                </div>

                <div style={{ fontSize: '0.8125rem', color: '#334155' }}>
                  <strong>Landmark Status: </strong>
                  <span
                    style={{
                      color:
                        selectedToothSegment.status === 'review_indicated'
                          ? '#d97706'
                          : '#059669',
                      fontWeight: 600,
                    }}
                  >
                    {selectedToothSegment.status === 'review_indicated'
                      ? 'Visual Area of Interest'
                      : 'Anatomically Intact'}
                  </span>
                </div>
                {selectedToothSegment.notes && (
                  <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                    {selectedToothSegment.notes}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ fontSize: '0.8125rem', color: '#64748b', fontStyle: 'italic' }}>
                Select an annotation box or tooth marker on the intraoral image to inspect visual findings and clinical notes.
              </div>
            )}
          </div>

          {/* Legend and Navigation */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
              Overlay Markers Legend
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', fontSize: '0.6875rem', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#06b6d4' }} />
                <span>Enamel / Landmark</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span>Area of Interest</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f43f5e' }} />
                <span>Marginal Gingiva</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
