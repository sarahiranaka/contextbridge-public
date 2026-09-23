# ContextBridge

> **Status: paused.** ContextBridge was a time-boxed AI product-discovery project. The early experiments weakened key assumptions behind the proposed product wedge, and I stopped further prototype development. It is not a validated product, and the full Notice → Govern → Deliver hypothesis was never tested. The reasoning is in [`docs/decision-pause.md`](docs/decision-pause.md).

ContextBridge explored one question:

**How can useful learning from one human–AI working relationship become useful to the rest of a team without sharing private AI history or flooding everyone with more context?**

This repository is the case study: the hypothesis, the experiments I ran against it, what they showed, and why I paused.

---

## Why this seemed worth exploring

The motivating hypothesis was:

- **Personalized AI coworkers can make individuals more capable.** Over time, each person and their AI build up a shared understanding of how the product works, which workflows help, and which assumptions hold.
- **That learning doesn't automatically become organizational learning.** It improves one person's AI relationship but has no natural route to anyone else.
- **So a team could become a collection of capable human–AI silos.** Each pair gets better in isolation.

This was an intuition I wanted to test, not an established fact about teams or the market.

## The product hypothesis

ContextBridge proposed three jobs:

1. **Notice:** spot learning that might be reusable, as it emerges from ordinary human–AI work.
2. **Govern:** let people decide what becomes shared team context. Private conversations and preferences stay private. Uncertain claims can be validated, and shared knowledge keeps its provenance and status.
3. **Deliver:** give approved context to other AI coworkers when it's relevant, rather than broadcasting everything to everyone.

**Null hypothesis:** a well-maintained shared Markdown file (e.g. `TEAM_CONTEXT.md`) that every AI coworker reads may be sufficient. ContextBridge would only be justified if it clearly beat that. I named this alternative early but paused before testing against it.

## What I actually tested

Each experiment was a **single run on synthetic data**. None measured precision, recall, or run-to-run variance. Reviewer annotations are preliminary, not ground truth.

| Experiment | Question | Setup | Result | What changed in my belief |
|---|---|---|---|---|
| **Atlas raw-document baseline** ([record](evals/baseline-v1.md)) | How well does a frontier model work out a product's current state and history from raw artifacts alone? Is there a gap for a governed layer to fill? | A frontier model got only 8 synthetic Atlas artifacts. They included superseded plans, newer-but-informal notes, and one deliberately unresolved question. It answered 6 questions. | It matched the answer key on all 5 questions the key covers (scored post hoc, citations not verified). On the 6th (CSV export, no key entry), it flagged the question as unresolved but led with "Officially, yes," which is more than the evidence supported. | Raw-document reasoning was stronger than my original thesis assumed. Better document reasoning alone looked unlikely to be a sufficient wedge; the stronger open question was how individual AI learning might become organizational learning. |
| **Generic Claude Notice baseline** ([record](evals/notice-v3-baseline.md)) | Is specialized Notice intelligence needed just to find reusable learning in work sessions? | 8 frozen synthetic work sessions. Two reviewers, the project author and ChatGPT, annotated them before seeing any output. Generic Claude got a simple prompt with no ContextBridge-specific instructions. | It found 2 of the 4 candidates in the agreed annotations. It also raised the Solstice uncertainty that only one reviewer flagged, plus 2 items neither reviewer chose. It missed the Vantage tags-model candidate and the Monday-triage working practice, and correctly left out personal content. | Finding candidates looked less like a hard problem than I assumed. The open questions moved toward selectivity and validation. |
| **Working-practices follow-up** ([record](evals/notice-v3-working-practices-baseline.md)) | Was the Monday-triage miss a capability gap or a task-framing effect? | Same frozen dataset and a second generic prompt asking about ways of working. I wrote it after seeing the miss, so it is a fairness check, not a blind test. | It recovered the Monday-triage practice and labeled it as needing more evidence. It proposed 6 other practices, none validated. Neither prompt surfaced the Vantage tags-model candidate. | The miss looked sensitive to framing. Ordinary Claude can generate many plausible practices, so the harder problem looked like choosing which ones are worth keeping. |

## Why I paused

Together, the experiments **weakened** the assumption that a specialized Notice capability is needed just to find candidate learnings. That assumption was an important part of the proposed wedge. They didn't disprove ContextBridge, but I no longer had evidence that it was needed.

I could have kept narrowing the problem or tuning prompts until an experiment appeared to validate the product. That would have been optimizing for confirmation rather than learning, so I stopped investing in implementation instead.

**What remained untested:**

