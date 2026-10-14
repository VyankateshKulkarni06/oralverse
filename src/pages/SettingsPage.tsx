import React, { useState } from 'react';
import {
  User,
  Building,
  Sliders,
  Shield,
  RotateCcw,
  Save,
  CheckCircle2,
  Sparkles,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { UserPreferences } from '../types';

interface SettingsPageProps {
  preferences: UserPreferences;
  onUpdatePreferences: (newPrefs: UserPreferences) => void;
  onResetDemoData: () => void;
  onShowToast: (msg: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  preferences,
  onUpdatePreferences,
  onResetDemoData,
  onShowToast,
}) => {
  const [form, setForm] = useState<UserPreferences>(preferences);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSave = () => {
    onUpdatePreferences(form);
    onShowToast('Preferences saved successfully');
  };

  const handleConfirmReset = () => {
    onResetDemoData();
    setShowResetConfirm(false);
    onShowToast('Demo workspace restored to default baseline');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '880px', margin: '0 auto', width: '100%' }}>
      {/* Clinician Profile Section */}
      <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
          <User size={18} color="#0e7490" />
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
            Clinician Profile & Identity
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
              Clinician Name
            </label>
            <input
              type="text"
              value={form.clinicianName}
              onChange={(e) => setForm({ ...form, clinicianName: e.target.value })}
              style={{
                width: '100%',
                padding: '0.4375rem 0.75rem',
                fontSize: '0.8125rem',
                border: '1px solid #cbd5e1',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
              Credentials & Title
            </label>
            <input
              type="text"
              value={form.clinicianTitle}
              onChange={(e) => setForm({ ...form, clinicianTitle: e.target.value })}
              style={{
                width: '100%',
                padding: '0.4375rem 0.75rem',
                fontSize: '0.8125rem',
                border: '1px solid #cbd5e1',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
            Clinic / Department Name
          </label>
          <input
            type="text"
            value={form.clinicName}
            onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
            style={{
              width: '100%',
              padding: '0.4375rem 0.75rem',
              fontSize: '0.8125rem',
              border: '1px solid #cbd5e1',
              borderRadius: 'var(--radius-md)',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Clinical Workspace & Dental Notation Preferences */}
      <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
          <Sliders size={18} color="#0e7490" />
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
            Dental Notation & Viewer Display
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Tooth Numbering System */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0f172a' }}>
                Tooth Numbering System
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                FDI (World Dental Federation) or Universal (ADA 1-32)
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                backgroundColor: '#f1f5f9',
                padding: '0.1875rem',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <button
                type="button"
                onClick={() => setForm({ ...form, notationSystem: 'FDI' })}
                className="btn btn-sm"
                style={{
                  backgroundColor: form.notationSystem === 'FDI' ? '#ffffff' : 'transparent',
                  color: form.notationSystem === 'FDI' ? '#0e7490' : '#64748b',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  boxShadow: form.notationSystem === 'FDI' ? 'var(--shadow-xs)' : 'none',
                }}
              >
                FDI (#11, #21, #16)
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, notationSystem: 'Universal' })}
                className="btn btn-sm"
                style={{
                  backgroundColor: form.notationSystem === 'Universal' ? '#ffffff' : 'transparent',
                  color: form.notationSystem === 'Universal' ? '#0e7490' : '#64748b',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  boxShadow: form.notationSystem === 'Universal' ? 'var(--shadow-xs)' : 'none',
                }}
              >
                Universal (#8, #9, #3)
              </button>
            </div>
          </div>

          {/* High Contrast Overlays */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0f172a' }}>
                High-Contrast Segmentation Borders
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Sharpen tooth margin lines for clinical photo inspection
              </div>
            </div>
            <input
              type="checkbox"
              checked={form.highContrastOverlays}
              onChange={(e) => setForm({ ...form, highContrastOverlays: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: '#0e7490', cursor: 'pointer' }}
            />
          </div>

          {/* Auto Enhance Lighting */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0f172a' }}>
                Auto-Balance Intraoral Exposure
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Dynamically equalize ring flash reflections in the preview viewer
              </div>
            </div>
            <input
              type="checkbox"
              checked={form.autoEnhanceView}
              onChange={(e) => setForm({ ...form, autoEnhanceView: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: '#0e7490', cursor: 'pointer' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button onClick={handleSave} className="btn btn-primary btn-sm">
            <Save size={14} />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>

      {/* Demo Sandbox Data & Reset Controls */}
      <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #fecdd3', backgroundColor: '#fffbfb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <RotateCcw size={18} color="#e11d48" />
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#9f1239' }}>
            Demo Sandbox State & Reset
          </h3>
        </div>

        <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.4 }}>
          This instance operates in a standalone, client-side sandbox mode. You can reset all case notes, review statuses, and custom uploads back to the initial factory demo state at any time.
        </p>

        <div>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="btn btn-sm"
            style={{ backgroundColor: '#ffffff', color: '#e11d48', border: '1px solid #fda4af' }}
          >
            <RotateCcw size={14} />
            <span>Reset Demo Workspace to Default</span>
          </button>
        </div>
      </div>

      {/* About OralVerse Brand Block */}
      <div
        className="card"
        style={{
          padding: '1.5rem',
          backgroundColor: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
          OralVerse by Asymptote.ai
        </div>
        <div style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.5 }}>
          “See oral health more clearly.” — OralVerse transforms intraoral photographs into organized visual insights that help dental professionals review cases, identify areas that may require attention, and communicate findings more effectively.
        </div>
        <div style={{ fontSize: '0.6875rem', color: '#94a3b8', borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem' }}>
          Version 1.0.0-demo • Frontend Release • Developed for Asymptote.ai
        </div>
      </div>

      {/* Confirmation Modal for Reset */}
      {showResetConfirm && (
        <div className="modal-backdrop" onClick={() => setShowResetConfirm(false)}>
          <div className="modal-content" style={{ padding: '1.5rem' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AlertTriangle size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0f172a' }}>
                  Reset Demo Workspace Data?
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  This will restore the 8 default clinical demo cases.
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.8125rem', color: '#475569', marginBottom: '1.25rem', lineHeight: 1.4 }}>
              Any newly uploaded test images or notes added in this browser session will be reset to the original sample dataset.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="btn btn-sm"
                style={{ backgroundColor: '#e11d48', color: '#ffffff', borderColor: '#e11d48' }}
              >
                Yes, Reset Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
