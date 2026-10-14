import React, { useState } from 'react';
import { Sidebar, PageId } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { SafetyBanner } from './components/SafetyBanner';
import { ToastContainer, ToastItem } from './components/ToastContainer';
import { LandingPage } from './pages/LandingPage';
import { OverviewPage } from './pages/OverviewPage';
import { NewAnalysisPage } from './pages/NewAnalysisPage';
import { CasesPage } from './pages/CasesPage';
import { CaseReviewPage } from './pages/CaseReviewPage';
import { ImageLibraryPage } from './pages/ImageLibraryPage';
import { InsightsPage } from './pages/InsightsPage';
import { SettingsPage } from './pages/SettingsPage';
import {
  MOCK_CASES,
  INITIAL_KPI_METRICS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PREFERENCES,
} from './data/mockData';
import { CaseItem, CaseReviewStatus, UserPreferences, NotificationItem } from './types';

export const App: React.FC = () => {
  // Start on the Landing Page containing full info and features of platform by Asymptote AI
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [cases, setCases] = useState<CaseItem[]>(MOCK_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('OV-DEMO-1042');
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(INITIAL_PREFERENCES);
  const [kpiMetrics, setKpiMetrics] = useState(INITIAL_KPI_METRICS);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Launch Demo from Landing Page into Overview
  const handleLaunchDemoFromLanding = () => {
    setCurrentPage('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Welcome to OralVerse Clinical Demo Workspace!');
  };

  // Navigate to Case Review with a specific case
  const handleOpenCaseReview = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentPage('case-review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add new case from New Analysis
  const handleCaseCreated = (newCase: CaseItem) => {
    setCases((prev) => [newCase, ...prev]);
    setSelectedCaseId(newCase.id);
    setKpiMetrics((prev) => ({
      ...prev,
      imagesAnalyzed: prev.imagesAnalyzed + newCase.imageCount,
      casesAwaitingReview: prev.casesAwaitingReview + 1,
    }));
    showToast(`Case ${newCase.id} created and queued for review.`);
  };

  // Update clinician notes for a case
  const handleUpdateCaseNotes = (caseId: string, notes: string) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, clinicalNotes: notes } : c))
    );
  };

  // Update case status (e.g. mark as reviewed)
  const handleUpdateCaseStatus = (caseId: string, status: CaseReviewStatus) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, reviewStatus: status } : c))
    );
    if (status === 'reviewed') {
      setKpiMetrics((prev) => ({
        ...prev,
        casesReviewed: prev.casesReviewed + 1,
        casesAwaitingReview: Math.max(0, prev.casesAwaitingReview - 1),
      }));
    }
  };

  // Mark notification as read
  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Reset entire demo workspace back to baseline
  const handleResetDemoData = () => {
    setCases(MOCK_CASES);
    setSelectedCaseId('OV-DEMO-1042');
    setNotifications(INITIAL_NOTIFICATIONS);
    setUserPreferences(INITIAL_PREFERENCES);
    setKpiMetrics(INITIAL_KPI_METRICS);
    setCurrentPage('overview');
  };

  const currentCase = cases.find((c) => c.id === selectedCaseId) || cases[0];
  const awaitingCount = cases.filter((c) => c.reviewStatus === 'ready').length;

  // Render Full Landing Page if on landing
  if (currentPage === 'landing') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <LandingPage
          onLaunchDemo={handleLaunchDemoFromLanding}
          onExploreCaseReview={() => {
            setSelectedCaseId('OV-DEMO-1042');
            setCurrentPage('case-review');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast('Loaded Case Review Studio for Case OV-DEMO-1042');
          }}
        />
        <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
      </div>
    );
  }

  // Clinical Platform Shell (Overview, Cases, Case Review, etc.)
  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        casesAwaitingCount={awaitingCount}
      />

      {/* Main Content Pane */}
      <div className="app-main">
        {/* Top Header */}
        <Topbar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          userPreferences={userPreferences}
          globalSearchQuery={globalSearch}
          onGlobalSearchChange={(q) => {
            setGlobalSearch(q);
            if (q.trim().length > 0 && currentPage !== 'cases') {
              setCurrentPage('cases');
            }
          }}
        />

        {/* Persistent Safety Banner */}
        <SafetyBanner />

        {/* Dynamic Page Views */}
        <main className="page-container">
          {currentPage === 'overview' && (
            <OverviewPage
              cases={cases}
              kpiMetrics={kpiMetrics}
              userPreferences={userPreferences}
              onOpenCaseReview={handleOpenCaseReview}
              onNavigateToNewAnalysis={() => setCurrentPage('new-analysis')}
              onNavigateToCases={() => setCurrentPage('cases')}
            />
          )}

          {currentPage === 'new-analysis' && (
            <NewAnalysisPage
              onCaseCreated={handleCaseCreated}
              onNavigateToCaseReview={(id) => handleOpenCaseReview(id)}
            />
          )}

          {currentPage === 'cases' && (
            <CasesPage
              cases={cases}
              onOpenCaseReview={handleOpenCaseReview}
              onNavigateToNewAnalysis={() => setCurrentPage('new-analysis')}
            />
          )}

          {currentPage === 'case-review' && (
            <CaseReviewPage
              currentCase={currentCase}
              allCases={cases}
              onSelectCase={(id) => setSelectedCaseId(id)}
              onUpdateCaseNotes={handleUpdateCaseNotes}
              onUpdateCaseStatus={handleUpdateCaseStatus}
              notationSystem={userPreferences.notationSystem}
              onShowToast={showToast}
            />
          )}

          {currentPage === 'image-library' && (
            <ImageLibraryPage
              cases={cases}
              onOpenCaseReview={handleOpenCaseReview}
            />
          )}

          {currentPage === 'insights' && <InsightsPage />}

          {currentPage === 'settings' && (
            <SettingsPage
              preferences={userPreferences}
              onUpdatePreferences={(newPrefs) => setUserPreferences(newPrefs)}
              onResetDemoData={handleResetDemoData}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Floating System Toasts */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};

export default App;
