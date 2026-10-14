import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { CaseItem, CaseReviewStatus } from '../types';

interface RecentCasesTableProps {
  cases: CaseItem[];
  onOpenCaseReview: (caseId: string) => void;
  onViewAllCases: () => void;
}

export const RecentCasesTable: React.FC<RecentCasesTableProps> = ({
  cases,
  onOpenCaseReview,
  onViewAllCases,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CaseReviewStatus>('all');
  const [sortField, setSortField] = useState<'date' | 'id'>('date');
  const [sortAsc, setSortAsc] = useState(false);

  // Filter & sort
  const filteredCases = cases
    .filter((c) => {
      const matchSearch =
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.patientReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchStatus = statusFilter === 'all' || c.reviewStatus === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortField === 'date') {
        return sortAsc
          ? a.dateAdded.localeCompare(b.dateAdded)
          : b.dateAdded.localeCompare(a.dateAdded);
      }
      return sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    });

  const getStatusBadge = (status: CaseReviewStatus) => {
    switch (status) {
      case 'ready':
        return (
          <span className="badge badge-brand">
            <Clock size={12} /> Ready for Review
          </span>
        );
      case 'in_review':
        return (
          <span className="badge badge-info">
            <ShieldCheck size={12} /> In Review
          </span>
        );
      case 'reviewed':
        return (
          <span className="badge badge-pass">
            <CheckCircle2 size={12} /> Reviewed
          </span>
        );
      case 'retake_recommended':
        return (
          <span className="badge badge-danger">
            <AlertTriangle size={12} /> Retake Advised
          </span>
        );
    }
  };

  const getQualityBadge = (q: string) => {
    if (q === 'pass') {
      return <span className="badge badge-pass">Pass</span>;
    }
    if (q === 'borderline') {
      return <span className="badge badge-warn">Borderline</span>;
    }
    return <span className="badge badge-danger">Retake</span>;
  };

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
      {/* Table Title and Actions */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div>
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>
            Recent Intraoral Cases
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Click any row to open the high-resolution Case Review studio
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Quick Search */}
          <div style={{ position: 'relative' }}>
            <Search
              size={14}
              style={{
                position: 'absolute',
                left: '0.625rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8',
              }}
            />
            <input
              type="text"
              placeholder="Filter case ID or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.3125rem 0.625rem 0.3125rem 1.875rem',
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                outline: 'none',
              }}
            />
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Filter size={14} color="#64748b" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              style={{
                fontSize: '0.75rem',
                padding: '0.3125rem 0.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#334155',
                outline: 'none',
              }}
            >
              <option value="all">All Statuses</option>
              <option value="ready">Ready for Review</option>
              <option value="in_review">In Review</option>
              <option value="reviewed">Reviewed</option>
              <option value="retake_recommended">Retake Advised</option>
            </select>
          </div>

          <button
            onClick={onViewAllCases}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem' }}
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr
              style={{
                borderBottom: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              <th style={{ padding: '0.625rem 0.75rem' }}>Case ID & Ref</th>
              <th style={{ padding: '0.625rem 0.75rem' }}>Thumbnail</th>
              <th
                style={{ padding: '0.625rem 0.75rem', cursor: 'pointer' }}
                onClick={() => {
                  setSortField('date');
                  setSortAsc(!sortAsc);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span>Date Captured</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th style={{ padding: '0.625rem 0.75rem' }}>Images</th>
              <th style={{ padding: '0.625rem 0.75rem' }}>Quality</th>
              <th style={{ padding: '0.625rem 0.75rem' }}>Review Status</th>
              <th style={{ padding: '0.625rem 0.75rem', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.slice(0, 5).map((c) => (
              <tr
                key={c.id}
                onClick={() => onOpenCaseReview(c.id)}
                style={{
                  borderBottom: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  fontSize: '0.8125rem',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {/* Case ID & Subject */}
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 700, color: '#0e7490', fontFamily: 'var(--font-mono)' }}>
                    {c.id}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                    {c.patientReference} • {c.patientAgeGroup}
                  </div>
                </td>

                {/* Thumbnail */}
                <td style={{ padding: '0.75rem' }}>
                  <div
                    style={{
                      width: 52,
                      height: 40,
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      backgroundColor: '#e2e8f0',
                      border: '1px solid #cbd5e1',
                    }}
                  >
                    <img
                      src={c.thumbnail}
                      alt={c.id}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </td>

                {/* Date */}
                <td style={{ padding: '0.75rem', color: '#475569', fontSize: '0.75rem' }}>
                  {c.dateAdded}
                </td>

                {/* Image Count */}
                <td style={{ padding: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#0f172a',
                    }}
                  >
                    {c.imageCount} views
                  </span>
                </td>

                {/* Quality */}
                <td style={{ padding: '0.75rem' }}>{getQualityBadge(c.overallQuality)}</td>

                {/* Review Status */}
                <td style={{ padding: '0.75rem' }}>{getStatusBadge(c.reviewStatus)}</td>

                {/* Action button */}
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCaseReview(c.id);
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem' }}
                  >
                    <Eye size={14} color="#0e7490" />
                    <span>Review</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
