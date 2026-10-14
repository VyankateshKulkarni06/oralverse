import React, { useState } from 'react';
import {
  UploadCloud,
  FileImage,
  CheckCircle2,
  Trash2,
  Eye,
  Sparkles,
  AlertCircle,
  ArrowRight,
  ShieldAlert,
  Loader2,
  Check,
  RefreshCw,
  Info,
} from 'lucide-react';
import { ImageViewType, QualityStatus, CaseItem } from '../types';

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  url: string;
  viewType: ImageViewType;
  quality: QualityStatus;
  qualityScore: number;
}

interface NewAnalysisPageProps {
  onCaseCreated: (newCase: CaseItem) => void;
  onNavigateToCaseReview: (caseId: string) => void;
}

export const NewAnalysisPage: React.FC<NewAnalysisPageProps> = ({
  onCaseCreated,
  onNavigateToCaseReview,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [files, setFiles] = useState<UploadedFileItem[]>([
    {
      id: 'demo-sample-1',
      name: 'frontal-occlusion-sample.jpg',
      size: '2.4 MB',
      url: '/images/cases/frontal.jpg',
      viewType: 'frontal',
      quality: 'pass',
      qualityScore: 97,
    },
    {
      id: 'demo-sample-2',
      name: 'upper-arch-mirror-sample.jpg',
      size: '2.1 MB',
      url: '/images/cases/upper-occlusal.jpg',
      viewType: 'upper_occlusal',
      quality: 'pass',
      qualityScore: 95,
    },
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStageText, setAnalysisStageText] = useState('');
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [createdCaseId, setCreatedCaseId] = useState<string | null>(null);

  // Handle local file selection
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const newItems: UploadedFileItem[] = selectedFiles.map((f, i) => ({
        id: `local-${Date.now()}-${i}`,
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        url: URL.createObjectURL(f),
        viewType: i === 0 ? 'frontal' : i === 1 ? 'upper_occlusal' : 'lower_occlusal',
        quality: 'pass',
        qualityScore: 94 + (i % 5),
      }));
      setFiles((prev) => [...prev, ...newItems]);
      setCurrentStep(2);
    }
  };

  // Add standard full clinical demo set
  const handleLoadFullSampleSet = () => {
    setFiles([
      {
        id: 'sample-frontal',
        name: 'oral-frontal-arch-demo.jpg',
        size: '2.4 MB',
        url: '/images/cases/frontal.jpg',
        viewType: 'frontal',
        quality: 'pass',
        qualityScore: 97,
      },
      {
        id: 'sample-upper',
        name: 'oral-maxillary-occlusal.jpg',
        size: '2.1 MB',
        url: '/images/cases/upper-occlusal.jpg',
        viewType: 'upper_occlusal',
        quality: 'pass',
        qualityScore: 95,
      },
      {
        id: 'sample-lower',
        name: 'oral-mandibular-occlusal.jpg',
        size: '2.3 MB',
        url: '/images/cases/lower-occlusal.jpg',
        viewType: 'lower_occlusal',
        quality: 'pass',
        qualityScore: 96,
      },
      {
        id: 'sample-lateral',
        name: 'oral-buccal-quadrant.jpg',
        size: '2.2 MB',
        url: '/images/cases/lateral-buccal.jpg',
        viewType: 'lateral_buccal_right',
        quality: 'pass',
        qualityScore: 98,
      },
    ]);
    setCurrentStep(2);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const updateViewType = (id: string, view: ImageViewType) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, viewType: view } : f))
    );
  };

  // Simulate AI Analysis pipeline
  const runSimulatedAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(10);
    setAnalysisStageText('Checking illumination, contrast, and focus quality...');

    setTimeout(() => {
      setAnalysisProgress(35);
      setAnalysisStageText('Detecting anatomical orientation and camera perspective...');
    }, 800);

    setTimeout(() => {
      setAnalysisProgress(65);
      setAnalysisStageText('Identifying FDI dental landmarks and occlusal surfaces...');
    }, 1600);

    setTimeout(() => {
      setAnalysisProgress(90);
      setAnalysisStageText('Compiling visual regions of interest & generating confidence overlays...');
    }, 2400);

    setTimeout(() => {
      setAnalysisProgress(100);
      setIsAnalyzing(false);
      setAnalysisCompleted(true);
      setCurrentStep(4);

      // Create a new simulated case
      const newId = `OV-DEMO-${Math.floor(1050 + Math.random() * 50)}`;
      setCreatedCaseId(newId);

      const newCase: CaseItem = {
        id: newId,
        patientReference: `PT-DEMO-${Math.floor(2000 + Math.random() * 8000)}`,
        patientAgeGroup: 'Adult 30-39',
        dateAdded: new Date().toISOString().replace('T', ' ').substring(0, 16),
        clinician: 'Dr. A. Sharma',
        reviewStatus: 'ready',
        overallQuality: 'pass',
        imageCount: files.length,
        thumbnail: files[0]?.url || '/images/cases/frontal.jpg',
        clinicalNotes: 'Newly generated demo analysis session from local intraoral photographs.',
        visualFindingsSummary: `${files.length} views processed. Landmarks segmented and ready for clinician review.`,
        tags: ['New Analysis', 'Visual Assist', 'Sandbox Demo'],
        images: files.map((f, i) => ({
          id: `img-${newId}-${i + 1}`,
          caseId: newId,
          viewType: f.viewType,
          viewLabel:
            f.viewType === 'frontal'
              ? 'Frontal Arch Occlusion'
              : f.viewType === 'upper_occlusal'
              ? 'Maxillary Occlusal View'
              : f.viewType === 'lower_occlusal'
              ? 'Mandibular Occlusal Arch'
              : 'Right Lateral Buccal View',
          url: f.url,
          capturedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          resolution: '4032 × 3024',
          quality: f.quality,
          qualityScore: f.qualityScore,
          qualityIndicators: {
            focusSharpness: 'optimal',
            lightingExposure: 'optimal',
            fieldCoverage: 'complete',
            salivaContamination: 'low',
          },
          annotations: [
            {
              id: `anno-gen-${i}-1`,
              toothNumber: f.viewType === 'frontal' ? '11, 21' : '16',
              label: 'Surface Symmetry & Enamel Boundary',
              category: 'Area for Clinician Review',
              confidenceText: 'Simulated visual flag (Demo)',
              description: 'Clear enamel margins observed. Visual review recommended to verify baseline contour.',
              recommendation: 'Evaluate under direct magnification during clinical inspection.',
              x: 40,
              y: 45,
              width: 15,
              height: 15,
              severity: 'caution',
            },
          ],
          toothSegments: [
            { fdiNumber: '11', universalNumber: '#8', name: 'Central Incisor', quadrant: 'UR', x: 45, y: 45, status: 'normal' },
            { fdiNumber: '21', universalNumber: '#9', name: 'Central Incisor', quadrant: 'UL', x: 55, y: 45, status: 'normal' },
          ],
        })),
      };

      onCaseCreated(newCase);
    }, 3200);
  };

  const steps = [
    { num: 1, label: 'Add Images' },
    { num: 2, label: 'Check Quality' },
    { num: 3, label: 'Review Image Set' },
    { num: 4, label: 'Simulate Analysis' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
      {/* Workflow Stepper */}
      <div
        className="card"
        style={{
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {steps.map((st, idx) => {
            const isPassed = currentStep > st.num || analysisCompleted;
            const isCurrent = currentStep === st.num && !analysisCompleted;

            return (
              <React.Fragment key={st.num}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: files.length > 0 ? 'pointer' : 'default',
                  }}
                  onClick={() => {
                    if (files.length > 0 && !isAnalyzing) {
                      setCurrentStep(st.num as any);
                    }
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      backgroundColor: isPassed
                        ? '#0e7490'
                        : isCurrent
                        ? '#ecfeff'
                        : '#f1f5f9',
                      border: isCurrent ? '2px solid #0e7490' : '1px solid #cbd5e1',
                      color: isPassed ? '#ffffff' : isCurrent ? '#0e7490' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {isPassed ? <Check size={14} /> : st.num}
                  </div>
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? '#0f172a' : '#64748b',
                    }}
                  >
                    {st.label}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    style={{
                      width: '32px',
                      height: '2px',
                      backgroundColor: isPassed ? '#0e7490' : '#e2e8f0',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <button
          onClick={handleLoadFullSampleSet}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.75rem' }}
        >
          <RefreshCw size={13} />
          <span>Load Standard Dental Photo Series</span>
        </button>
      </div>

      {/* Main Upload Zone */}
      <div
        className="card"
        style={{
          padding: '2.5rem 1.5rem',
          border: '2px dashed #cbd5e1',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: '#fafbfc',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleFileInput}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            cursor: 'pointer',
            zIndex: 10,
          }}
        />

        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: '#ecfeff',
            border: '1px solid #a5f3fc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0e7490',
            marginBottom: '1rem',
          }}
        >
          <UploadCloud size={28} />
        </div>

        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.375rem' }}>
          Drag and drop intraoral photographs here
        </h3>
        <p style={{ fontSize: '0.8125rem', color: '#64748b', maxWidth: '480px', lineHeight: 1.4, marginBottom: '1rem' }}>
          Supports high-resolution JPEG, PNG, or WEBP photos captured with clinical ring flash and cheek retractors.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="btn btn-secondary btn-sm" style={{ pointerEvents: 'none' }}>
            Browse Local Photos
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            or click above to pick files
          </span>
        </div>
      </div>

      {/* Privacy & Client-side Safety notice */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.875rem 1.25rem',
          backgroundColor: '#f0fdfa',
          border: '1px solid #ccfbf1',
          borderRadius: 'var(--radius-lg)',
          fontSize: '0.75rem',
          color: '#0f766e',
        }}
      >
        <ShieldAlert size={18} color="#0e7490" style={{ flexShrink: 0 }} />
        <span>
          <strong>Client-Side Demo Sandbox:</strong> Selected photographs remain entirely within your current browser session. Files are neither transmitted nor stored on remote servers. No patient health identifiers are collected.
        </span>
      </div>

      {/* Uploaded Images Gallery & Orientation Tagging */}
      {files.length > 0 && (
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                Image Set ({files.length} views queued)
              </h4>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Verify perspective labels and simulated optical pass status
              </span>
            </div>
            <button
              onClick={() => setFiles([])}
              className="btn btn-ghost btn-sm"
              style={{ color: '#e11d48', fontSize: '0.75rem' }}
            >
              <Trash2 size={14} />
              <span>Clear All</span>
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            {files.map((file) => (
              <div
                key={file.id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: '150px', position: 'relative', backgroundColor: '#0f172a' }}>
                  <img
                    src={file.url}
                    alt={file.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: 'rgba(15, 23, 42, 0.75)',
                      color: '#34d399',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      padding: '0.125rem 0.375rem',
                      borderRadius: 'var(--radius-sm)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    Quality: {file.qualityScore}%
                  </span>
                </div>

                <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {file.name}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#64748b' }}>
                    <span>Size: {file.size}</span>
                    <span style={{ color: '#059669', fontWeight: 600 }}>Pass</span>
                  </div>

                  {/* View Type Selector */}
                  <div>
                    <label style={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: 500, display: 'block', marginBottom: '2px' }}>
                      Clinical Angle:
                    </label>
                    <select
                      value={file.viewType}
                      onChange={(e) => updateViewType(file.id, e.target.value as ImageViewType)}
                      style={{
                        width: '100%',
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        border: '1px solid #cbd5e1',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        outline: 'none',
                      }}
                    >
                      <option value="frontal">Frontal Arch Occlusion</option>
                      <option value="upper_occlusal">Maxillary Occlusal Mirror</option>
                      <option value="lower_occlusal">Mandibular Occlusal Arch</option>
                      <option value="lateral_buccal_right">Right Lateral Buccal</option>
                      <option value="lateral_buccal_left">Left Lateral Buccal</option>
                    </select>
                  </div>

                  <button
                    onClick={() => removeFile(file.id)}
                    className="btn btn-ghost btn-sm"
                    style={{ color: '#e11d48', padding: '0.25rem', marginTop: '0.25rem', fontSize: '0.6875rem', justifyContent: 'flex-start' }}
                  >
                    <Trash2 size={12} />
                    <span>Remove Photo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Analysis Action Section */}
          <div
            style={{
              borderTop: '1px solid #f1f5f9',
              paddingTop: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {isAnalyzing && (
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Loader2 size={18} className="spin" color="#0e7490" style={{ animation: 'spin 1s linear infinite' }} />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0f172a' }}>
                      {analysisStageText}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0e7490', fontFamily: 'var(--font-mono)' }}>
                    {analysisProgress}%
                  </span>
                </div>

                <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${analysisProgress}%`,
                      backgroundColor: '#0e7490',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>
            )}

            {analysisCompleted && createdCaseId && (
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: '#059669',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#065f46' }}>
                      Simulated Analysis Complete — Case {createdCaseId}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#047857' }}>
                      Tooth landmarks segmented. High-resolution overlays generated for clinician inspection.
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToCaseReview(createdCaseId)}
                  className="btn btn-primary btn-sm"
                  style={{ backgroundColor: '#059669', borderColor: '#059669' }}
                >
                  <span>Open in Case Review Studio</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

            {!isAnalyzing && !analysisCompleted && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Ready to simulate visual intelligence segmentation on {files.length} images.
                </span>

                <button
                  onClick={runSimulatedAnalysis}
                  className="btn btn-primary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Sparkles size={18} />
                  <span>Preview AI Analysis</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
