# Company OS Operating Instructions — Canonical Knowledge Base

> **Location:** `os-knowledgebase/AGENTS.md`  
> **Authority:** Local domain rules applying to all operations within `os-knowledgebase/`.  
> **Global Rules Reference:** [`../AGENTS.md`](../AGENTS.md)  

---

## Operating Directives

1. **One-Writer Policy:** The orchestrator agent is the only entity permitted to write or edit files in `os-knowledgebase/`. Specialist agents submit proposed updates to the orchestrator.
2. **Epistemic Labeling:** All claims, tasks, and findings must be labeled with an explicit epistemic status (`[VERIFIED]`, `[USER-REPORTED]`, `[SOURCE-BACKED]`, `[PROPOSED]`, `[INFERRED]`, `[UNRESOLVED]`).
3. **Strictly Append-Only Events:** `11-events/events.jsonl` is append-only. Never modify or delete past lines.
4. **Stable IDs:** Never create duplicate IDs. Reuse existing `TSK-xxx`, `DEC-xxx`, `DS-xxx`, `EVT-xxx`.
5. **No Secret Tracking:** Never commit API keys, personal patient data, or confidential access tokens into Git.
