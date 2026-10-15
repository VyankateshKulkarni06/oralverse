---
name: company-os
description: >-
  Executes the Company OS automatic knowledge, task, progress, and version management loop.
  Activate whenever the user shares daily updates, task completions, clinical findings, decisions,
  blockers, ideas, or requests daily planning or closeout reconciliation.
---

# Company OS — Automatic Knowledge & Progress Maintenance Skill

This skill governs the automated maintenance of OralVerse / Asymptote.ai canonical memory, task board, decision logs, and immutable event stream located in `os-knowledgebase/`.

---

## When to Activate This Skill

Activate this skill when:
- The user provides natural language progress updates (e.g., "I finished reviewing the dataset", "The clinical evidence is weak", "We decided to delay milestone 2").
- The user requests a start-of-day plan ("What should I work on today?", "Daily plan").
- The user requests an end-of-day closeout ("Close the day", "Daily review", "Wrap up").
- A new dataset, architectural decision, or competitor finding is introduced.

---

## The 10-Step Transactional Execution Loop

Whenever a message contains a meaningful business, product, or engineering update, execute this exact sequence:

### Step 1: Parse Input Entities
Extract and classify:
- **Goals / Milestones:** Long-term or sprint objectives.
- **Tasks & Progress:** What was worked on, what was reported finished, what was blocked.
- **Decisions:** Strategic or technical choices with rationales.
- **Findings / Evidence:** Clinical, technical, or market insights.
- **Blockers / Risks:** Impediments, missing access, or uncertain licensing.

### Step 2: Read Current State Before Modifying
Before writing any file, read:
1. `os-knowledgebase/CURRENT_COMPANY_STATE.md`
2. The specific domain's `CURRENT.md` (e.g., `04-data-and-compliance/CURRENT.md` or `08-execution/CURRENT.md`)
3. The relevant record file (e.g., `08-execution/tasks.md` or `09-decisions/CURRENT.md`)

### Step 3: Match Stable Record IDs (Prevent Duplicates)
- Check existing IDs: `TSK-xxx`, `DEC-xxx`, `DS-xxx`, `EVT-xxx`.
- If an entity matches an existing record, update that record; **never** create duplicate tasks or decisions.
- If it is new, allocate the next sequential ID.

### Step 4: Tag with Strict Epistemic Status
Assign one of the standard tags:
- `[VERIFIED]`: Direct inspection, code execution, or checksum verified.
- `[USER-REPORTED]`: Stated by user, accepted as current intention/progress, but not independently verified.
- `[SOURCE-BACKED]`: Supported by explicit document citation or external literature.
- `[PROPOSED]`: Suggestion awaiting evaluation or decision.
- `[INFERRED]`: Deductive reasoning from known facts.
- `[UNRESOLVED]`: Requires external clarification or missing access.

### Step 5: Append Immutable Event to JSONL
Append a single JSON line to `os-knowledgebase/11-events/events.jsonl`:
```json
{
  "event_id": "EVT-YYYYMMDD-xxx",
  "timestamp": "ISO-8601-with-timezone",
  "event_type": "task_updated | progress_logged | decision_recorded | dataset_cataloged | state_reconciled",
  "actor": "user | agent:orchestrator",
  "source_ref": "chat:<id>",
  "affected_record_ids": ["TSK-xxx", "CURRENT_COMPANY_STATE"],
  "summary": "Factual description",
  "epistemic_status": "verified | user-reported | source-backed",
  "details": {}
}
```

### Step 6: Update Affected Task & Domain Files
- In `08-execution/tasks.md`: Update status (`in_progress`, `user_reported_done`, `verified_done`, `blocked`), last update timestamp, and completion evidence.
- In affected domain `CURRENT.md`: Update bullet points, metrics, and tables with new evidence and status.

### Step 7: Reconcile Global State
- Update `os-knowledgebase/CURRENT_COMPANY_STATE.md` (and root `CURRENT_COMPANY_STATE.md`).
- Ensure active blockers, sprint velocity, and domain snapshots match the latest reality.

### Step 8: Validate Consistency & Links
- Check that all relative markdown links (`file:///...` or relative `./`) resolve.
- Confirm IDs match across task board, decisions, and event log.

### Step 9: Atomic Git Commit
- Run `git status` and `git diff` to review staged changes.
- Ensure no untracked dependencies (`node_modules`) or sensitive secrets are staged.
- Commit with a clear, conventional commit message:
  ```bash
  git commit -m "docs(company-os): reconcile state for <summary>"
  ```
- If git commit fails, report the error honestly; do not claim success.

### Step 10: Deliver Concise Recap
Inform the user:
- What records were updated (with clickable links).
- What was recorded as `[USER-REPORTED]` vs `[VERIFIED]`.
- Any remaining blockers or decisions requiring their input.

---

## Daily Operating Procedures

### Start of Day Protocol
1. Read `os-knowledgebase/CURRENT_COMPANY_STATE.md` and `08-execution/CURRENT.md`.
2. Review unfinished tasks and blockers from yesterday's log.
3. Recommend 3–5 prioritized, achievable focus items for the day.
4. Log the planned focus in today's log `10-activity/daily/YYYY-MM-DD.md`.

### Close of Day Protocol
1. Reconcile planned tasks against actual progress.
2. Mark completed items with proper epistemic status (`[VERIFIED]` if inspected, `[USER-REPORTED]` if stated without verifiable artifact).
3. Finalize today's log in `10-activity/daily/YYYY-MM-DD.md`.
4. Append `daily_closeout` event to `11-events/events.jsonl`.
5. Update `CURRENT_COMPANY_STATE.md`.
6. Commit all updated files to Git.
7. Present an executive summary and recommended priorities for tomorrow.
