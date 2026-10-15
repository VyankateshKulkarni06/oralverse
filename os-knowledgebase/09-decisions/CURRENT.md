# Decisions Domain — Architecture Decision Records (ADRs)

> **Domain:** 09-decisions  
> **Status:** `[VERIFIED]` active  
> **Last Updated:** 2026-10-15  
> **Custodian:** Architecture Board / Orchestrator  

---

## 1. Decision Governance Policy

1. **Immutable Historical Records**: Once an ADR is marked `approved`, it is never modified or erased to reflect a later change. If a decision changes, a new ADR is drafted with a fresh stable ID (`DEC-xxx`), and the prior ADR is updated with status `superseded` linking to the new record.
2. **Epistemic Truth Guardrail**: Antigravity agents cannot unilaterally mark a proposal as `approved`. Only decisions authorized by the human operator or confirmed via explicit policy are marked `approved`. All agent proposals start in status `proposed`.

---

## 2. Decision Index

| ID | Title | Status | Owner | Date | Key Consequence | Epistemic Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [`DEC-001`](./DEC-001-canonical-knowledge-architecture.md) | Single Source of Truth & One-Writer Git Architecture | **Approved** | Founder / Orchestrator | 2026-10-15 | `os-knowledgebase/` in Git acts as the canonical store; one-writer pattern enforced. | `[VERIFIED]` |
| [`DEC-002`](./DEC-002-google-drive-dataset-referencing.md) | External Dataset Referencing & Google Drive Decoupling | **Approved** | Governance Lead | 2026-10-15 | Heavy raw imagery stored externally; Git tracks metadata, IDs, hashes only. | `[VERIFIED]` |
