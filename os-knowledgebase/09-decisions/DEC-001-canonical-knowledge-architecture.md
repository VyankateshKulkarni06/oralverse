# DEC-001: Single Source of Truth & One-Writer Git Architecture

- **Decision ID:** `DEC-001`
- **Title:** Single Source of Truth & One-Writer Git Architecture
- **Status:** `approved`
- **Decision Owner:** Founder & Antigravity Orchestrator
- **Date:** 2026-10-15
- **Epistemic Status:** `[VERIFIED]`

---

## 1. Context

As OralVerse scales development, company knowledge, product requirements, clinical research, data licenses, tasks, and decisions have been communicated organically in natural conversation. Without a rigorous, machine-readable operating system, critical decisions risk being lost, tasks slip untracked, and multiple agents can introduce conflicting versions of reality.

## 2. Alternatives Considered

1. **Third-Party SaaS Management (Notion, Jira, Coda)**:
   - *Pros:* Familiar visual boards.
   - *Cons:* Fragile API synchronization, high context switching, disconnected from codebase versioning, potential privacy leaks, and manual administrative burden.
2. **Local Multi-Agent Swarm with Distributed Writers**:
   - *Pros:* High concurrency.
   - *Cons:* Prone to merge conflicts, race conditions, file clobbering, and unverified hallucinations writing directly to canonical memory.
3. **Repository-Native Markdown with Single-Writer Orchestrator (Selected)**:
   - *Pros:* Direct version control in Git, auditability, diff inspection, offline availability, zero SaaS subscription overhead, and strict atomicity via the one-writer orchestrator pattern.

## 3. Rationale

Using the Git repository (`os-knowledgebase/`) guarantees that code, tests, documentation, task records, and decisions live in close synchronization. Restricting canonical file writes to a single orchestrator prevents race conditions while still allowing specialized subagents to generate domain findings.

## 4. Supporting Evidence

- Git repository `https://github.com/VyankateshKulkarni06/oralverse.git` is active, accessible, and already tracks the codebase.
- Antigravity IDE natively parses project rules and agent skills from repository paths (`.agents/`).

## 5. Consequences

- **Positive:** Full change history, zero manual administrative overhead for the human user, complete provenance via JSONL event logging.
- **Negative / Constraints:** Orchestrator must carefully order writes and validate links on every update transaction.

## 6. Superseding Decision

- *None (Active baseline).*
