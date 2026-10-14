import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Layers,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Save,
  ChevronLeft,
  ChevronRight,
  Info,
  ShieldCheck,
  Eye,
  FileText,
  Tag,
  Share2,
} from 'lucide-react';
import { CaseItem, AnnotationROI, ToothSegment, CaseReviewStatus } from '../types';

interface CaseReviewPageProps {
  currentCase: CaseItem;
  allCases: CaseItem[];
  onSelectCase: (caseId: string) => void;
  onUpdateCaseNotes: (caseId: string, notes: string) => void;
  onUpdateCaseStatus: (caseId: string, status: CaseReviewStatus) => void;
  notationSystem: 'FDI' | 'Universal';
  onShowToast: (msg: string) => void;
}

export const CaseReviewPage: React.FC<CaseReviewPageProps> = ({
  currentCase,
  allCases,
  onSelectCase,
  onUpdateCaseNotes,
  onUpdateCaseStatus,
  notationSystem,
  onShowToast,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [showOverlays, setShowOverlays] = useState(true);
  const [showToothNumbers, setShowToothNumbers] = useState(true);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>('anno-2');
  const [selectedTooth, setSelectedTooth] = useState<ToothSegment | null>(null);
  const [notesText, setNotesText] = useState(currentCase.clinicalNotes);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeImage = currentCase.images[selectedImageIndex] || currentCase.images[0];
  const selectedAnnotation: AnnotationROI | undefined = activeImage?.annotations?.find(
    (a) => a.id === selectedAnnotationId
  );

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(250, Math.max(50, prev + delta)));
  };

  const handleResetView = () => {
    setZoomLevel(100);
    setBrightness(100);
    setContrast(100);
  };

  const handleSaveNotes = () => {
    onUpdateCaseNotes(currentCase.id, notesText);
    onShowToast(`Notes saved for Case ${currentCase.id}`);
  };

  const handleToggleReviewed = () => {
    const nextStatus = currentCase.reviewStatus === 'reviewed' ? 'in_review' : 'reviewed';
    onUpdateCaseStatus(currentCase.id, nextStatus);
    onShowToast(`Case ${currentCase.id} marked as ${nextStatus === 'reviewed' ? 'Reviewed' : 'In Review'}`);
  };

  const getStatusBadge = (st: CaseReviewStatus) => {
    switch (st) {
      case 'reviewed':
        return <span className="badge badge-pass"><CheckCircle2 size={12} /> Reviewed</span>;
      case 'in_review':
        return <span className="badge badge-info"><ShieldCheck size={12} /> In Review</span>;
      case 'ready':
        return <span className="badge badge-brand"><Clock size={12} /> Ready</span>;
      case 'retake_recommended':
        return <span className="badge badge-danger"><AlertTriangle size={12} /> Retake Advised</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      {/* Top Clinical Case Header */}
      <div
        className="card"
        style={{
          padding: '1rem 1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                {currentCase.id}
              </h2>
              {getStatusBadge(currentCase.reviewStatus)}
              <span className="badge badge-demo">{currentCase.patientReference}</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
              Captured: {currentCase.dateAdded} • {currentCase.imageCount} Views in Series • Evaluated by {currentCase.clinician}
            </div>
          </div>
        </div>

        {/* Quick Case Switcher Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#475569' }}>
            <span>Switch Case:</span>
            <select
              value={currentCase.id}
              onChange={(e) => {
                onSelectCase(e.target.value);
                setSelectedImageIndex(0);
                setSelectedAnnotationId(null);
                setSelectedTooth(null);
              }}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.3125rem 0.625rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#0e7490',
                outline: 'none',
              }}
            >
              {allCases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id} ({c.patientReference})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleToggleReviewed}
            className={`btn btn-sm ${currentCase.reviewStatus === 'reviewed' ? 'btn-secondary' : 'btn-primary'}`}
          >
            <CheckCircle2 size={14} />
            <span>{currentCase.reviewStatus === 'reviewed' ? 'Mark In Review' : 'Mark Reviewed'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left Viewer Workspace + Right Findings & Clinical Notes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.85fr) minmax(360px, 1.15fr)',
          gap: '1.25rem',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Image Viewer + Filmstrip */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Main Viewer Card */}
          <div
            className="card"
            style={{
              padding: '0.75rem',
              backgroundColor: '#090d16',
              border: '1px solid #1e293b',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Viewer Top Toolbar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                padding: '0.5rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                color: '#cbd5e1',
                fontSize: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontWeight: 600, color: '#ffffff' }}>
                  {activeImage?.viewLabel || 'Intraoral Photograph'}
                </span>
                <span style={{ color: '#64748b' }}>|</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#94a3b8' }}>
                  {activeImage?.resolution}
                </span>
              </div>

              {/* Viewer Interactive Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => handleZoom(-15)}
                  className="btn btn-ghost btn-sm"
                  style={{ color: '#cbd5e1', padding: '0.25rem 0.4rem' }}
                  title="Zoom Out"
                >
                  <ZoomOut size={15} />
                </button>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', minWidth: '40px', textAlign: 'center' }}>
                  {zoomLevel}%
                </span>
                <button
                  onClick={() => handleZoom(15)}
                  className="btn btn-ghost btn-sm"
                  style={{ color: '#cbd5e1', padding: '0.25rem 0.4rem' }}
                  title="Zoom In"
                >
                  <ZoomIn size={15} />
                </button>

                <button
                  onClick={handleResetView}
                  className="btn btn-ghost btn-sm"
                  style={{ color: '#cbd5e1', padding: '0.25rem 0.4rem' }}
                  title="Reset Zoom & Lighting"
                >
                  <RotateCcw size={14} />
                </button>

                <button
                  onClick={() => setShowOverlays(!showOverlays)}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: showOverlays ? '#0e7490' : '#1e293b',
                    color: '#ffffff',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.6875rem',
                  }}
                  title="Toggle Annotations Layer"
                >
                  <Layers size={13} />
                  <span>Overlay</span>
                </button>

                <button
                  onClick={() => setShowToothNumbers(!showToothNumbers)}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: showToothNumbers ? '#0e7490' : '#1e293b',
                    color: '#ffffff',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.6875rem',
                  }}
                  title="Toggle Tooth Numbers"
                >
                  <span>{notationSystem}</span>
                </button>
              </div>
            </div>

            {/* Stage: Image Canvas & SVG Overlay */}
            <div
              style={{
                position: 'relative',
                minHeight: '480px',
                height: isFullscreen ? '780px' : '520px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundColor: '#020617',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              {activeImage ? (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `scale(${zoomLevel / 100})`,
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                    transition: 'transform 0.15s ease',
                  }}
                >
                  <img
                    src={activeImage.url}
                    alt={activeImage.viewLabel}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      display: 'block',
                      userSelect: 'none',
                    }}
                  />

                  {/* SVG Overlays */}
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
                      {/* Tooth Landmark Segments */}
                      {activeImage.toothSegments?.map((seg) => {
                        const isSelected = selectedTooth?.fdiNumber === seg.fdiNumber;
                        return (
                          <g
                            key={seg.fdiNumber}
                            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                            onClick={() => {
                              setSelectedTooth(seg);
                              setSelectedAnnotationId(null);
                            }}
                          >
                            <circle
                              cx={seg.x}
                              cy={seg.y}
                              r={isSelected ? 3.5 : 2}
                              fill={seg.status === 'review_indicated' ? '#f59e0b' : '#06b6d4'}
                              fillOpacity={0.85}
                              stroke="#ffffff"
                              strokeWidth={isSelected ? 1.5 : 0.6}
                            />
                            {showToothNumbers && (
                              <g>
                                <rect
                                  x={seg.x - 3.2}
                                  y={seg.y - 6}
                                  width={6.4}
                                  height={3.8}
                                  rx={0.8}
                                  fill="rgba(15, 23, 42, 0.9)"
                                  stroke={isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.5)'}
                                  strokeWidth={isSelected ? 0.6 : 0.3}
                                />
                                <text
                                  x={seg.x}
                                  y={seg.y - 3.6}
                                  fontSize={2.4}
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

                      {/* ROI Findings Boxes */}
                      {activeImage.annotations?.map((anno) => {
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
                              setSelectedTooth(null);
                            }}
                          >
                            <rect
                              x={anno.x}
                              y={anno.y}
                              width={anno.width}
                              height={anno.height}
                              rx={1.5}
                              fill={strokeColor}
                              fillOpacity={isSelected ? 0.25 : 0.08}
                              stroke={strokeColor}
                              strokeWidth={isSelected ? 1.6 : 0.9}
                              strokeDasharray={isSelected ? 'none' : '3 1.5'}
                            />

                            {/* Center Target Marker */}
                            <circle
                              cx={anno.x + anno.width / 2}
                              cy={anno.y}
                              r={2.2}
                              fill={strokeColor}
                              stroke="#ffffff"
                              strokeWidth={0.8}
                            />
                          </g>
                        );
                      })}
                    </svg>
                  )}
                </div>
              ) : (
                <div style={{ color: '#64748b', fontSize: '0.875rem' }}>No image loaded</div>
              )}
            </div>

            {/* Bottom Lighting & Adjustment Sliders */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.375rem 0.5rem',
                backgroundColor: 'rgba(15, 23, 42, 0.65)',
                borderRadius: 'var(--radius-md)',
                color: '#cbd5e1',
                fontSize: '0.6875rem',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                <span style={{ color: '#94a3b8' }}>Brightness</span>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  style={{ width: '100px', accentColor: '#0e7490' }}
                />
                <span style={{ color: '#94a3b8' }}>Contrast</span>
                <input
                  type="range"
                  min="70"
                  max="150"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  style={{ width: '100px', accentColor: '#0e7490' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#34d399', fontWeight: 600 }}>
                  Quality Score: {activeImage?.qualityScore || 95}%
                </span>
              </div>
            </div>
          </div>

          {/* Filmstrip Carousel */}
          <div
            className="card"
            style={{
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              overflowX: 'auto',
            }}
          >
            <button
              onClick={() => setSelectedImageIndex((prev) => Math.max(0, prev - 1))}
              disabled={selectedImageIndex === 0}
              className="btn btn-secondary btn-icon"
              style={{ width: 28, height: 28 }}
            >
              <ChevronLeft size={16} />
            </button>

            <div style={{ display: 'flex', gap: '0.75rem', flex: 1 }}>
              {currentCase.images.map((img, idx) => {
                const isActive = selectedImageIndex === idx;
                return (
                  <div
                    key={img.id}
                    onClick={() => {
                      setSelectedImageIndex(idx);
                      setSelectedAnnotationId(img.annotations[0]?.id || null);
                      setSelectedTooth(null);
                    }}
                    style={{
                      width: '100px',
                      height: '70px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: isActive ? '2px solid #0e7490' : '1px solid #cbd5e1',
                      position: 'relative',
                      boxShadow: isActive ? '0 0 0 2px rgba(14, 116, 144, 0.25)' : 'none',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={img.url}
                      alt={img.viewLabel}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.75)',
                        color: '#ffffff',
                        fontSize: '0.625rem',
                        padding: '1px 4px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {img.viewType === 'frontal'
                        ? 'Frontal'
                        : img.viewType === 'upper_occlusal'
                        ? 'Upper Arch'
                        : img.viewType === 'lower_occlusal'
                        ? 'Lower Arch'
                        : 'Lateral'}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setSelectedImageIndex((prev) => Math.min(currentCase.images.length - 1, prev + 1))}
              disabled={selectedImageIndex === currentCase.images.length - 1}
              className="btn btn-secondary btn-icon"
              style={{ width: 28, height: 28 }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Column: Findings Inspector & Clinician Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Findings Card */}
          <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.625rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={16} color="#0e7490" />
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>
                  Simulated Visual Findings
                </h4>
              </div>
              <span className="badge badge-brand">
                {activeImage?.annotations?.length || 0} Flagged Regions
              </span>
            </div>

            {/* List of Clickable Findings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {activeImage?.annotations?.map((anno) => {
                const isSelected = selectedAnnotationId === anno.id;
                return (
                  <div
                    key={anno.id}
                    onClick={() => {
                      setSelectedAnnotationId(anno.id);
                      setSelectedTooth(null);
                    }}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? '#f0fdfa' : '#ffffff',
                      border: isSelected ? '1px solid #0e7490' : '1px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? 'var(--shadow-xs)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            backgroundColor:
                              anno.severity === 'priority'
                                ? '#f43f5e'
                                : anno.severity === 'caution'
                                ? '#f59e0b'
                                : '#06b6d4',
                          }}
                        />
                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a' }}>
                          {anno.label}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: '#0e7490', fontWeight: 600 }}>
                        #{anno.toothNumber}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.4 }}>
                      {anno.description}
                    </div>

                    {isSelected && (
                      <div
                        style={{
                          marginTop: '0.5rem',
                          padding: '0.5rem',
                          backgroundColor: '#fffbeb',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.6875rem',
                          color: '#92400e',
                        }}
                      >
                        <strong>Clinician recommendation: </strong>
                        {anno.recommendation}
                      </div>
                    )}
                  </div>
                );
              })}

              {(!activeImage?.annotations || activeImage.annotations.length === 0) && (
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', padding: '0.5rem 0' }}>
                  No automated visual flags generated for this view.
                </div>
              )}
            </div>

            {/* Selected Tooth Detail Box */}
            {selectedTooth && (
              <div
                style={{
                  padding: '0.75rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.75rem',
                }}
              >
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedTooth.name}</div>
                <div style={{ color: '#64748b', marginTop: '2px' }}>
                  FDI: #{selectedTooth.fdiNumber} • Universal: {selectedTooth.universalNumber} ({selectedTooth.quadrant})
                </div>
              </div>
            )}
          </div>

          {/* Clinician Notes & Review Action Card */}
          <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} color="#0e7490" />
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>
                  Clinician Observations & Notes
                </h4>
              </div>
              <span style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>Local Session State</span>
            </div>

            <textarea
              rows={4}
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Record diagnostic impressions, probing depths, or follow-up instructions..."
              style={{
                width: '100%',
                fontSize: '0.8125rem',
                padding: '0.625rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #cbd5e1',
                outline: 'none',
                resize: 'vertical',
                lineHeight: 1.45,
                color: '#0f172a',
                backgroundColor: '#ffffff',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                Reviewer: <strong>Dr. A. Sharma</strong>
              </div>
              <button
                onClick={handleSaveNotes}
                className="btn btn-secondary btn-sm"
              >
                <Save size={14} />
                <span>Save Notes</span>
              </button>
            </div>
          </div>

          {/* Safety Disclaimer */}
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.6875rem',
              color: '#64748b',
              lineHeight: 1.4,
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <Info size={14} color="#0e7490" style={{ flexShrink: 0, marginTop: '1px' }} />
            <span>
              OralVerse provides AI-assisted visual review concepts. It does not replace professional examination, clinical judgment, or appropriate diagnostic procedures.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
