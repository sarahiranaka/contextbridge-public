# Atlas Dataset

> **Synthetic and fictional.** Northstar Labs, the Atlas product, and every employee, customer, document, decision, date, and metric in this directory are fictional. The dataset was created for the ContextBridge product-discovery project with AI assistance. It does not contain or reproduce any employer's or customer's confidential information.

A small set of synthetic organizational artifacts describing how the fictional Atlas product (a customer-feedback management platform at fictional Northstar Labs) evolved over 2026. It was built to test whether an AI coworker can work out a product's current state and history from raw documents, including superseded plans, newer-but-non-authoritative notes, and one deliberately unresolved question (CSV export at launch).

## Contents

- `artifacts/` — the eight dated source documents (strategy, business reviews, launch and product decisions, customer research, meeting notes, product update). These are the only files given to the model in `evals/baseline-v1.md`.
- `artifacts-outline.md` — design outline of what each artifact contains and where the intentional ambiguity is.
- `ground-truth.md` — evaluation-only answer key. Never provided to the model during evaluation.
- `personal-context/alex/prototype-notes.md` — fictional personal working notes for the persona Alex, written to support the Contribute scenario in `docs/product-experience.md`. Not used in any executed evaluation.

## Status

The only experiment run on this dataset is the single-run raw-artifacts baseline in `evals/baseline-v1.md`. The governed-context comparison planned in `docs/mvp.md` was never executed. See `docs/decision-pause.md`.
