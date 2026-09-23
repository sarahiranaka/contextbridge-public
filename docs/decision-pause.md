# Decision: Pause ContextBridge

## Original hypothesis

ContextBridge started from an observation: personalized AI coworkers can make individuals more capable, but useful learning stays siloed inside individual human-AI working relationships. What one person and their AI figure out rarely reaches the rest of the team.

Over time the hypothesis evolved into a Notice → Govern → Deliver system. It would notice useful learning in individual AI-assisted work, govern what should become shared, and deliver it to the right teammate at the right moment. The aim was to turn individual AI-assisted learning into organizational knowledge.

## What we ran

Each experiment was a single run. None measured precision, recall, or run-to-run variance.

- **Atlas document-reasoning baseline.** A frontier model, given only the raw Atlas artifacts, answered six questions about Atlas's current state and history. See `evals/baseline-v1.md`.
- **Jordan synthetic work-session dataset.** Eight synthetic AI-assisted work sessions from fictional Northstar Labs employees. The sessions were generated with AI assistance, then reviewed and frozen before annotation or model evaluation. Two reviewers annotated them before seeing any Claude output: the project author, and ChatGPT acting as a second independent reviewer. These are preliminary annotations, not ground truth.
- **Generic Claude Notice baseline.** Generic Claude, with no ContextBridge-specific prompting or pipeline, was asked to identify anything in those sessions a teammate might find useful. See `evals/notice-v3-baseline.md`.
- **Working-practices Notice baseline.** A fairness follow-up. After the first baseline missed the Monday-triage working practice, we wrote a second generic prompt asking specifically for ways of working, to check whether the miss came from task framing. See `evals/notice-v3-working-practices-baseline.md`.

## What we did not test

- **Governed-context arm.** No governed context layer was built or compared against raw artifacts (`docs/mvp.md`).
- **Shared Markdown alternative.** A shared `TEAM_CONTEXT.md` file remains a null hypothesis (`docs/product-thesis.md`), not a tested comparison. It is still the simplest credible alternative any future work should beat.
- **Govern and Deliver.** Neither step was built or evaluated.
- **Evaluation v2 dimensions.** Planned in `docs/eval-plan-v2.md`, not executed.

## What we learned

- In one run, a frontier model given only the raw Atlas artifacts matched the answer key on all five questions the key covers. The sixth question (CSV export) has no key entry. The model flagged it as unresolved but led with an "officially, yes" framing the evidence didn't firmly support.
- In one run on the eight synthetic sessions, generic Claude surfaced two of the four candidates in the agreed annotations (Vantage empty-field transform, Bramwell tenant slug), the Solstice uncertainty that only Reviewer 2 flagged, and two items neither reviewer selected. It missed the Vantage tags-model candidate and the Monday-triage working practice.
- The working-practices follow-up recovered the Monday-triage practice, which Claude labeled as needing more evidence. It also proposed six other practices that have not been validated. Neither prompt surfaced the Vantage tags-model candidate.
- Together, these pilots weakened the assumption that a specialized Notice capability is needed just to find candidate learnings.
- Open problems remain around selectivity, validation, governance, relevance, and delivery. Govern and Deliver were not tested, so these experiments neither support nor rule out a distinct product for them.

## Decision

Further ContextBridge prototype development is paused.

We do not want to keep narrowing the problem or tuning prompts until the experiments appear to validate the product. That would be optimizing for confirmation, not learning. The current evidence does not justify more implementation investment.

This is not a finding that ContextBridge cannot work. It is a finding that we do not yet have evidence it is needed. The experiments covered raw-document reasoning and candidate identification in Notice; they did not test the full Notice → Govern → Deliver hypothesis.

## What would make us revisit it

- Repeated real-world evidence that teams build up valuable AI-assisted learning that existing collaboration and context tools fail to capture.
- Evidence that review and selectivity are a severe enough problem to justify a dedicated workflow, beyond what a model or a lightweight human review can handle.
- Evidence that relevance-triggered delivery produces meaningfully better outcomes than shared context files or ordinary retrieval.
- Evidence that governance requirements cannot be adequately met by existing enterprise AI and platform capabilities.

## What carries forward

The project still produced useful lessons about AI-native product development:

- **Establish strong baselines.** Measure what a frontier model does unaided before building around its assumed limits.
- **Test simple alternatives.** Compare against the cheapest credible option, such as a shared Markdown file, before investing in a system. We named this alternative but paused before testing against it.
- **Separate model capability from product value.** A capability the model already has is not a product on its own.
- **Use synthetic evals to test assumptions.** Small, frozen, synthetic datasets made it possible to test the Notice capability null hypothesis quickly and without real customer data.
- **Treat evidence against the hypothesis as a reason to change direction.** Don't read it as a prompt to redesign the experiment.
