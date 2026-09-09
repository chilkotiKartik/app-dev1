# AppDev1 Exam Atlas

A study platform for **IITM BS Modern Application Development I (AppDev1)**, built entirely from real exam material: four official end-term question papers and one practice paper.

## What this is

Every question, code snippet, option, and marked answer in this app is transcribed from the source PDFs. Nothing is invented — topics, explanations, exam approach and takeaways are authored on top of that verified content, and are clearly the app's own analysis rather than part of the original paper.

- **157 questions** transcribed across 5 papers (490.5 marks)
- **11 topics** with beginner-friendly explanations, key terms, common mistakes, and exam-focused guidance
- **12 verified repeat groups** — questions that appear verbatim or as a close variant across multiple papers
- Full-text search, filtering by paper/topic/type/repetition
- Dark mode (persisted), responsive layout, keyboard-accessible

## Architecture

- **Framework**: React 18 + TypeScript, built with Vite, routed with `react-router-dom` (client-side, code-split by route).
- **Content layer** (`src/content/`): a typed data model (`types.ts`) with one file per source paper (`papers/ep6.ts`, `ep7.ts`, `ep8.ts`, `ep9.ts`, `pr1.ts`) plus `topics.ts` for the learning content and `papers.ts` for paper metadata. `index.ts` aggregates everything and exposes lookup helpers, computed topic statistics, and a build-time content audit (`auditContent()`).
- **UI layer** (`src/components/`, `src/pages/`): presentational components and route pages. No content is hardcoded into components — everything reads from the content layer.
- **Styling**: a single hand-written stylesheet (`src/styles/global.css`) using CSS custom properties for a light/dark theme system — no CSS framework dependency.

## Adding a new paper

1. Create `src/content/papers/<id>.ts` following the pattern in an existing paper file — use the `dsl.ts` helpers (`t`, `c`, `py`, `sh`, `tbl`, `li`, `ok`, `no`, `fig`) to keep entries readable.
2. Register the paper's metadata in `src/content/papers.ts`.
3. Import and spread the new paper's `Questions`/`Comprehensions` arrays into `src/content/index.ts`.
4. Map every question to an existing (or new) `topicId`/`subtopicId` in `src/content/topics.ts`.
5. Run the audit: `npx tsx -e "import {auditContent} from './src/content/index.ts'; console.log(auditContent())"` — it fails loudly if a question references an unknown paper/topic/subtopic, has no correct option, etc.

## Scripts

```
npm run dev       # start the dev server
npm run build     # typecheck + production build
npm run preview   # preview the production build
```
