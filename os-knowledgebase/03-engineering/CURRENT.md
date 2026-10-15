# Engineering Domain — Architecture, Repositories & State

> **Domain:** 03-engineering  
> **Status:** `[VERIFIED]` active  
> **Last Updated:** 2026-10-15  
> **Custodian:** Lead Engineer  

---

## 1. Technical Stack & Repository Topology

- **Primary Repository:** `VyankateshKulkarni06/oralverse`
- **Default Branch:** `main`
- **Frontend Stack:**
  - React 19 + TypeScript
  - Build Tool: Vite
  - Visualizations: Recharts
  - Iconography: Lucide React
  - Styling: Vanilla CSS Design System with CSS Custom Properties (CSS variables)
  - Deployment Configuration: Vercel SPA (`vercel.json`)
- **Knowledge Base Subsystem:**
  - Directory: `os-knowledgebase/`
  - Version Control: Integrated with the primary Git repository
  - Coordination: Antigravity IDE custom skills (`.agents/skills/company-os`) and persistent rules (`AGENTS.md`)

---

## 2. Directory Layout & State

```
d:\oralverse\
├── .agents/                 # Antigravity IDE customizations (rules, skills)
├── .git/                    # Git repository metadata
├── .gitignore               # Root ignore rules (node_modules, builds, secrets)
├── AGENTS.md                # Persistent operating rules for Antigravity
├── CURRENT_COMPANY_STATE.md # Top-level company state pointer
├── frontend/                # Frontend application container (package.json, Vite config)
├── os-knowledgebase/        # Canonical Company Memory (Domains 00 to 12)
└── src/                     # React/TypeScript application source files
```

---

## 3. Implementation Status (`[VERIFIED]`)

- **Landing Page Component:** Complete in `src/pages/LandingPage.tsx` with full interactive sections and hero.
- **Tooth Segmentation Engine:** SVG coordinate mapping implemented for maxillary and mandibular dental arches.
- **Case Review Studio:** Sliders for optical contrast/brightness and filmstrip navigation functional.
- **Vercel Rewrite Rules:** Client-side routing rewrite rule configured in `vercel.json`.

---

## 4. Technical Debt & Open Engineering Issues

| ID | Issue Description | Impact | Severity | Epistemic Status |
| :--- | :--- | :--- | :--- | :--- |
| **DEBT-01** | Frontend root directory alignment: `src/` sits at repository root while `package.json` is in `frontend/`. | Running `npm run dev` from root requires `frontend` context. | Medium | `[VERIFIED]` |
| **DEBT-02** | Absence of headless test suite (Vitest / Playwright). | Regressions in tooth segmentation SVG coordinates must be caught manually. | Medium | `[INFERRED]` |
| **DEBT-03** | Google Drive programmatic synchronization absent. | Dataset references must be maintained via static IDs until MCP connector is added. | Low | `[VERIFIED]` |
