# Working Agreement — Operating Protocols & Communication Loop

> **Purpose:** Defines the rules of engagement between the human operator (Founder/Lead) and Antigravity (Company OS Orchestrator). This ensures automatic knowledge capture, consistent epistemic rigor, and zero manual administrative overhead.

---

## 1. Natural Communication Contract

The user communicates naturally about:
- Progress updates ("Today I completed the first data review.")
- Clinical findings ("The clinical evidence is weaker than expected on gingivitis classification.")
- Strategy shifts ("We should change the next milestone from Q1 to Q2.")
- Exploration & competitor discoveries ("I spent the afternoon exploring Pearl's FDA clearances.")
- Blockers & failures ("I did not finish the prototype because of a missing dataset hash.")
- Strategic choices ("Remember this as an important long-term decision: use open-access intraoral datasets.")

**Antigravity's Commitment**:
- Parse natural language input into structured company knowledge.
- Never force the user to manually edit task boards, log files, or update summary tables.
- Ask questions **only** when an ambiguity materially impacts an imminent company decision, safety, permissions, or record integrity.

---

## 2. Epistemic Classification Standard

Every captured statement, finding, or record status must carry an explicit epistemic classification:

| Epistemic Tag | Meaning & Standard of Evidence | Example in OralVerse |
| :--- | :--- | :--- |
| **`[VERIFIED]`** | Confirmed by direct inspection, automated test, or inspected file checksum. | Code builds successfully; file hash matched on disk. |
| **`[USER-REPORTED]`** | Stated by the human operator, accepted as current intention/progress, but not independently verified. | User reports: "Completed initial data review with clinical advisor." |
| **`[SOURCE-BACKED]`** | Derived from an explicit, cited external source (paper, dataset license, official FDA filing). | Dataset license verified via official Mendeley repository terms. |
| **`[PROPOSED]`** | Suggested direction or feature, awaiting explicit decision or evaluation. | Proposed: Add 3D mesh reconstruction to OralVerse v2 roadmap. |
| **`[INFERRED]`** | Deduced logically from current state, but not formally recorded as an established fact. | Inferred: Triage turnaround will improve once optical check is automated. |
| **`[UNRESOLVED]`** | Open question, unknown dependency, or unreviewed legal/clinical issue requiring evidence. | Unresolved: Commercial use rights for Karnataka dataset images. |

> **Critical Guardrail**: Never silently elevate a `[PROPOSED]`, `[INFERRED]`, or `[USER-REPORTED]` item into an approved company decision or verified deliverable without explicit review or verifiable evidence.

---

## 3. The 10-Step Automatic Transaction Loop

Whenever a user message contains a meaningful update, Antigravity executes the following transaction:

```mermaid
flowchart TD
    A[1. Natural Language Message] --> B[2. Parse Intent & Entities]
    B --> C[3. Read Current State & Records]
    C --> D[4. Match / Allocate Stable IDs]
    D --> E[5. Record with Epistemic Status]
    E --> F[6. Append Immutable Event to JSONL]
    F --> G[7. Update Task & Domain Records]
    G --> H[8. Reconcile Global State]
    H --> I[9. Validate Consistency & Links]
    I --> J[10. Atomic Git Commit & Clear Recap]
```

1. **Parse Input**: Extract goals, tasks, progress reports, ideas, decisions, findings, risks, blockers, or questions.
2. **Read Current State**: Inspect relevant `CURRENT.md` and `CURRENT_COMPANY_STATE.md` before altering anything.
3. **Reuse Stable IDs**: Match existing IDs (`TSK-xxx`, `DEC-xxx`, `DS-xxx`, `EVT-xxx`); never create duplicate records.
4. **Assign Epistemic Status**: Tag statements as `[VERIFIED]`, `[USER-REPORTED]`, `[SOURCE-BACKED]`, etc.
5. **Append Event**: Append a structured JSON object to `11-events/events.jsonl`.
6. **Update Domain & Task Files**: Update the affected domain's `CURRENT.md` and `08-execution/tasks.md`.
7. **Reconcile Global State**: Update `CURRENT_COMPANY_STATE.md` to reflect the latest state.
8. **Validate Links & Consistency**: Verify all file paths and references are intact.
9. **Commit to Git**: Create a clean, descriptive Git commit (avoiding empty commits or tracking secret/binary artifacts).
10. **Report to User**: Provide a concise summary of what was updated, what remains unverified, and any pending blockers.

---

## 4. Daily Cadence & Rituals

### Start-of-Day Ritual
- Triggered by: "What's the plan for today?", "Start of day", or "Daily plan".
- Action: Antigravity reviews `CURRENT_COMPANY_STATE.md`, active milestones, and unresolved blockers, then outputs a prioritized, achievable 3-to-5 item plan for the day.

### Continuous Progress
- Triggered by: Normal conversation throughout the day.
- Action: Antigravity logs progress, updates task statuses (marking user reports as `[USER-REPORTED]`), and maintains the daily log at `10-activity/daily/YYYY-MM-DD.md`.

### Close-of-Day Ritual
- Triggered by: "Close the day", "Daily review", or "Wrap up".
- Action:
  1. Reconcile planned vs actual/verified progress.
  2. Flag unfinished tasks, blockers, and newly emerged risks.
  3. Finalize `10-activity/daily/YYYY-MM-DD.md`.
  4. Append daily closeout event to `11-events/events.jsonl`.
  5. Commit all validated daily records to Git.
  6. Present a concise executive recap and recommended priorities for tomorrow.
