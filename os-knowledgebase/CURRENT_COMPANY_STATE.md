# Current Company State — OralVerse / Asymptote.ai

> **Canonical Snapshot:** Single high-level source of truth for current company reality.  
> **Reconciled Date:** 2026-10-15  
> **Sprint:** Sprint 4 — Operating System & Evidence Engine Integration  
> **Authority:** Orchestrator Agent  

---

## 1. Executive Summary

OralVerse is building an AI-assisted visual clinical intelligence platform for dental reviews and intraoral photograph analysis. The frontend platform features an interactive tooth segmentation viewer, FDI/Universal tooth numbering, and an ergonomic case review studio. Today, the internal development process transitioned to an automated **Company Operating System (Company OS)** managed by Antigravity, unifying task execution, dataset auditing, decision records, and append-only activity tracking.

---

## 2. Cross-Domain Status Snapshot

| Domain | Status | Current Reality / Key Milestone | Epistemic Status | Owner |
| :--- | :--- | :--- | :--- | :--- |
| **01 Company** | Active | Mission defined; OKRs set for clinical platform maturity & audited data foundation. | `[VERIFIED]` | Founder |
| **02 Product** | Complete UI | Review studio, interactive SVG tooth viewer, and commercial landing page implemented. | `[VERIFIED]` | Product Lead |
| **03 Engineering** | Reorganized | React 19 + TypeScript + Vite. Working tree has frontend separation; debt logged. | `[VERIFIED]` | Lead Engineer |
| **04 Data & Compliance** | Audited | 5 local datasets cataloged in `D:\DATASETS` (Gingivitis, DentalAI, Mendeley, etc.). | `[VERIFIED]` | Governance Lead |
| **05 Clinical** | Evidence Base | Diagnostic boundaries defined (CDS only; no autonomous diagnosis without clinician). | `[VERIFIED]` | Clinical Advisor |
| **06 Market & Competitors**| Differentiated| Positioned in photographic intraoral AI whitespace, avoiding crowded 2D X-ray niche. | `[SOURCE-BACKED]` | Market Lead |
| **07 Finance** | Bootstrap | Cloud inference cost managed; strict policy prohibiting costly local LLM hardware. | `[VERIFIED]` | Founder |
| **08 Execution** | Sprint 4 | 5 tasks verified done, 1 in progress, 1 blocked. Core OS delivered. | `[VERIFIED]` | Orchestrator |
| **09 Decisions** | 2 ADRs | `DEC-001` (One-Writer Git Store) & `DEC-002` (External Dataset Referencing) approved. | `[VERIFIED]` | Arch Board |
| **10 Activity** | Current | Daily log for 2026-10-15 recorded and reconciled. | `[VERIFIED]` | Orchestrator |
| **11 Events** | 5 Events | Append-only event log (`events.jsonl`) recording system initialization, ADRs, and verified test transaction. | `[VERIFIED]` | System Writer |
| **12 Reports** | Delivered | Initial Company OS setup verification report published. | `[VERIFIED]` | Orchestrator |

---

## 3. Active Immediate Blockers & Open Inquiries

1. **`[UNRESOLVED]` Google Drive Automated Sync:** Missing authorized MCP connector or Drive for Desktop mount prevents programmatic cloud sync. Addressed via local file ID references (`DEC-002`).
2. **`[UNRESOLVED]` Commercial Dataset Licensing:** DS-002 (Pawan Valluri DatasetNinja mirror) requires formal legal confirmation before commercial training usage.
3. **`[USER-REPORTED]` Working Tree Path Debt:** Frontend container folder reorganization awaits user confirmation for final directory staging.

---

## 4. Key Links & Domain Access

- Navigation Portal: [`00-start-here/COMPANY_HOME.md`](./00-start-here/COMPANY_HOME.md)
- Working Agreement & Transaction Rules: [`00-start-here/WORKING_AGREEMENT.md`](./00-start-here/WORKING_AGREEMENT.md)
- Active Task Board: [`08-execution/tasks.md`](./08-execution/tasks.md)
- Dataset Master Catalog: [`04-data-and-compliance/datasets.md`](./04-data-and-compliance/datasets.md)
- Event Store: [`11-events/events.jsonl`](./11-events/events.jsonl)
