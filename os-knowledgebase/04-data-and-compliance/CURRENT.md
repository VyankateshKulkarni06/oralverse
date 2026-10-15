# Data & Compliance Domain — Current State & Governance

> **Domain:** 04-data-and-compliance  
> **Status:** `[VERIFIED]` active  
> **Last Updated:** 2026-10-15  
> **Custodian:** Data Governance Lead / Compliance Officer  

---

## 1. Compliance Philosophy & Regulatory Boundaries

1. **HIPAA & De-identification**: All dental intraoral photographs utilized for model training or benchmark validation must be strictly de-identified. No protected health information (PHI) such as patient names, medical record numbers, full facial photographs, or identifiable dental tags may be stored in Git or processed by unapproved models.
2. **Separation of Concerns**:
   - **Git Repository**: Stores dataset metadata, license audit records, file checksums, and compliance logs. No multi-gigabyte image payloads in Git.
   - **External Storage (`D:\DATASETS` / Google Drive)**: Houses the raw imagery, tarballs, and DICOM/JPEG archives.
3. **Four-Pillar License Evaluation**: Every dataset is evaluated across four independent operational rights:
   - Commercial Use Allowed?
   - Modification / Derived Works Allowed?
   - Redistribution Allowed?
   - Machine Learning Model Training / Feature Extraction Permitted?

---

## 2. Dataset Master Catalog Summary

See detailed audit records in [`datasets.md`](./datasets.md).

| Dataset ID | Name | Local Path / Drive ID | Images / Scale | License Type | Commercial Use | ML Training | Review Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`DS-001`** | Dental Intraoral Gingivitis (D06) | `D:\DATASETS\D06...` / `gdrive:pending` | ~1,200 photos | CC BY-NC 4.0 | ❌ No | ⚠️ Academic Only | **Restricted** |
| **`DS-002`** | DentalAI Mirror (D09 - Pawan Valluri) | `D:\DATASETS\D09...` / `gdrive:pending` | ~4,500 annotated | Open Access / CC | ⚠️ Pending Audit | ✅ Permitted | **Pending Legal** |
| **`DS-003`** | Mendeley Dental Materials Part 1 | `D:\DATASETS\mendeley...` / `gdrive:pending` | Multimodal scans | CC BY 4.0 | ✅ Yes | ✅ Permitted | **Approved (Eval)** |
| **`DS-004`** | Oral Images Dataset - Karnataka (D04)| `D:\DATASETS\D04...` / `gdrive:pending` | Clinical intraoral | Institutional Research| ❌ Restricted | ⚠️ Local Eval Only | **Restricted** |
| **`DS-005`** | SMART-OM Extracted (D05) | `D:\DATASETS\D05...` / `gdrive:pending` | Oral mucosal scans | Research License | ⚠️ Pending Review | ⚠️ Feature Check | **Pending Legal** |

---

## 3. Data Governance Open Items & Risks

- `[UNRESOLVED]` Google Drive connector unavailable. Datasets currently reside on local volume `D:\DATASETS`. Long-term archival requires upload to authorized enterprise Google Drive once connector/MCP is provisioned.
- `[UNRESOLVED]` Clear distinction required between evaluation-only datasets (benchmarking models) vs training datasets that produce weights for the commercial OralVerse service.
