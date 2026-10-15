# DEC-002: External Dataset Referencing & Google Drive Decoupling

- **Decision ID:** `DEC-002`
- **Title:** External Dataset Referencing & Google Drive Decoupling
- **Status:** `approved`
- **Decision Owner:** Data Governance Lead / Founder
- **Date:** 2026-10-15
- **Epistemic Status:** `[VERIFIED]`

---

## 1. Context

Dental image datasets (e.g., Gingivitis intraoral photos, SMART-OM, Karnataka cohort) range from hundreds of megabytes to tens of gigabytes. Storing binary assets directly in Git bloats repository clone times, triggers storage limits, and violates clean version control practices. Furthermore, Google Drive access is not currently provisioned via an authorized MCP connector or local filesystem mount in this environment.

## 2. Alternatives Considered

1. **Commit Raw Images into Git LFS**:
   - *Pros:* Tracks images in the same repository.
   - *Cons:* Exorbitant Git storage costs, slow clones, risk of leaking non-commercial or PHI data to public remotes.
2. **Halt System Setup until Google Drive is Configured**:
   - *Pros:* Complete end-to-end cloud sync immediately.
   - *Cons:* Paralyzes company progress over an external infrastructure credential. Violates mandate to establish repository-based system first.
3. **Decoupled Reference Architecture with Stable Dataset IDs (Selected)**:
   - *Pros:* Git tracks lightweight metadata, hashes, licenses, and Drive/Local IDs (`DS-xxx`). Raw data resides safely on local volumes (`D:\DATASETS`) and Google Drive without polluting Git.

## 3. Rationale

This approach strictly adheres to Phase 2: "If Drive access is unavailable, implement the repository-based system first and clearly document the missing integration. Reference Drive files through stable file IDs and record relevant source links and metadata."

## 4. Supporting Evidence

- Local inspection confirmed 5 dental datasets on disk at `D:\DATASETS`.
- Environment inspection confirmed zero active Google Drive connectors or CLI tools.

## 5. Consequences

- **Positive:** Git repository remains lean (<5MB) and fast to clone/branch.
- **Negative / Constraints:** Datasets cannot be auto-fetched from Google Drive until an authorized MCP server or OAuth connector is configured by the user.

## 6. Superseding Decision

- *None (Active baseline).*
