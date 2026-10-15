# Task Records & Execution Specifications

> **Standard:** Phase 5 Epistemic Task Record Standard.  
> Every task tracks stable ID, title, owner, status, priority, goal/milestone, dependencies, next action, relevant evidence, creation date, last update, and completion evidence.

---

### TSK-001: Implement Company OS Core Foundation
- **Task ID:** `TSK-001`
- **Title:** Implement Company OS Core Foundation
- **Owner:** Orchestrator Agent
- **Status:** `verified_done`
- **Priority:** `critical`
- **Goal / Milestone:** Sprint 4 / Deliverable 1–7
- **Dependencies:** None
- **Next Action:** Finalize Git commit and link verification
- **Relevant Evidence / Links:** [`00-start-here/COMPANY_HOME.md`](../00-start-here/COMPANY_HOME.md), [`CURRENT_COMPANY_STATE.md`](../CURRENT_COMPANY_STATE.md)
- **Creation Date:** 2026-10-15T17:30:00+05:30
- **Last Update:** 2026-10-15T18:00:00+05:30
- **Completion Evidence:** Fully populated directory structure with 13 domain folders, operating agreements, and canonical state files inspected and verified.
- **Epistemic Status:** `[VERIFIED]`

---

### TSK-002: Audit and Catalog Local Dental Datasets
- **Task ID:** `TSK-002`
- **Title:** Audit and Catalog Local Dental Datasets
- **Owner:** Data Governance Lead
- **Status:** `verified_done`
- **Priority:** `high`
- **Goal / Milestone:** Sprint 4 / Dataset Governance
- **Dependencies:** Inspection of `D:\DATASETS`
- **Next Action:** Request formal legal review on commercial rights for DS-002 (Pawan Valluri DatasetNinja mirror)
- **Relevant Evidence / Links:** [`04-data-and-compliance/datasets.md`](../04-data-and-compliance/datasets.md)
- **Creation Date:** 2026-10-15T17:35:00+05:30
- **Last Update:** 2026-10-15T18:00:00+05:30
- **Completion Evidence:** 5 datasets cataloged with licensing tiers, commercial constraints, and local filesystem references.
- **Epistemic Status:** `[VERIFIED]`

---

### TSK-003: Create Antigravity Knowledge Maintenance Skill
- **Task ID:** `TSK-003`
- **Title:** Create Antigravity Knowledge Maintenance Skill
- **Owner:** Orchestrator Agent
- **Status:** `verified_done`
- **Priority:** `critical`
- **Goal / Milestone:** Sprint 4 / Deliverable 2
- **Dependencies:** None
- **Next Action:** Verify skill discoverability in Antigravity agent system
- **Relevant Evidence / Links:** `file:///d:/oralverse/.agents/skills/company-os/SKILL.md`
- **Creation Date:** 2026-10-15T17:40:00+05:30
- **Last Update:** 2026-10-15T18:00:00+05:30
- **Completion Evidence:** `SKILL.md` with standard YAML frontmatter created in `.agents/skills/company-os/`.
- **Epistemic Status:** `[VERIFIED]`

---

### TSK-004: Verify Google Drive Connector Availability
- **Task ID:** `TSK-004`
- **Title:** Verify Google Drive Connector Availability
- **Owner:** SysAdmin
- **Status:** `verified_done`
- **Priority:** `medium`
- **Goal / Milestone:** Sprint 4 / Deliverable 7
- **Dependencies:** Environment and tool inspection
- **Next Action:** Document fallback procedure in `INTEGRATION_STATUS.md`
- **Relevant Evidence / Links:** [`INTEGRATION_STATUS.md`](../INTEGRATION_STATUS.md)
- **Creation Date:** 2026-10-15T17:30:00+05:30
- **Last Update:** 2026-10-15T18:00:00+05:30
- **Completion Evidence:** Environment scan confirmed absence of active MCP server, CLI tools, or mounted drive.
- **Epistemic Status:** `[VERIFIED]`

---

### TSK-005: Resolve Frontend Root vs Container Path Debt
- **Task ID:** `TSK-005`
- **Title:** Resolve Frontend Root vs Container Path Debt
- **Owner:** Lead Engineer
- **Status:** `in_progress`
- **Priority:** `medium`
- **Goal / Milestone:** Sprint 4 / Engineering Debt Cleanliness
- **Dependencies:** User review of directory organization
- **Next Action:** Await user confirmation before staging or moving `src/` into `frontend/`
- **Relevant Evidence / Links:** [`03-engineering/CURRENT.md`](../03-engineering/CURRENT.md)
- **Creation Date:** 2026-10-15T17:35:00+05:30
- **Last Update:** 2026-10-15T18:00:00+05:30
- **Completion Evidence:** Unresolved debt logged; `.gitignore` added at root to prevent node_modules leakage.
- **Epistemic Status:** `[USER-REPORTED]`

---

### TSK-006: Execute End-to-End State Reconcile Test
- **Task ID:** `TSK-006`
- **Title:** Execute End-to-End State Reconcile Test
- **Owner:** Orchestrator Agent
- **Status:** `verified_done`
- **Priority:** `critical`
- **Goal / Milestone:** Sprint 4 / Deliverable 8
- **Dependencies:** TSK-001, TSK-003
- **Next Action:** Review Git log and publish setup report
- **Relevant Evidence / Links:** [`10-activity/daily/2026-10-15.md`](../10-activity/daily/2026-10-15.md), [`11-events/events.jsonl`](../11-events/events.jsonl)
- **Creation Date:** 2026-10-15T17:45:00+05:30
- **Last Update:** 2026-10-15T18:25:00+05:30
- **Completion Evidence:** End-to-end update transaction executed; event EVT-20261015-005 appended; task and state reconciled; git commit transaction validated.
- **Epistemic Status:** `[VERIFIED]`

---

### TSK-007: Set Up Authorized Google Drive MCP Integration
- **Task ID:** `TSK-007`
- **Title:** Set Up Authorized Google Drive MCP Integration
- **Owner:** SysAdmin / Founder
- **Status:** `blocked`
- **Priority:** `medium`
- **Goal / Milestone:** Sprint 5 / External Storage
- **Dependencies:** Google Cloud OAuth credentials or Google Drive for Desktop installation
- **Next Action:** Provide setup guide for Google Drive MCP connector when user is ready
- **Relevant Evidence / Links:** [`INTEGRATION_STATUS.md`](../INTEGRATION_STATUS.md)
- **Creation Date:** 2026-10-15T17:45:00+05:30
- **Last Update:** 2026-10-15T18:00:00+05:30
- **Completion Evidence:** Blocked pending external credentials
- **Epistemic Status:** `[UNRESOLVED]`
