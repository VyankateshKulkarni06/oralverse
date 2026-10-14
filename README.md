# OralVerse by Asymptote.ai
> **“See oral health more clearly.”**  
> AI-assisted visual intelligence for more informed dental reviews.

OralVerse is a clinical technology frontend platform that transforms intraoral photographs into organized visual insights. Designed for dental professionals, clinical advisors, and diagnostic review workflows, OralVerse assists clinicians in inspecting anatomical landmarks, reviewing visual findings, and evaluating photographic quality.

---

## Key Highlights

- **Lightweight Clinical Design System**: Light theme with clinical teal accents (`#0e7490`), high-legibility typography (Inter & Plus Jakarta Sans), and subtle 1px borders.
- **Interactive Oral Health Overview**: Intraoral image viewer with interactive SVG tooth segmentation, FDI / Universal tooth numbering labels, and linked findings inspection panel.
- **Case Review Studio**: Clinical image viewer equipped with zoom controls (50%–250%), brightness and contrast adjustment sliders, filmstrip carousel navigation, and clinician notes editor.
- **New Analysis Stepper**: 4-step workflow (Add Images, Check Quality, Tag Angles, Simulate Analysis) with interactive clinical scanning animation.
- **Intraoral Image Library & Comparison**: Gallery with anatomical angle filters, lightbox viewer, and side-by-side comparative inspection modal (Dual Pane & Split Wipe modes).
- **Quality & Turnaround Analytics**: Recharts visualizations for case volume, triage velocity, optical pass rates, and retake root-cause analysis.
- **Vercel Ready**: Preconfigured with `vercel.json` for single-page application (SPA) client-side routing.
- **Clinical Responsibility Framing**: Persistent medical disclaimer and simulated sandbox notices clearly separating demonstration mock models from actual diagnostic claims.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Data Visualizations**: Recharts
- **Icons**: Lucide React
- **Styling**: Vanilla CSS Design System with CSS Custom Properties
- **Deployment**: Vercel (`vercel.json` included)

---

## Getting Started Locally

```bash
# Clone repository
git clone https://github.com/VyankateshKulkarni06/oralverse.git

# Navigate to project
cd oralverse

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## Production Build & Vercel Deployment

```bash
# Verify build
npm run build
```

### Deploying to Vercel
1. Import the repository into your [Vercel Dashboard](https://vercel.com/new).
2. Framework preset will automatically detect **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Click **Deploy**.

---

## License & Attribution

Developed for **Asymptote.ai**.  
*Disclaimer: OralVerse provides AI-assisted visual review concepts. It does not replace professional examination, clinical judgment, or appropriate diagnostic procedures.*
