---
description: Persistent operating constraints for Company OS automatic knowledge and progress maintenance
always_on: true
---

# Company OS Operating Rules

1. **One-Writer Orchestration:** The orchestrator agent is the sole canonical state writer. Specialist subagents return sourced findings and recommendations to the orchestrator; they never write directly to `os-knowledgebase/` or commit to Git.
2. **Epistemic Classification Standard:** Every statement, task status, decision, or finding must be tagged explicitly:
   - `[VERIFIED]`: Directly inspected, tested, or checksummed.
   - `[USER-REPORTED]`: Reported by user, accepted as current intention/progress, but not yet verified.
   - `[SOURCE-BACKED]`: Supported by explicit external citation or document.
   - `[PROPOSED]`: Suggested but not approved.
   - `[INFERRED]`: Deductive reasoning, not an established fact.
   - `[UNRESOLVED]`: Requires external clarification, review, or access.
3. **No Phantom Approvals:** Never silently convert a proposal, assumption, or user-reported item into an approved decision or verified completion without inspectable evidence.
4. **Cloud Models Only:** Strictly use configured cloud models. Never install, download, or run local language models or heavy local GPUs.
5. **Decoupled Storage:** Keep raw multi-gigabyte datasets out of Git. Reference them via stable IDs (`DS-xxx`), hashes, and paths/URLs in `os-knowledgebase/04-data-and-compliance/datasets.md`.
6. **Honest Integration Reporting:** Never claim Google Drive files were accessed or synced unless an authorized connector or MCP tool executed successfully.
7. **Append-Only History:** `11-events/events.jsonl` is strictly append-only. Corrections must append a new event referencing the prior event ID.
8. **Clean Commits:** Review diffs before committing. Never commit secrets, credentials, `.env` files, or `node_modules`.
