# Company Home — OralVerse / Asymptote.ai

> **Welcome to the Company Operating System (Company OS).**  
> This directory represents the canonical single source of truth for company strategy, product specifications, clinical evidence, technical architecture, data governance, execution milestones, decisions, and immutable activity history.

---

## 1. Quick Navigation to Authoritative Records

| Directory / File | Domain / Scope | Authority Level | Primary Contact / Owner |
| :--- | :--- | :--- | :--- |
| [`CURRENT_COMPANY_STATE.md`](../CURRENT_COMPANY_STATE.md) | **Cross-Company Snapshot**: Latest high-level status, active sprint, key metrics, and immediate blockers | Canonical Summary | Orchestrator Agent / Founder |
| [`00-start-here/WORKING_AGREEMENT.md`](./WORKING_AGREEMENT.md) | Operating protocols, communication loop, and epistemic state conventions | Binding Protocol | Orchestrator Agent |
| [`00-start-here/SYSTEM_MAP.md`](./SYSTEM_MAP.md) | Architecture, integrations, storage boundaries, and access topologies | Architecture Baseline | Lead Engineer |
| [`01-company/CURRENT.md`](../01-company/CURRENT.md) | Mission, vision, company goals, OKRs, and operating metrics | Canonical Strategy | Founder / CEO |
| [`02-product/CURRENT.md`](../02-product/CURRENT.md) | OralVerse product definition, user workflows, feature roadmap, and specifications | Canonical Product | Product Lead |
| [`03-engineering/CURRENT.md`](../03-engineering/CURRENT.md) | Tech stack, system architecture, repo topology, CI/CD, and technical debt | Canonical Engineering | Engineering Lead |
| [`04-data-and-compliance/CURRENT.md`](../04-data-and-compliance/CURRENT.md) | Dataset catalog, data licensing, regulatory boundary, HIPAA/GDPR compliance | Canonical Compliance | Data Governance Lead |
| [`05-clinical/CURRENT.md`](../05-clinical/CURRENT.md) | Clinical evidence, validation studies, advisory feedback, diagnostic boundaries | Canonical Clinical | Clinical Advisor |
| [`06-market-and-competitors/CURRENT.md`](../06-market-and-competitors/CURRENT.md) | Competitor intelligence (Overjet, Pearl, VideaHealth, etc.) and differentiation | Canonical Market Intel | Market Analyst |
| [`07-finance/CURRENT.md`](../07-finance/CURRENT.md) | Financial model, budget assumptions, runway, and cash-flow projections | Restricted Summary | Founder / Finance Lead |
| [`08-execution/CURRENT.md`](../08-execution/CURRENT.md) | Active sprint tasks, backlog, milestones, and blockers | Canonical Execution | Orchestrator Agent |
| [`09-decisions/CURRENT.md`](../09-decisions/CURRENT.md) | Architecture Decision Records (ADRs) with stable sequential IDs (`DEC-xxx`) | Canonical Decisions | Architecture Board |
| [`10-activity/daily/`](../10-activity/daily/) | Chronological daily logs (`YYYY-MM-DD.md`) summarizing planned vs verified work | Historical Log | Orchestrator Agent |
| [`11-events/events.jsonl`](../11-events/events.jsonl) | Append-only, structured JSONL transactional event audit log | Immutable Event Store | System One-Writer |
| [`12-reports/CURRENT.md`](../12-reports/CURRENT.md) | Formal deliverables, milestone audits, and setup verification reports | Formal Deliverables | Orchestrator Agent |
| [`INTEGRATION_STATUS.md`](../INTEGRATION_STATUS.md) | Tooling, connector status, Google Drive readiness, and access limitations | Operational Status | System Admin |

---

## 2. Core Operating Principles

1. **One-Writer Architecture**: All canonical edits flow through the designated Orchestrator agent to prevent race conditions and conflicting state. Specialist agents provide proposed findings and recommendations.
2. **Epistemic Honesty**: Facts, assumptions, user reports, and verified findings are explicitly tagged with their provenance. Unverified claims are never elevated to company facts.
3. **Storage Responsibilities**:
   - **Private Git Repository**: Canonical company memory, task tracking, decisions, structured events, and domain current states.
   - **External Storage / Google Drive**: Binary datasets, raw clinical scans, high-resolution media, and heavy artifacts referenced via stable IDs.
4. **Automatic Maintenance**: Natural communication automatically updates tasks, logs events, reconciles state, and commits cleanly to version control without manual bookkeeping overhead.
