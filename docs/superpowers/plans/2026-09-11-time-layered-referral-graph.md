# Time-Layered Referral Graph Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract a reusable, public-safe template for displaying multi-level relationships on a vertical time axis.

**Architecture:** Create a standalone static demo with synthetic data and documentation-first README. Keep the backend boundary as a JSON contract so the template does not depend on any production database, server, or business project.

**Tech Stack:** HTML, CSS, vanilla JavaScript, SVG, Node.js built-in test runner.

**Spec:** `README.md`

## Global Constraints

- The repository must not contain production data, real user identifiers, credentials, server addresses, or project-specific database details.
- The README is the primary artifact and must explain the design thinking in plain language.
- The demo must run as static files through a local HTTP server.
- The data contract must stay generic: `generatedAt`, `nodes`, `id`, `parent`, `submittedAt`, `label`.

---

### Task 1: Documentation-first archive

**Files:**
- Create: `README.md`
- Create: `docs/data-contract.md`

**Interfaces:**
- Consumes: existing front-end behavior from the source project.
- Produces: reusable design explanation and generic backend contract.

- [ ] Write the README with design motivation, layout rules, interaction rules, visual encoding, backend contract, and safety boundaries.
- [ ] Write `docs/data-contract.md` with the minimal JSON format and responsibilities split between backend and frontend.
- [ ] Verify the docs do not mention source project names, database tables, credentials, or real identifiers.

### Task 2: Static demo

**Files:**
- Create: `demo/index.html`
- Create: `demo/assets/app.js`
- Create: `demo/assets/styles.css`
- Create: `demo/data/sample.json`

**Interfaces:**
- Consumes: the generic JSON contract from Task 1.
- Produces: a runnable example of vertical time axis, horizontal relationship layers, zoom, pan, focus, aggregation, and tooltips.

- [ ] Build a static HTML shell.
- [ ] Add synthetic sample data.
- [ ] Implement layout and interactions in vanilla JavaScript/SVG.
- [ ] Implement visual styling in CSS.

### Task 3: Verification and GitHub archive

**Files:**
- Create: `package.json`
- Create: `test/static-safety.test.mjs`

**Interfaces:**
- Consumes: all files from Tasks 1 and 2.
- Produces: a verified public-safe repository.

- [ ] Add tests for sample data shape and forbidden sensitive terms.
- [ ] Run the tests and JavaScript syntax checks.
- [ ] Create the personal GitHub repository if it does not exist.
- [ ] Commit and push the archive.
