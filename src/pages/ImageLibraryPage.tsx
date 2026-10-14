import React, { useState } from 'react';
import {
  Search,
  Filter,
  Maximize2,
  SplitSquareHorizontal,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Eye,
  X,
} from 'lucide-react';
import { CaseItem, CaseImage, ImageViewType, QualityStatus } from '../types';
import { SideBySideCompareModal } from '../components/SideBySideCompareModal';

interface ImageLibraryPageProps {
  cases: CaseItem[];
  onOpenCaseReview: (caseId: string, imageId?: string) => void;
}

export const ImageLibraryPage: React.FC<ImageLibraryPageProps> = ({
  cases,
  onOpenCaseReview,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewFilter, setViewFilter] = useState<'all' | ImageViewType>('all');
  const [qualityFilter, setQualityFilter] = useState<'all' | QualityStatus>('all');
  const [selectedForCompare, setSelectedForCompare] = useState<CaseImage[]>([]);
  const [lightboxImage, setLightboxImage] = useState<CaseImage | null>(null);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Flatten all images across cases
  const allImages: CaseImage[] = cases.flatMap((c) => c.images);

  const filteredImages = allImages.filter((img) => {
    const matchesSearch =
      img.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.viewLabel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesView = viewFilter === 'all' || img.viewType === viewFilter;
    const matchesQuality = qualityFilter === 'all' || img.quality === qualityFilter;
    return matchesSearch && matchesView && matchesQuality;
  });

  const toggleSelectForCompare = (img: CaseImage) => {
    if (selectedForCompare.some((i) => i.id === img.id)) {
      setSelectedForCompare((prev) => prev.filter((i) => i.id !== img.id));
    } else {
      if (selectedForCompare.length < 2) {
        setSelectedForCompare((prev) => [...prev, img]);
      } else {
        setSelectedForCompare([selectedForCompare[1], img]);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header and Controls */}
      <div
        className="card"
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8',
              }}
            />
            <input
              type="text"
              placeholder="Search case ID or view..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.4375rem 0.75rem 0.4375rem 2.25rem',
                fontSize: '0.8125rem',
                border: '1px solid #cbd5e1',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
              }}
            />
          </div>

          {/* View Filter */}
          <select
            value={viewFilter}
            onChange={(e) => setViewFilter(e.target.value as any)}
            style={{
              fontSize: '0.8125rem',
              padding: '0.4375rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#334155',
              outline: 'none',
            }}
          >
            <option value="all">All Anatomical Views</option>
            <option value="frontal">Frontal Arch Occlusion</option>
            <option value="upper_occlusal">Maxillary Arch (Upper)</option>
            <option value="lower_occlusal">Mandibular Arch (Lower)</option>
            <option value="lateral_buccal_right">Lateral Right Buccal</option>
          </select>

          {/* Quality Filter */}
          <select
            value={qualityFilter}
            onChange={(e) => setQualityFilter(e.target.value as any)}
            style={{
              fontSize: '0.8125rem',
              padding: '0.4375rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#334155',
              outline: 'none',
            }}
          >
            <option value="all">All Quality Tiers</option>
            <option value="pass">Quality Pass (90%+)</option>
            <option value="borderline">Borderline Quality</option>
            <option value="retake">Retake Advised</option>
          </select>
        </div>

        {/* Compare action button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setShowCompareModal(true)}
            disabled={selectedForCompare.length < 2}
            className="btn btn-primary btn-sm"
            style={{
              opacity: selectedForCompare.length < 2 ? 0.6 : 1,
              cursor: selectedForCompare.length < 2 ? 'not-allowed' : 'pointer',
            }}
          >
            <SplitSquareHorizontal size={15} />
            <span>Compare Selected ({selectedForCompare.length}/2)</span>
          </button>
        </div>
      </div>

      {/* Selected for Comparison helper notice */}
      {selectedForCompare.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.625rem 1rem',
            backgroundColor: '#ecfeff',
            border: '1px solid #a5f3fc',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.75rem',
            color: '#0e7490',
          }}
        >
          <span>
            {selectedForCompare.length === 1
              ? 'Select 1 more photograph to launch side-by-side comparative inspection.'
              : '2 images selected! Click "Compare Selected" to view dual panes.'}
          </span>
          <button
            onClick={() => setSelectedForCompare([])}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.125rem 0.375rem', fontSize: '0.6875rem' }}
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Responsive Gallery Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {filteredImages.map((img) => {
          const isSelectedCompare = selectedForCompare.some((i) => i.id === img.id);

          return (
            <div
              key={img.id}
              className="card"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: isSelectedCompare ? '2px solid #0e7490' : '1px solid #e2e8f0',
                transition: 'all 0.15s ease',
              }}
            >
              {/* Image Preview Box */}
              <div
                style={{
                  height: '180px',
                  position: 'relative',
                  backgroundColor: '#0f172a',
                  cursor: 'pointer',
                }}
                onClick={() => setLightboxImage(img)}
              >
                <img
                  src={img.url}
                  alt={img.viewLabel}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Case Badge */}
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '0.125rem 0.4375rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {img.caseId}
                </span>

                {/* Quality Score Badge */}
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: img.quality === 'pass' ? '#34d399' : '#fbbf24',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    padding: '0.125rem 0.4375rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {img.qualityScore}%
                </span>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(15, 23, 42, 0.65)',
                    color: '#ffffff',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.25rem',
                  }}
                  title="Click for Lightbox"
                >
                  <Maximize2 size={13} />
                </div>
              </div>

              {/* Card Meta & Actions */}
              <div style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a' }}>
                    {img.viewLabel}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: '2px' }}>
                    {img.resolution} • {img.capturedAt}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
                  <button
                    onClick={() => toggleSelectForCompare(img)}
                    className={`btn btn-sm ${isSelectedCompare ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.6875rem', padding: '0.25rem 0.5rem' }}
                  >
                    <SplitSquareHorizontal size={12} />
                    <span>{isSelectedCompare ? 'Selected' : 'Compare'}</span>
                  </button>

                  <button
                    onClick={() => onOpenCaseReview(img.caseId, img.id)}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.6875rem', color: '#0e7490' }}
                  >
                    <span>Inspect</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="modal-backdrop" onClick={() => setLightboxImage(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: '960px', width: '92vw', padding: '1rem', backgroundColor: '#090d16', border: '1px solid #1e293b' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{lightboxImage.viewLabel}</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '0.5rem' }}>
                  Case {lightboxImage.caseId} • {lightboxImage.resolution}
                </span>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="btn btn-ghost btn-sm"
                style={{ color: '#cbd5e1' }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                height: '560px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#020617',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
              }}
            >
              <img
                src={lightboxImage.url}
                alt={lightboxImage.viewLabel}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
              <button
                onClick={() => {
                  onOpenCaseReview(lightboxImage.caseId, lightboxImage.id);
                  setLightboxImage(null);
                }}
                className="btn btn-primary btn-sm"
              >
                <span>Open in Case Review Studio</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && selectedForCompare.length >= 2 && (
        <SideBySideCompareModal
          imageA={selectedForCompare[0]}
          imageB={selectedForCompare[1]}
          onClose={() => setShowCompareModal(false)}
        />
      )}
    </div>
  );
};
