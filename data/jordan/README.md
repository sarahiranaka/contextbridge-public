# Jordan Ruiz — Synthetic Session Dataset

> **Synthetic and fictional.** Northstar Labs, the Atlas product, and every employee, customer, conversation, and operational detail in this dataset (including tenant names, URLs, configurations, and contacts) are fictional. The sessions were created for the ContextBridge product-discovery project with AI assistance, then reviewed and frozen before annotation or model evaluation. They do not contain or reproduce any employer's or customer's confidential information.

## Public-release notes

These notes were added after the experiments, for readers of the public repository. They were not part of the dataset any model saw.

- **Authorship.** The dataset is named for Jordan Ruiz, and seven of the eight sessions are Jordan's. `sessions/05b-cormorant-onelogin.md` records the work of a different fictional teammate, Renee Castillo. The original README below says "Jordan Ruiz is a fictional Solutions Engineer…" and could be read as implying every session is Jordan's; that is not the case.
- **Annotation and evaluation have since happened.** The original README below says no classification or judgment had been applied "yet." That was true when the dataset was frozen. The sessions were later annotated by two reviewers and used in `evals/notice-v3-baseline.md` and `evals/notice-v3-working-practices-baseline.md`. See `docs/decision-pause.md`.
- **Post-evaluation change to a session.** In `sessions/05a-bramwell-azure-ad.md`, the fictional URL domain `northstarlabs.io` was replaced with the reserved example domain `northstarlabs.example` so it cannot point to a real site. No other session content was changed. Both Notice evaluation runs saw the original `.io` domain.

## Original README (as provided to models)

The text below is the README as it stood when the dataset was frozen. It was given to Claude as part of the dataset in both Notice evaluations, and is preserved unchanged.

---

Jordan Ruiz is a fictional Solutions Engineer on the Customer Success/Deployment team at fictional Northstar Labs, working on integrations for the fictional Atlas product.

The sessions in `sessions/` are synthetic AI-assisted work transcripts created for ContextBridge Eval v3, as a pilot for testing the Notice job independently of Govern and Deliver.

This dataset is intentionally frozen prior to human annotation. The sessions were generated without a predetermined answer key for what, if anything, should become shared team context — no scenario was designed around a specific intended Notice outcome, and no classification, labeling, or judgment of the sessions has been applied yet.

No real company, customer, employee, or confidential data is represented anywhere in this dataset. All names, organizations, and events are fictional.
