# Clinical Domain — Evidence, Validation & Clinical Boundaries

> **Domain:** 05-clinical  
> **Status:** `[VERIFIED]` active  
> **Last Updated:** 2026-10-15  
> **Custodian:** Clinical Advisor / Chief Medical Officer  

---

## 1. Clinical Scope & Diagnostic Boundaries

OralVerse operates exclusively within the boundary of **visual clinical intelligence and workflow acceleration**. 

- **Intended Use:** Assisting qualified clinicians during visual intraoral photo reviews by:
  - Automating anatomical quadrant and FDI/Universal tooth numbering tagging.
  - Pre-screening optical quality (glare, motion blur, out-of-focus fields).
  - Highlighting visual regions of interest (gingival inflammation, visible plaque accumulation, restoration margins).
- **Explicit Contra-indications / Non-Intended Uses:**
  - Autonomous diagnostic declarations without clinician sign-off.
  - Caries diagnosis solely from photographic reflection (X-ray/radiographic correlation required).
  - Direct-to-consumer unsupervised treatment planning.

---

## 2. Clinical Evidence Quality Matrix

| Evidence ID | Focus Area | Source / Methodology | Sample Size | Quality Grade | Outcome / Finding | Review Status | Epistemic Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`EVD-001`** | Gingivitis Severity Scoring | Intraoral photo analysis vs modified Gingival Index (mGI) | 1,200 photos | Moderate (Academic dataset) | Correlation $r = 0.81$ on moderate-to-severe gingivitis; lower sensitivity on mild marginal erythema. | Under Peer Review | `[SOURCE-BACKED]` |
| **`EVD-002`** | Tooth Segmentation Accuracy | Interactive SVG polygon overlay vs Expert manual annotations | 450 intraoral cases | High | Mean Intersection-over-Union (IoU) of 89.4% across central and lateral incisors. | Clinically Approved | `[VERIFIED]` |
| **`EVD-003`** | Optical Triage Rejection Rate | Rejection rate of poorly illuminated smartphone intraoral photos | 320 retrospective photos | Low (Pilot cohort) | Rejection rate reduced from 18% to 4% when real-time angle guides are shown. | Pilot Study | `[USER-REPORTED]` |

---

## 3. Active Clinical Inquiries & Hypotheses

1. `[UNRESOLVED]` **Gingival Inflammation Sensitivity:** How does varying mobile camera color calibration (flash vs ambient LED) affect erythema detection thresholds?
2. `[PROPOSED]` **Clinical Advisory Board Protocol:** Establish a formal monthly second-opinion panel where 3 board-certified periodontists evaluate model predictions on borderline edge cases.
3. `[INFERRED]` **Clinician Time Savings:** Preliminary UX feedback suggests a 40% reduction in time-to-chart when teeth are automatically numbered in the review studio.
