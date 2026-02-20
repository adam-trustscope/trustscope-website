# TrustScope Website A-Grade QA Checklist

Last updated: 2026-02-19
Scope: `trustscope-website` (all public marketing/product pages)

## 1) Information Architecture
- [ ] One canonical page per job-to-be-done. No overlapping pages with duplicate intent.
- [ ] Deprecated routes permanently redirect (301) to canonical routes.
- [ ] Primary nav labels are plain-language and consistent across header/footer.
- [ ] No dead-end nav links. Every top-nav click lands on a usable destination.

## 2) Message Clarity
- [ ] Every page has one primary job and one above-the-fold primary CTA.
- [ ] CTA verbs are explicit (`Open Trace Analyzer`, `Open Simulate`, `Run Compliance Assessment`).
- [ ] No ambiguous CTA copy (`Learn more`, `Run a cost scan`, `Incident analysis`) without context.
- [ ] Headlines are reader-first and outcome-first (not feature dumps).

## 3) Source and Data Integrity
- [ ] External stats must include a visible source link near the claim.
- [ ] Internal product metrics are labeled as demo/internal where applicable.
- [ ] No unverifiable “industry average” claims without a published source.
- [ ] Compliance/control counts align with current mapping pages (AIUC-1/NIST/ISO/etc.).

## 4) Compliance Claim Safety
- [ ] Every compliance-heavy page includes `Evidence, not legal determination` language.
- [ ] No “guaranteed compliance/certification” wording.
- [ ] Framework pages use explicit `ready/partial/gap` semantics.
- [ ] Mapping pages include `last verified` date or verification context.

## 5) Visual System Quality
- [ ] Header is visually symmetric (logo left, nav center, CTA right).
- [ ] No horizontal overflow on desktop/mobile entry views.
- [ ] Card density is compact and scannable; no giant empty blocks.
- [ ] Typography hierarchy is consistent (display/body/mono role separation).

## 6) Scanner and Simulate UX
- [ ] Trace Analyzer starts blank by default; demo runs only by explicit user action.
- [ ] Demo labels are specific and understandable before run.
- [ ] Comparison flow (`/switch`) auto-scrolls to progress/results after compare.
- [ ] Redaction preview clearly distinguishes original vs policy-redacted output.

## 7) Accessibility and Interaction
- [ ] Buttons/links have clear focus and hover states.
- [ ] Contrast is readable for primary body text and CTAs.
- [ ] Mobile nav remains usable and complete.
- [ ] No motion that blocks comprehension or action.

## 8) Regression Gates (must pass before ship)
- [ ] `npm run build` passes.
- [ ] No references to deprecated route names in live nav/footer copy.
- [ ] No stale pricing/old package names/old endpoint names in marketing pages.
- [ ] Spot-check key journeys:
  - [ ] Home -> Trace Analyzer
  - [ ] Home -> Simulate
  - [ ] Home -> Compliance -> framework page
  - [ ] Incidents/Security/Cost -> Trace Analyzer focused demo

## 9) Copy Consistency Terms
Use consistently:
- `Trace Analyzer` (not mixed variants)
- `Simulate` (solution name), with `model migration` context where relevant
- `Know. Control. Prove.` (pillar language)
- Tier names: `Monitor`, `Protect`, `Enforce`, `Govern`

Avoid:
- vague commands (`Run a cost scan` without context)
- legal-overreach language (`certified`, `guaranteed`, `approved`)
- unsourced hard numbers