- **A governed-context arm.** No governed context layer was built or compared against raw artifacts. The comparison planned in [`docs/mvp.md`](docs/mvp.md) was never run.
- **The shared Markdown alternative.** This is still a null hypothesis, not a tested comparison.
- **Govern and Deliver.** Neither was built or evaluated.
- **The v2 evaluation dimensions** in [`docs/eval-plan-v2.md`](docs/eval-plan-v2.md): ambiguous current state, authority vs. recency, terminology drift, and individually learned context.

Selectivity, validation, governance, relevance, and delivery are still open problems. These experiments neither support nor rule out a distinct product for them. The [decision record](docs/decision-pause.md) lists what evidence would make me revisit.

## What I built

- **Synthetic evaluation datasets**
  - [`data/atlas/`](data/atlas/): 8 dated artifacts tracing a fictional product's evolution, plus an evaluation-only answer key.
  - [`data/jordan/`](data/jordan/): 8 synthetic AI-assisted work sessions, frozen before annotation.
- **Evaluation records.** [`evals/`](evals/) holds the three runs above. The two Notice records preserve their exact prompts, verbatim Claude outputs, and reviewer annotations. The Atlas baseline record contains its questions and the model's output, plus a post hoc assessment against the answer key; it does not preserve the exact original prompt.
- **A click-through concept prototype.** [`prototype/`](prototype/) is a Next.js demo that walks through Inherit → Contribute → Compound using two fictional personas.

> **The prototype is a concept demo, not a working product.** The AI suggestions, approvals, and inherited context are all simulated over static fixtures. It does not call an AI model or any external API. It illustrates the hypothesis and should not be read as evidence that the hypothesis works.

## Suggested reading order

- **The 2-minute story:** this README, then [`docs/decision-pause.md`](docs/decision-pause.md).
- **The evidence:** [`evals/baseline-v1.md`](evals/baseline-v1.md) → [`evals/notice-v3-baseline.md`](evals/notice-v3-baseline.md) → [`evals/notice-v3-working-practices-baseline.md`](evals/notice-v3-working-practices-baseline.md).
- **The product thinking:** [`docs/product-thesis.md`](docs/product-thesis.md) (the latest thesis and the null hypothesis), [`docs/mvp.md`](docs/mvp.md) (the earlier document-reasoning MVP) and [`docs/eval-plan-v2.md`](docs/eval-plan-v2.md) (planned, not executed). These are historical documents, kept as written.
- **The prototype:** [`docs/product-experience.md`](docs/product-experience.md) for the demo story, then [`prototype/README.md`](prototype/README.md) to run it locally.

## What I learned

- **Benchmark the unaided model before building around its assumed limits.** The Atlas baseline was meant to be the "before" in a before/after comparison. Instead, it matched every question the key covered. Running it before building a governed context layer let the thesis shift at the cost of one experiment.
- **Separate model capability from product value.** Generic Claude found 2 of the 4 agreed candidates with a generic prompt, and the follow-up prompt recovered the previously missed Monday-triage working practice. A capability the model already has is not a product on its own. Any product value would have to come from somewhere else, such as selectivity, governance, or delivery.
- **Name the simple alternative early and hold yourself to it.** Writing down the shared-Markdown null hypothesis made the bar explicit. I paused before testing against it, which is a gap in this work and should be the first comparison if it's ever revisited.
- **Treat calibration and selectivity as first-class evaluation targets.** Two of the most useful signals weren't about right or wrong answers: the confident framing on an unresolved question (CSV export), and many plausible practices with no clear way yet to tell which ones matter. Accuracy-only scoring would have missed both.
- **Keep follow-up experiments honest about their status.** The working-practices prompt was written after seeing a miss, so I recorded it as a fairness check rather than a blind test.
- **Stopping can be the right product decision.** When early evidence weakens the proposed wedge, pause further investment rather than redesigning the experiment until it agrees.

## Synthetic data and provenance

- **Everything is fictional:** Northstar Labs, Atlas, and every employee, customer, scenario, and conversation in this repository.
- **All evaluation data is synthetic and was created with AI assistance** for this project. The Jordan sessions were reviewed and frozen before annotation or model evaluation.
- **No employer or customer confidential information** is included or reproduced.
- **Reviewer provenance is documented in the eval files.** For the Jordan dataset, Reviewer 1 was the project author and Reviewer 2 was ChatGPT acting as a second independent reviewer. Both annotated before seeing any Claude output. The Atlas post hoc assessment was drafted by Claude during an evidence-integrity review directed by the project author.

Dataset-level details, including one post-evaluation change to a fictional URL, are in [`data/atlas/README.md`](data/atlas/README.md) and [`data/jordan/README.md`](data/jordan/README.md).
