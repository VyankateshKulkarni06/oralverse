# Events Domain — Append-Only Structured Event Store

> **Domain:** 11-events  
> **Status:** `[VERIFIED]` active  
> **Standard:** Append-only JSON Lines (`events.jsonl`)  
> **Custodian:** System One-Writer (Orchestrator)  

---

## 1. Operating Rules for Events

1. **Strictly Append-Only**: Records in `events.jsonl` must **never** be edited, rearranged, or deleted.
2. **Corrections via Superseding Events**: If an event contained incorrect data, append a new event of type `correction_recorded` referencing the prior `event_id` in `replaces_event_id`.
3. **JSON Schema**:
   - `event_id`: Unique monotonic ID (`EVT-YYYYMMDD-xxx`).
   - `timestamp`: ISO 8601 string with explicit timezone (`+05:30`).
   - `event_type`: Categorical identifier (e.g. `system_initialized`, `decision_recorded`, `task_updated`, `dataset_cataloged`, `daily_closeout`).
   - `actor`: Initiator (`user`, `agent:orchestrator`, `agent:specialist`).
   - `source_ref`: Conversation ID or file reference.
   - `affected_record_ids`: Array of affected entity IDs (`TSK-xxx`, `DEC-xxx`, `DS-xxx`).
   - `summary`: Concise human-readable factual description.
   - `epistemic_status`: `verified`, `user-reported`, `source-backed`, `proposed`, `inferred`, `unresolved`.
   - `details`: Structured payload.
