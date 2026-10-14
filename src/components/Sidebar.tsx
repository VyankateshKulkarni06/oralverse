import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  FolderKanban,
  Eye,
  Images,
  BarChart3,
  Settings,
  HelpCircle,
  X,
  Stethoscope,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export type PageId =
  | 'landing'
  | 'overview'
  | 'new-analysis'
  | 'cases'
  | 'case-review'
  | 'image-library'
  | 'insights'
  | 'settings';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  casesAwaitingCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  casesAwaitingCount,
}) => {
  const navItems = [
    {
      id: 'overview' as PageId,
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'new-analysis' as PageId,
      label: 'New Analysis',
      icon: PlusCircle,
      badge: 'Upload',
      isPrimaryAction: true,
    },
    {
      id: 'cases' as PageId,
      label: 'Cases',
      icon: FolderKanban,
      badge: casesAwaitingCount > 0 ? `${casesAwaitingCount}` : null,
    },
    {
      id: 'case-review' as PageId,
      label: 'Case Review',
      icon: Eye,
      badge: 'Active',
    },
    {
      id: 'image-library' as PageId,
      label: 'Image Library',
      icon: Images,
      badge: null,
    },
    {
      id: 'insights' as PageId,
      label: 'Insights',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'settings' as PageId,
      label: 'Settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside className={`app-sidebar ${isOpenMobile ? 'open' : ''}`}>
      {/* Brand Header */}
      <div
        style={{
          padding: '1.25rem 1.25rem 1rem 1.25rem',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <BrandLogo size="md" showTagline={true} />
        {isOpenMobile && (
          <button
            onClick={onCloseMobile}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.25rem' }}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Demo Environment Indicator */}
      <div style={{ padding: '0.75rem 1.25rem 0.25rem 1.25rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 0.625rem',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.75rem',
            color: '#475569',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'inline-block',
            }}
          />
          <span style={{ fontWeight: 600 }}>Demo Workspace</span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '0.6875rem',
              color: '#94a3b8',
              fontFamily: 'var(--font-mono)',
            }}
          >
            v1.0
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav
        style={{
          flex: 1,
          padding: '0.75rem 0.875rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#94a3b8',
            padding: '0.5rem 0.5rem 0.25rem 0.5rem',
          }}
        >
          Clinical Platform
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                if (isOpenMobile) onCloseMobile();
              }}
              className={`nav-item ${isActive ? 'active' : ''}`}
              style={{
                width: '100%',
                border: 'none',
                textAlign: 'left',
                backgroundColor: isActive
                  ? '#ecfeff'
                  : item.isPrimaryAction
                  ? '#f0fdfa'
                  : 'transparent',
                color: isActive
                  ? '#0e7490'
                  : item.isPrimaryAction
                  ? '#0f766e'
                  : 'inherit',
                borderLeft: isActive ? '3px solid #0e7490' : '3px solid transparent',
              }}
            >
              <Icon
                size={18}
                className="nav-icon"
                style={{
                  color: isActive
                    ? '#0e7490'
                    : item.isPrimaryAction
                    ? '#0d9488'
                    : '#64748b',
                }}
              />
              <span style={{ flex: 1 }}>{item.label}</span>

              {item.badge && (
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    padding: '0.125rem 0.4375rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isActive
                      ? '#0e7490'
                      : item.id === 'cases'
                      ? '#e0f2fe'
                      : '#e2e8f0',
                    color: isActive
                      ? '#ffffff'
                      : item.id === 'cases'
                      ? '#0369a1'
                      : '#475569',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div
          style={{
            marginTop: 'auto',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <div
            style={{
              padding: '0.75rem',
              backgroundColor: '#f0fdfa',
              border: '1px solid #ccfbf1',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
              <Sparkles size={14} color="#0e7490" />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0f766e' }}>
                AI Visual Assist
              </span>
            </div>
            <p style={{ fontSize: '0.6875rem', color: '#475569', lineHeight: 1.35 }}>
              Intraoral photo segmentation & visual landmarks active.
            </p>
          </div>

          <button
            onClick={() => onNavigate('landing')}
            className="nav-item"
            style={{
              width: '100%',
              border: 'none',
              textAlign: 'left',
              color: '#0e7490',
              fontSize: '0.8125rem',
              fontWeight: 600,
            }}
          >
            <Sparkles size={16} color="#0e7490" />
            <span>Platform Overview Page</span>
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="nav-item"
            style={{
              width: '100%',
              border: 'none',
              textAlign: 'left',
              color: '#64748b',
              fontSize: '0.8125rem',
            }}
          >
            <HelpCircle size={16} />
            <span>Guide & Protocol</span>
          </button>
        </div>
      </nav>

      {/* Demo Clinician Profile Box */}
      <div
        style={{
          padding: '0.875rem 1rem',
          borderTop: '1px solid var(--border-light)',
          backgroundColor: '#fafbfc',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: '#e0f2fe',
            color: '#0369a1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.8125rem',
            border: '1px solid #bae6fd',
            flexShrink: 0,
          }}
        >
          <Stethoscope size={18} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#0f172a',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Dr. A. Sharma
          </div>
          <div
            style={{
              fontSize: '0.6875rem',
              color: '#64748b',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Clinical Reviewer
          </div>
        </div>
      </div>
    </aside>
  );
};
