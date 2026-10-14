import React, { useState } from 'react';
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldCheck,
  ArrowUpDown,
  Download,
  Plus,
} from 'lucide-react';
import { CaseItem, CaseReviewStatus, QualityStatus } from '../types';

interface CasesPageProps {
  cases: CaseItem[];
  onOpenCaseReview: (caseId: string) => void;
  onNavigateToNewAnalysis: () => void;
}

export const CasesPage: React.FC<CasesPageProps> = ({
  cases,
  onOpenCaseReview,
  onNavigateToNewAnalysis,
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CaseReviewStatus>('all');
  const [qualityFilter, setQualityFilter] = useState<'all' | QualityStatus>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredCases = cases
    .filter((c) => {
      const matchesSearch =
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.patientReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        c.clinician.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || c.reviewStatus === statusFilter;
      const matchesQuality = qualityFilter === 'all' || c.overallQuality === qualityFilter;
      return matchesSearch && matchesStatus && matchesQuality;
    })
    .sort((a, b) => {
      return sortOrder === 'newest'
        ? b.dateAdded.localeCompare(a.dateAdded)
        : a.dateAdded.localeCompare(b.dateAdded);
    });

  const getStatusBadge = (st: CaseReviewStatus) => {
    switch (st) {
      case 'ready':
        return <span className="badge badge-brand"><Clock size={12} /> Ready for Review</span>;
      case 'in_review':
        return <span className="badge badge-info"><ShieldCheck size={12} /> In Review</span>;
      case 'reviewed':
        return <span className="badge badge-pass"><CheckCircle2 size={12} /> Reviewed</span>;
      case 'retake_recommended':
        return <span className="badge badge-danger"><AlertTriangle size={12} /> Retake Advised</span>;
    }
  };

  const getQualityBadge = (q: QualityStatus) => {
    if (q === 'pass') return <span className="badge badge-pass">Pass (95%+)</span>;
    if (q === 'borderline') return <span className="badge badge-warn">Borderline</span>;
    return <span className="badge badge-danger">Retake Required</span>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Filter and Actions Toolbar */}
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
          <div style={{ position: 'relative', minWidth: '240px', flex: '1 1 240px' }}>
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
              placeholder="Search case ID, anon reference, or tags..."
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

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
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
            <option value="all">All Review Statuses</option>
            <option value="ready">Ready for Review</option>
            <option value="in_review">In Review</option>
            <option value="reviewed">Reviewed & Complete</option>
            <option value="retake_recommended">Retake Recommended</option>
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
            <option value="all">All Quality Levels</option>
            <option value="pass">Pass Only</option>
            <option value="borderline">Borderline Quality</option>
            <option value="retake">Retake Flagged</option>
          </select>
        </div>

        {/* View mode toggle & CTA */}
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
              onClick={() => setViewMode('table')}
              className="btn btn-sm"
              style={{
                backgroundColor: viewMode === 'table' ? '#ffffff' : 'transparent',
                color: viewMode === 'table' ? '#0e7490' : '#64748b',
                padding: '0.25rem 0.5rem',
                boxShadow: viewMode === 'table' ? 'var(--shadow-xs)' : 'none',
              }}
              title="Table View"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className="btn btn-sm"
              style={{
                backgroundColor: viewMode === 'grid' ? '#ffffff' : 'transparent',
                color: viewMode === 'grid' ? '#0e7490' : '#64748b',
                padding: '0.25rem 0.5rem',
                boxShadow: viewMode === 'grid' ? 'var(--shadow-xs)' : 'none',
              }}
              title="Visual Card Grid View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          <button
            onClick={onNavigateToNewAnalysis}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            <span>New Analysis</span>
          </button>
        </div>
      </div>

      {/* Cases Presentation: Table View or Visual Grid View */}
      {viewMode === 'table' ? (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  <th style={{ padding: '0.75rem 1rem' }}>Case ID</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Thumbnail</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Patient Anonymous Ref</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Date Captured</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Views</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Quality</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Review Status</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onOpenCaseReview(c.id)}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e7490', fontFamily: 'var(--font-mono)' }}>
                      {c.id}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div
                        style={{
                          width: 48,
                          height: 36,
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                          border: '1px solid #cbd5e1',
                        }}
                      >
                        <img src={c.thumbnail} alt={c.id} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{c.patientReference}</div>
                      <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>{c.patientAgeGroup}</div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#475569', fontSize: '0.75rem' }}>
                      {c.dateAdded}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      {c.imageCount}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>{getQualityBadge(c.overallQuality)}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{getStatusBadge(c.reviewStatus)}</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenCaseReview(c.id);
                        }}
                        className="btn btn-secondary btn-sm"
                      >
                        <Eye size={14} color="#0e7490" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Visual Card Grid View */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filteredCases.map((c) => (
            <div
              key={c.id}
              onClick={() => onOpenCaseReview(c.id)}
              className="card"
              style={{
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ height: '170px', position: 'relative', backgroundColor: '#0f172a' }}>
                <img
                  src={c.thumbnail}
                  alt={c.id}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.125rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {c.id}
                </span>

                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                  }}
                >
                  {getStatusBadge(c.reviewStatus)}
                </span>
              </div>

              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0f172a' }}>
                    {c.patientReference}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                    {c.imageCount} views
                  </span>
                </div>

                <p style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.4, flex: 1 }}>
                  {c.visualFindingsSummary}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {c.tags.map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.625rem',
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        padding: '0.125rem 0.375rem',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '0.625rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.6875rem',
                    color: '#64748b',
                  }}
                >
                  <span>{c.dateAdded}</span>
                  <span style={{ color: '#0e7490', fontWeight: 600 }}>Review &gt;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: '#64748b',
          padding: '0.5rem 0',
        }}
      >
        <span>
          Showing <strong>{filteredCases.length}</strong> of <strong>{cases.length}</strong> cases in demo workspace
        </span>
        <span>All records labeled as fictional test cases.</span>
      </div>
    </div>
  );
};
