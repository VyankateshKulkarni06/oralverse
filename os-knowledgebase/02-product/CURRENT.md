# Product Domain — Current State & Roadmap

> **Domain:** 02-product  
> **Product:** OralVerse (Clinical Technology Platform)  
> **Status:** `[VERIFIED]` in active engineering  
> **Last Updated:** 2026-10-15  
> **Custodian:** Product Lead  

---

## 1. Product Summary & Value Proposition

OralVerse is a clinical technology frontend platform that transforms intraoral photographs into organized visual insights. Designed for dental professionals, clinical advisors, and diagnostic review workflows, OralVerse assists clinicians in inspecting anatomical landmarks, reviewing visual findings, and evaluating photographic quality.

---

## 2. Implemented Features & Capabilities (`[VERIFIED]`)

- **Interactive Oral Health Overview**: Intraoral image viewer with interactive SVG tooth segmentation, FDI / Universal tooth numbering labels, and linked findings inspection panel.
- **Case Review Studio**: Clinical image viewer equipped with zoom controls (50%–250%), brightness and contrast adjustment sliders, filmstrip carousel navigation, and clinician notes editor.
- **New Analysis Stepper**: 4-step workflow (Add Images, Check Quality, Tag Angles, Simulate Analysis) with interactive clinical scanning animation.
- **Intraoral Image Library & Comparison**: Gallery with anatomical angle filters, lightbox viewer, and side-by-side comparative inspection modal (Dual Pane & Split Wipe modes).
- **Quality & Turnaround Analytics**: Recharts visualizations for case volume, triage velocity, optical pass rates, and retake root-cause analysis.
- **Landing Page**: Commercial landing page with product showcases, diagnostic feature previews, and "Get a Free Demo" entry point into the clinical workspace.
- **Clinical Responsibility Framing**: Persistent medical disclaimer and simulated sandbox notices clearly separating demonstration mock models from actual diagnostic claims.

---

## 3. Active Roadmap (Milestones)

| Milestone | Target Horizon | Scope & Deliverables | Status | Epistemic Status |
| :--- | :--- | :--- | :--- | :--- |
| **M1: Core UI & Landing** | Q3-Q4 2026 | Full web UI, interactive SVG tooth viewer, analysis stepper, landing page | **Completed** | `[VERIFIED]` |
| **M2: Backend API & Pipeline** | Q4 2026 | Cloud inference pipeline for landmark detection and gingivitis classification | Planned | `[PROPOSED]` |
| **M3: Real-Time Quality Check** | Q1 2027 | On-device / client-side blur & glare pre-screening to eliminate photo retakes | Planned | `[PROPOSED]` |
| **M4: Clinical Advisor Portal** | Q1 2027 | Multi-user asynchronous second-opinion and peer review network | Planned | `[PROPOSED]` |

---

## 4. Product Decisions & Constraints

- **Regulatory Framing**: OralVerse operates strictly as a Clinical Decision Support (CDS) tool under human-in-the-loop oversight. It does not provide autonomous diagnostic declarations without clinician confirmation (`DEC-001`).
- **Standardized Numbering**: Both FDI 2-digit and Universal numbering systems are supported to accommodate global dental practices.
