import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Eye,
  CheckCircle2,
  Camera,
  Layers,
  BarChart3,
  Sliders,
  ChevronRight,
  Stethoscope,
  Maximize2,
  Lock,
  Zap,
  SplitSquareHorizontal,
  FileCheck,
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

interface LandingPageProps {
  onLaunchDemo: () => void;
  onExploreCaseReview: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchDemo,
  onExploreCaseReview,
}) => {
  const [activeTab, setActiveTab] = useState<'segmentation' | 'quality' | 'comparison'>('segmentation');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'var(--font-sans)' }}>
      {/* Public Navigation Header */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #e2e8f0',
          padding: '0.875rem 2rem',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Lockup */}
          <BrandLogo size="lg" showTagline={true} />

          {/* Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <a href="#platform" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569', transition: 'color 0.15s ease' }}>
              Platform
            </a>
            <a href="#features" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569', transition: 'color 0.15s ease' }}>
              Core Features
            </a>
            <a href="#workflow" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569', transition: 'color 0.15s ease' }}>
              Clinical Workflow
            </a>
            <a href="#ethics" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569', transition: 'color 0.15s ease' }}>
              Clinical Responsibility
            </a>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={onExploreCaseReview}
              className="btn btn-secondary btn-sm"
              style={{ fontWeight: 600 }}
            >
              Sign In (Demo)
            </button>
            <button
              onClick={onLaunchDemo}
              className="btn btn-primary btn-sm"
              style={{
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(14, 116, 144, 0.25)',
                padding: '0.5rem 1rem',
              }}
            >
              <Sparkles size={15} />
              <span>Get a Free Demo</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '5rem 2rem 4rem 2rem',
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(204, 251, 241, 0.5), rgba(255, 255, 255, 0))',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          {/* Eyebrow Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.3125rem 0.875rem',
              backgroundColor: '#ecfeff',
              border: '1px solid #a5f3fc',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#0e7490',
              marginBottom: '1.5rem',
            }}
          >
            <Sparkles size={14} color="#0e7490" />
            <span>Introducing OralVerse by Asymptote.ai</span>
            <span style={{ color: '#94a3b8' }}>•</span>
            <span style={{ color: '#0891b2' }}>Next-Gen Oral Health Visual Intelligence</span>
          </div>

          {/* Main Hero Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              maxWidth: '960px',
              margin: '0 auto 1.25rem auto',
            }}
          >
            See oral health <span style={{ color: '#0e7490' }}>more clearly.</span>
          </h1>

          <p
            style={{
              fontSize: '1.25rem',
              color: '#475569',
              maxWidth: '780px',
              margin: '0 auto 2.5rem auto',
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            AI-assisted visual intelligence for more informed dental reviews. Transform intraoral photographs into organized anatomical landmarks, optical quality triage, and structured clinical insights.
          </p>

          {/* Primary Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem',
            }}
          >
            <button
              onClick={onLaunchDemo}
              className="btn btn-primary btn-lg"
              style={{
                fontSize: '1.0625rem',
                padding: '0.75rem 1.75rem',
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(14, 116, 144, 0.28)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <span>Get a Free Demo</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onExploreCaseReview}
              className="btn btn-secondary btn-lg"
              style={{
                fontSize: '1.0625rem',
                padding: '0.75rem 1.75rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-md)',
              }}
            >
              <Eye size={18} color="#0e7490" />
              <span>Explore Clinical Studio</span>
            </button>
          </div>

          {/* Hero Clinical Proof Mockup / Interactive Teaser */}
          <div
            style={{
              maxWidth: '1080px',
              margin: '0 auto',
              borderRadius: 'var(--radius-2xl)',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
              border: '1px solid #cbd5e1',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
            }}
          >
            {/* Window bar */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                padding: '0.75rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f87171' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#fbbf24' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#34d399' }} />
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginLeft: '0.5rem' }}>
                  OralVerse Studio — Case OV-DEMO-1042 (Live Simulation)
                </span>
              </div>
              <span className="badge badge-brand">
                Clinical Assist Mode
              </span>
            </div>

            {/* Teaser Display Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.6fr) minmax(320px, 1fr)',
                backgroundColor: '#0f172a',
              }}
            >
              <div style={{ position: 'relative', height: '420px' }}>
                <img
                  src="/images/cases/frontal.jpg"
                  alt="OralVerse Clinical Demo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* SVG Mock Overlay */}
                <svg
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <circle cx="44" cy="44" r="3" fill="#06b6d4" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1" />
                  <circle cx="55" cy="44" r="3" fill="#06b6d4" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1" />
                  <rect x="37" y="38" width="12" height="15" rx="1.5" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 1.5" />
                  <rect x="43" y="57" width="15" height="12" rx="1.5" fill="#f43f5e" fillOpacity="0.25" stroke="#f43f5e" strokeWidth="1.2" />
                </svg>

                <div
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    padding: '0.375rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <CheckCircle2 size={13} color="#34d399" />
                  <span>Optical Quality: <strong>97% Pass</strong></span>
                  <span style={{ color: '#64748b' }}>•</span>
                  <span>FDI #11, #21 Segmented</span>
                </div>
              </div>

              {/* Teaser right panel */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '1.5rem',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: '#0e7490', letterSpacing: '0.05em' }}>
                    Visual Intelligence Findings
                  </div>
                  <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0f172a', marginTop: '0.25rem' }}>
                    Anterior Cervical Third Review
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: '#475569', marginTop: '0.5rem', lineHeight: 1.45 }}>
                    Subtle optical shade differential at cervical margin. Tactile examination with periodontal explorer advised to assess non-carious cervical contour.
                  </p>

                  <div
                    style={{
                      marginTop: '1rem',
                      padding: '0.625rem 0.75rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid #e2e8f0',
                      fontSize: '0.75rem',
                    }}
                  >
                    <div style={{ color: '#64748b' }}>Tooth Landmark: <strong>#11 (UR Central Incisor)</strong></div>
                    <div style={{ color: '#0e7490', fontWeight: 600, marginTop: '2px' }}>Area for Clinician Review</div>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                  <button
                    onClick={onLaunchDemo}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Test Interactive Sandbox</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof & Trust Badges */}
          <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid #f1f5f9' }}>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
              Built for Dental Teams, Clinical Advisors, and Oral Health Researchers
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2.5rem',
                color: '#475569',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} color="#0e7490" />
                <span>Asymptote.ai Vision Engine</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="#059669" />
                <span>FDI & Universal Notation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={18} color="#0284c7" />
                <span>Privacy-First Architecture</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Stethoscope size={18} color="#0e7490" />
                <span>Clinician-in-the-Loop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Capabilities Section */}
      <section id="features" style={{ padding: '5rem 2rem', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0e7490', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Engineered for Modern Dentistry
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '0.5rem' }}>
              Every feature designed for visual clarity and diagnostic speed.
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748b', marginTop: '0.75rem', lineHeight: 1.5 }}>
              OralVerse unifies intraoral photography, automated quality triage, and tooth-level landmark indexing into one cohesive workstation.
            </p>
          </div>

          {/* 4 Pillar Feature Cards */}
          <div className="grid-cols-4">
            <div className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: '#ecfeff',
                  border: '1px solid #a5f3fc',
                  color: '#0e7490',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Layers size={22} />
              </div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0f172a' }}>
                Intraoral Segmentation
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5 }}>
                Automatic identification of individual teeth, enamel margins, cervical boundaries, and interdental papillae with interactive ROI bounding overlays.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: '#f0fdfa',
                  border: '1px solid #ccfbf1',
                  color: '#0d9488',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Camera size={22} />
              </div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0f172a' }}>
                Optical Quality Triage
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5 }}>
                Immediate screening for camera motion blur, salivary glare, and ring flash exposure imbalances before the patient leaves the dental operatory.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: '#ecfeff',
                  border: '1px solid #a5f3fc',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SplitSquareHorizontal size={22} />
              </div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0f172a' }}>
                Multi-View Comparison
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5 }}>
                Side-by-side Dual Pane and interactive Split Wipe comparison modes across frontal occlusion, maxillary mirror, and lateral buccal angles.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BarChart3 size={22} />
              </div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0f172a' }}>
                Practice Quality Analytics
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5 }}>
                Visual analytics tracking case review velocity, pass rates per anatomical angle, and common reasons for photo retakes over customizable periods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Clinical Workflow Section */}
      <section id="workflow" style={{ padding: '5rem 2rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0e7490', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Standard Operating Procedure
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '0.5rem' }}>
              How OralVerse fits seamlessly into clinical appointments.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                step: '01',
                title: 'Capture & Local Intake',
                desc: 'Upload high-resolution frontal, occlusal, and buccal photographs directly into the local session without external transmission.',
              },
              {
                step: '02',
                title: 'Optical Quality Screening',
                desc: 'Simulated optical checks assess focus sharpness and ring flash uniformity to identify any need for immediate retakes.',
              },
              {
                step: '03',
                title: 'Visual Segmentation',
                desc: 'Anatomical landmarks are indexed with FDI or Universal tooth numbers, and areas of interest are highlighted for inspection.',
              },
              {
                step: '04',
                title: 'Clinician Review & Notes',
                desc: 'Dental professionals verify observations, adjust contrast/brightness, and save findings directly into the case record.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#0e7490',
                  }}
                >
                  {item.step}
                </span>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Responsibility & Ethics Framing Section */}
      <section id="ethics" style={{ padding: '4rem 2rem', backgroundColor: '#f0fdfa', borderTop: '1px solid #ccfbf1', borderBottom: '1px solid #ccfbf1' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={28} color="#0e7490" />
            <div>
              <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0f172a' }}>
                Our Commitment to Clinical Responsibility
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#0f766e', marginTop: '2px' }}>
                Empowering clinician judgment — never replacing it.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.25rem',
              marginTop: '0.5rem',
            }}
          >
            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #ccfbf1' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a', marginBottom: '0.375rem' }}>
                Clinician-in-the-Loop Philosophy
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.45 }}>
                OralVerse provides visual review prompts and landmark boundaries. It does not generate autonomous medical diagnoses or dictate patient treatment plans.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #ccfbf1' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a', marginBottom: '0.375rem' }}>
                Transparent Uncertainty Display
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.45 }}>
                Visual annotations highlight areas requiring closer in-person examination, explicitly noting optical limitations such as saliva glare or underexposure.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #ccfbf1' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a', marginBottom: '0.375rem' }}>
                Zero Health Identifier Storage
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.45 }}>
                This frontend technology demonstration runs entirely client-side. No identifiable patient health information (PHI) is ever transmitted to remote databases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
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
            }}
          >
            <Sparkles size={28} />
          </div>

          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Experience OralVerse today.
          </h2>

          <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: 1.5, maxWidth: '600px' }}>
            Launch the interactive demo workspace to test image segmentation, case triage, and quality analytics with pre-loaded clinical intraoral photography.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              onClick={onLaunchDemo}
              className="btn btn-primary btn-lg"
              style={{
                fontSize: '1.0625rem',
                fontWeight: 700,
                padding: '0.75rem 2rem',
                boxShadow: '0 8px 24px rgba(14, 116, 144, 0.28)',
              }}
            >
              <span>Get a Free Demo</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <footer
        style={{
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#fafbfc',
          padding: '3rem 2rem 2rem 2rem',
          fontSize: '0.8125rem',
          color: '#64748b',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div>
            <BrandLogo size="md" showTagline={true} />
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>
              AI-assisted oral health imaging and clinical review platform.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <button
              onClick={onLaunchDemo}
              style={{ background: 'none', border: 'none', color: '#0e7490', cursor: 'pointer', fontWeight: 600, padding: 0 }}
            >
              Launch Demo Workspace
            </button>
            <button
              onClick={onExploreCaseReview}
              style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: 0 }}
            >
              Case Review Studio
            </button>
          </div>
        </div>

        <div
          style={{
            maxWidth: '1200px',
            margin: '2rem auto 0 auto',
            paddingTop: '1.5rem',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.6875rem',
            color: '#94a3b8',
          }}
        >
          <div>
            © 2026 Asymptote.ai. All rights reserved. OralVerse™ is a trademark of Asymptote.ai.
          </div>
          <div>
            Disclaimer: OralVerse does not replace professional dental examination, diagnosis, or treatment.
          </div>
        </div>
      </footer>
    </div>
  );
};
