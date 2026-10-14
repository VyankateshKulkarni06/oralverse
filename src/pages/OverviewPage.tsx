import React from 'react';
import {
  Sparkles,
  Plus,
  FolderCheck,
  FileImage,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { InteractiveOralHealthPanel } from '../components/InteractiveOralHealthPanel';
import { ActivityTrendsCard } from '../components/ActivityTrendsCard';
import { QualityDistributionCard } from '../components/QualityDistributionCard';
import { RecentCasesTable } from '../components/RecentCasesTable';
import { ImageQualityInsightsCard } from '../components/ImageQualityInsightsCard';
import { CaseItem, KPIMetrics, UserPreferences } from '../types';

interface OverviewPageProps {
  cases: CaseItem[];
  kpiMetrics: KPIMetrics;
  userPreferences: UserPreferences;
  onOpenCaseReview: (caseId: string, imageId?: string) => void;
  onNavigateToNewAnalysis: () => void;
  onNavigateToCases: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  cases,
  kpiMetrics,
  userPreferences,
  onOpenCaseReview,
  onNavigateToNewAnalysis,
  onNavigateToCases,
}) => {
  // Feature case OV-DEMO-1042 for primary interactive oral health panel
  const featuredCase = cases.find((c) => c.id === 'OV-DEMO-1042') || cases[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Welcome Banner Section */}
      <div
        className="card"
        style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)',
          border: '1px solid #ccfbf1',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', maxWidth: '720px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#0f172a',
                letterSpacing: '-0.02em',
              }}
            >
              Good morning, {userPreferences.clinicianName}
            </h2>
            <span
              style={{
                fontSize: '0.6875rem',
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                padding: '0.1875rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                border: '1px solid #bae6fd',
              }}
            >
              Demo Workspace
            </span>
          </div>

          <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>
            Review your recent cases and explore visual findings from your oral health image library. AI-assisted intraoral segmentation is active.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem', fontSize: '0.75rem', color: '#64748b' }}>
            <span>Workspace: <strong>{userPreferences.clinicName}</strong></span>
            <span>•</span>
            <span>Dental Notation: <strong>{userPreferences.notationSystem}</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onNavigateToNewAnalysis}
            className="btn btn-primary btn-lg"
            style={{ boxShadow: '0 4px 12px rgba(14, 116, 144, 0.2)' }}
          >
            <Plus size={18} />
            <span>Start New Analysis</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid-cols-4">
        <MetricCard
          title="Cases Reviewed"
          value={kpiMetrics.casesReviewed}
          trend={kpiMetrics.casesReviewedTrend}
          isPositiveTrend={true}
          subtitle="Cumulative verified demo cases"
          icon={FolderCheck}
          color="#0e7490"
          sparklineData={[18, 22, 21, 26, 29, 31, 35, 38, 42]}
        />
        <MetricCard
          title="Images Analyzed"
          value={kpiMetrics.imagesAnalyzed}
          trend={kpiMetrics.imagesAnalyzedTrend}
          isPositiveTrend={true}
          subtitle="Processed intraoral views"
          icon={FileImage}
          color="#06b6d4"
          sparklineData={[70, 78, 85, 92, 98, 105, 115, 122, 134]}
        />
        <MetricCard
          title="Cases Awaiting Review"
          value={kpiMetrics.casesAwaitingReview}
          trend={kpiMetrics.casesAwaitingReviewTrend}
          isPositiveTrend={true}
          subtitle="In clinical triage queue"
          icon={Clock}
          color="#f59e0b"
          sparklineData={[19, 18, 17, 16, 17, 15, 14, 15, 14]}
        />
        <MetricCard
          title="Image Quality Pass Rate"
          value={`${kpiMetrics.qualityPassRate}%`}
          trend={kpiMetrics.qualityPassRateTrend}
          isPositiveTrend={true}
          subtitle="Meets focus & lighting threshold"
          icon={CheckCircle2}
          color="#059669"
          sparklineData={[92, 93, 91, 94, 93, 95, 94, 96, 95]}
        />
      </div>

      {/* Primary Interactive Visual Panel */}
      {featuredCase && (
        <InteractiveOralHealthPanel
          currentCase={featuredCase}
          onOpenCaseReview={onOpenCaseReview}
          notationSystem={userPreferences.notationSystem}
        />
      )}

      {/* Activity Trends & Quality Pipeline Status Grid */}
      <div className="grid-cols-2">
        <ActivityTrendsCard />
        <QualityDistributionCard cases={cases} />
      </div>

      {/* Image Quality Insights Banner */}
      <ImageQualityInsightsCard />

      {/* Recent Cases Table */}
      <RecentCasesTable
        cases={cases}
        onOpenCaseReview={onOpenCaseReview}
        onViewAllCases={onNavigateToCases}
      />
    </div>
  );
};
