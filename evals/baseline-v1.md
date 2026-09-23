# Atlas Baseline Evaluation — v1

## Evaluation Setup

- **Date run:** 2026-09-21
- **Role simulated:** AI coworker helping a new product manager understand Atlas
- **Source materials used:** ONLY the files in [`data/atlas/artifacts/`](../data/atlas/artifacts/):
  - `2026-01-10-product-strategy.md`
  - `2026-03-05-march-mbr.md`
  - `2026-04-02-launch-decision.md`
  - `2026-06-20-q2-qbr.md`
  - `2026-07-15-customer-research.md`
  - `2026-08-03-product-decision.md`
  - `2026-08-20-team-meeting-notes.md`
  - `2026-09-01-product-update.md`
- **Explicitly excluded from this run:** `ground-truth.md`, `artifacts-outline.md`, any files under `docs/`, and any other file in the repository outside `data/atlas/artifacts/`.
- **Important limitation:** This baseline was produced **without access to evaluation metadata or ground truth**. Answers, citations, and confidence ratings below reflect only what could be inferred from the artifact set itself, read cold, with no external verification. The answers below are the model's unscored output. A post hoc assessment was added later under Evaluator Notes.

---

## Questions, Answers, Sources, and Confidence

### 1. What is the current Atlas launch date?

**Answer:** October 15, 2026.

**Cited sources:** `2026-08-03-product-decision.md`, `2026-09-01-product-update.md`

**Confidence:** High

**Notes on conflicting/historical information:** The date moved twice over the course of the artifacts — originally June 1, 2026 (`2026-01-10-product-strategy.md`) → September 15, 2026 (`2026-04-02-launch-decision.md`) → October 15, 2026 (`2026-08-03-product-decision.md`), reaffirmed in `2026-09-01-product-update.md`. Informal notes in `2026-08-20-team-meeting-notes.md` flagged a risk of slipping to November if QA ran long, but this was not an approved decision, and the subsequent Sept 1 update reaffirmed October 15.

---

### 2. Why did the launch date change?

**Answer:** Two separate changes, each with a distinct documented cause:
- June 1 → September 15, 2026: a shared inference infrastructure upgrade (Platform team, needed for AI summaries) slipped ~6 weeks, threatening the June 1 date.
- September 15 → October 15, 2026: July customer research found the planned static PDF reporting didn't match how customers wanted to work with their data, prompting a rebuild into interactive dashboards.

**Cited sources:** `2026-03-05-march-mbr.md`, `2026-04-02-launch-decision.md`, `2026-07-15-customer-research.md`, `2026-08-03-product-decision.md`

**Confidence:** High

**Notes on conflicting/historical information:** None beyond the two-stage sequence described above; the two decision memos and the risk-flagging documents that preceded each are consistent with each other.

---

### 3. Does Atlas generate AI summaries at launch?

**Answer:** No. AI summaries were deferred to a post-launch release.

**Cited sources:** `2026-08-03-product-decision.md`

**Confidence:** High

**Notes on conflicting/historical information:** This is a reversal of the original plan. `2026-01-10-product-strategy.md` included AI summaries at launch; `2026-03-05-march-mbr.md` flagged an infrastructure risk to that scope; `2026-06-20-q2-qbr.md` reported summaries back in active development; and `2026-07-15-customer-research.md` surfaced quality/trust concerns that ultimately led to the deferral decision in `2026-08-03-product-decision.md`.

---

### 4. How has the reporting experience changed?

**Answer:** Static, scheduled PDF reports (the original plan) were replaced with interactive dashboards that let customers explore and filter feedback directly.

**Cited sources:** `2026-01-10-product-strategy.md`, `2026-06-20-q2-qbr.md`, `2026-07-15-customer-research.md`, `2026-08-03-product-decision.md`

**Confidence:** High on the decision itself; Medium on execution timing

