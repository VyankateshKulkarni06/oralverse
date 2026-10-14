import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Plus,
  Menu,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { PageId } from './Sidebar';
import { NotificationItem, UserPreferences } from '../types';

interface TopbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenMobileSidebar: () => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  userPreferences: UserPreferences;
  globalSearchQuery: string;
  onGlobalSearchChange: (q: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentPage,
  onNavigate,
  onOpenMobileSidebar,
  notifications,
  onMarkNotificationRead,
  userPreferences,
  globalSearchQuery,
  onGlobalSearchChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const pageTitles: Record<PageId, { title: string; subtitle: string }> = {
    overview: {
      title: 'Overview Dashboard',
      subtitle: 'Clinical review metrics & recent intraoral cases',
    },
    'new-analysis': {
      title: 'New Visual Analysis',
      subtitle: 'Upload intraoral photographs for visual intelligence review',
    },
    cases: {
      title: 'Cases Workspace',
      subtitle: 'Patient imaging archives and review status tracking',
    },
    'case-review': {
      title: 'Case Review Studio',
      subtitle: 'High-resolution photo viewer, tooth mapping & annotation inspector',
    },
    'image-library': {
      title: 'Intraoral Image Library',
      subtitle: 'Multi-view clinical gallery & side-by-side comparative examination',
    },
    insights: {
      title: 'Clinical Analytics & Quality Insights',
      subtitle: 'Trends in image quality pass rates, retake factors & review velocity',
    },
    settings: {
      title: 'Platform Preferences',
      subtitle: 'Clinician workspace configuration, dental notation & demo controls',
    },
  };

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="app-topbar">
      {/* Left: Mobile hamburger + Current Page Title / Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onOpenMobileSidebar}
          className="btn btn-ghost btn-sm"
          style={{ display: 'inline-flex', padding: '0.375rem' }}
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1
              style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              {pageTitles[currentPage]?.title || 'OralVerse'}
            </h1>
            <span
              style={{
                fontSize: '0.6875rem',
                backgroundColor: '#f1f5f9',
                color: '#475569',
                padding: '0.125rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                border: '1px solid #e2e8f0',
              }}
            >
              Demo Sandbox
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {pageTitles[currentPage]?.subtitle}
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Global Search Bar */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.75rem',
              color: '#94a3b8',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search cases, findings, tooth #..."
            value={globalSearchQuery}
            onChange={(e) => onGlobalSearchChange(e.target.value)}
            style={{
              padding: '0.4375rem 0.75rem 0.4375rem 2.25rem',
              fontSize: '0.8125rem',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius-md)',
              width: '240px',
              transition: 'all 0.15s ease',
              color: '#0f172a',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#0e7490';
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(14, 116, 144, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Notifications Popover */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn btn-secondary btn-icon"
            style={{ position: 'relative' }}
            aria-label="View notifications"
          >
            <Bell size={18} color="#475569" />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#0e7490',
                  borderRadius: '50%',
                  border: '2px solid #ffffff',
                }}
              />
            )}
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '320px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 50,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a' }}>
                  Notifications ({unreadCount} new)
                </div>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    color: '#0e7490',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                  onClick={() => notifications.forEach((n) => onMarkNotificationRead(n.id))}
                >
                  Mark all read
                </span>
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.map((notif) => {
                  const Icon =
                    notif.type === 'quality'
                      ? AlertTriangle
                      : notif.type === 'case'
                      ? CheckCircle2
                      : Info;
                  const iconColor =
                    notif.type === 'quality'
                      ? '#d97706'
                      : notif.type === 'case'
                      ? '#059669'
                      : '#0284c7';

                  return (
                    <div
                      key={notif.id}
                      onClick={() => onMarkNotificationRead(notif.id)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderBottom: '1px solid #f8fafc',
                        backgroundColor: notif.read ? '#ffffff' : '#f0fdfa',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.75rem',
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      <Icon size={16} color={iconColor} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: notif.read ? 600 : 700,
                            color: '#0f172a',
                            marginBottom: '2px',
                          }}
                        >
                          {notif.title}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: '#64748b', lineHeight: 1.3 }}>
                          {notif.message}
                        </div>
                        <div
                          style={{
                            fontSize: '0.625rem',
                            color: '#94a3b8',
                            marginTop: '4px',
                          }}
                        >
                          {notif.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Start New Analysis Primary Action */}
        <button
          onClick={() => onNavigate('new-analysis')}
          className="btn btn-primary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <Plus size={16} />
          <span>New Analysis</span>
        </button>

        {/* Demo Clinician Profile Menu */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="btn btn-secondary btn-sm"
            style={{
              padding: '0.25rem 0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                backgroundColor: '#0e7490',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.6875rem',
                fontWeight: 700,
              }}
            >
              AS
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>
              {userPreferences.clinicianName}
            </span>
            <ChevronDown size={14} color="#64748b" />
          </button>

          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '240px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 50,
                padding: '0.75rem',
              }}
            >
              <div style={{ marginBottom: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a' }}>
                  {userPreferences.clinicianName}
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                  {userPreferences.clinicianTitle}
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#0e7490', fontWeight: 500, marginTop: '2px' }}>
                  {userPreferences.clinicName}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  color: '#475569',
                  padding: '0.375rem 0',
                }}
              >
                <ShieldCheck size={14} color="#10b981" />
                <span>Notation: <strong>{userPreferences.notationSystem} System</strong></span>
              </div>

              <button
                onClick={() => {
                  onNavigate('settings');
                  setShowProfileMenu(false);
                }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                Manage Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