**Notes on conflicting/historical information:** `2026-06-20-q2-qbr.md` noted reporting features were seeing "lighter usage" in staging, foreshadowing the change. `2026-07-15-customer-research.md` documents the customer signal that drove the switch (customers exporting competitor PDF reports into spreadsheets just to slice data themselves). `2026-08-20-team-meeting-notes.md` (informal) notes the dashboard rebuild may need more polish time than currently scoped, introducing some uncertainty about execution but not about the decision itself.

---

### 5. How long does Atlas retain customer feedback?

**Answer:** 24 months, currently.

**Cited sources:** `2026-04-02-launch-decision.md`

**Confidence:** Medium-High

**Notes on conflicting/historical information:** Original plan was 12 months (`2026-01-10-product-strategy.md`), increased to 24 months per enterprise sales requirements and approved by Security and Legal (`2026-04-02-launch-decision.md`). `2026-08-20-team-meeting-notes.md` (informal) shows Infra flagged that 24-month retention is driving higher storage costs, and the topic was raised as worth revisiting — but any change would require a fresh Legal/Security review, and it was deferred to a future sync with no new decision recorded in the artifact set.

---

### 6. Will CSV export be available at launch?

**Answer:** Officially, yes — export has remained in scope through every formal decision — but recent informal notes raise doubt about whether it will actually ship by October 15.

**Cited sources:** `2026-01-10-product-strategy.md`, `2026-04-02-launch-decision.md`, `2026-07-15-customer-research.md`, `2026-08-03-product-decision.md`, `2026-08-20-team-meeting-notes.md`

**Confidence:** Medium

**Notes on conflicting/historical information:** Export was in the original Jan 2026 scope and explicitly left in scope (not revisited) by both the April and August decision memos. Customer demand for it stayed strong and consistent per `2026-07-15-customer-research.md`. However, `2026-08-20-team-meeting-notes.md` (informal) records engineering saying it "can't promise it still lands by October 15" due to bandwidth consumed by the dashboard rework, with a follow-up action item left open. The most recent status update (`2026-09-01-product-update.md`) does not mention export status at all, leaving this unresolved as of the latest artifact.

---

## Evaluator Notes

**Post hoc assessment.** This assessment was made after the baseline run, with the model's answers visible, by comparing them against `data/atlas/ground-truth.md`. Claude drafted it during an evidence-integrity review directed by the project author. There are no numerical scores. Each answer is judged on factual match with the answer key (at the key's level of detail) and, separately, on epistemic calibration.

**Citations were not verified.** This pass did not check the cited sources against the original Atlas artifacts. Citation accuracy is unassessed.

| Question | Answer-key entry | Factual match | Calibration |
|---|---|---|---|
| 1. Launch date | October 15 | Match | Appropriate. It noted the informal November slip risk without treating it as a decision. |
| 2. Why the launch date changed | Engineering dependency; later, issues found during the customer pilot | Match at the key's level of detail. The key does not say which pilot issues caused the second slip, so the answer's link to the July reporting research is not confirmed by the key. | Appropriate |
| 3. AI summaries at launch | Deferred until after launch; pilot found quality not reliable enough | Match | Appropriate |
| 4. Reporting experience | Static PDF reports replaced by interactive dashboards | Match | Appropriate. It separated confidence in the decision from confidence in execution timing. |
| 5. Data retention | 24 months (increased from 12 by approved decision) | Match | Appropriate. It weighed a newer informal cost concern without letting it override the approved decision. |
| 6. CSV export at launch | None | Cannot be scored for factual correctness | Concern. The answer surfaced uncertainty (Medium confidence, "unresolved as of the latest artifact"). But its "Officially, yes" framing, and the claim that export was "explicitly left in scope (not revisited)," treated the absence of a removal decision as stronger evidence than warranted. |

**Overall:** Five of five questions covered by the answer key matched at the key's level of detail. Question 6 is not in the key. This was one run, with no citation verification. The key's customer-pilot fact (20 customers) was not asked.
