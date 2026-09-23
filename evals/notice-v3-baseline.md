# Notice v3 Baseline: Generic Claude on Frozen Jordan Sessions

## 1. Purpose

- Test whether ordinary Claude, given a simple generic prompt and no ContextBridge-specific instructions, can pick out potentially reusable information from the frozen Jordan work sessions.
- This is the capability null hypothesis for Notice.

## 2. Dataset

The eight frozen sessions in `data/jordan/sessions/`:

- `01-vantage-zendesk.md`
- `02-whitfield-salesforce.md`
- `03-solstice-custom-integration.md`
- `04-monday-triage.md`
- `05a-bramwell-azure-ad.md`
- `05b-cormorant-onelogin.md`
- `05c-delacroix-pingfederate.md`
- `05d-fernbridge-okta.md`

The sessions are synthetic. They were generated with AI assistance, then reviewed and frozen before annotation or model evaluation.

## 3. Reviewer annotations

Two reviewers annotated the sessions independently: Reviewer 1 was the project author, and Reviewer 2 was ChatGPT acting as a second independent reviewer. Both annotations were completed before seeing the generic Claude baseline output. These are preliminary annotations, not ground truth.

| Session | Judgment | Notes |
|---|---|---|
| Vantage | Yes | Candidate 1: prefer the existing tags model for the customer-specific categorization rather than immediately creating a schema exception. Candidate 2: using `set_field` with an empty array in the empty-field branch overwrites existing tags; leaving the field untouched avoids that behavior. |
| Whitfield | No | |
| Solstice | Split | Reviewer 1 = No. Reviewer 2 = Needs validation regarding whether the generic webhook connector remains appropriate for new integrations. |
| Monday triage | Yes | Potential reusable working practice around what investigation context should be preserved in an internal ticket so another person can reconstruct the state of the work. Personal dentist content should not become team context. |
| Bramwell | Yes | The generic ACS callback URL in the runbook needs the actual customer tenant slug substituted. |
| Cormorant | No | |
| Delacroix | No | |
| Fernbridge | No | |

The two reviewers agreed on the session-level share/no-share judgment for 7 of 8 sessions. Solstice was the disagreement.

## 4. Generic baseline prompt

Exact prompt used:

```text
You are reviewing a set of synthetic AI-assisted work sessions from a fictional employee at fictional Northstar Labs.
Read only these files:

* `data/jordan/README.md`
* everything in `data/jordan/sessions/`

Do not read any other repository files. In particular, do not read ContextBridge product documents, evaluation plans, previous evals, or other personas/context.
Your task:
Review these work sessions and identify anything from them that might be useful for a teammate to know or reuse in their own work.
Be selective. Ordinary task history, customer-specific details, personal information, unresolved speculation, and things that would not help another teammate should generally not be included.
If something seems potentially useful but you are not confident it is established well enough to present as fact, say so.
For each item you identify, provide:

* the useful information or practice, stated concisely
* which session(s) it came from
* why it might help a teammate
* whether you are confident it is established by the session or think it needs verification

It is completely acceptable to identify nothing from a session.
Do not modify or create any files.
Do not read any repository files beyond the Jordan README and session files listed above.
```

## 5. Generic Claude result

First Claude response, verbatim:

```text
I reviewed the README and all eight session files only (no other repository files read). Findings below — most sessions yielded nothing worth surfacing; a few contain something concrete or worth flagging as uncertain.
Items identified
1. A specific config behavior in Atlas ingestion transforms: "empty" branches that use `set_field` are not no-ops

* Session: `01-vantage-zendesk.md`
* What: In a field-mapping transform, a conditional branch meant to handle a blank source field was written as `if_empty: {action: set_field, target: tags, value: []}`. That doesn't skip the step — it explicitly overwrites the `tags` field, wiping out tags that should have carried over from the original record. The fix was changing that branch to a true no-op.
* Why it might help a teammate: This is a non-obvious failure mode — the intent ("do nothing when blank") doesn't match what the config actually does. Anyone else writing a similar prefix-tag mapping with blank-value handling could hit the identical bug and lose unrelated data silently.
* Confidence: Established within the session — reproduced, root cause located by inspecting the actual config, fixed, and verified by rerunning the test payloads successfully.

2. Atlas's SSO runbook is Okta-oriented, and its template callback URL needs the customer's tenant slug substituted for other providers

* Session: `05a-bramwell-azure-ad.md`
* What: Login failed for an Azure AD customer because the generic template ACS/Reply URL from the runbook was sent to the customer as-is, without swapping in their actual tenant-specific slug.
* Why it might help a teammate: Anyone adapting the same runbook for a non-Okta identity provider could make the identical substitution mistake, since the runbook doesn't flag this step explicitly for non-Okta cases.
* Confidence: Reasonably established — the cause was identified and correcting it restored login for one test user. Full confirmation (a second user testing) was still pending when the session ended, so treat "fully resolved" as not yet fully verified.

3. Diagnostic approach: partial-population SSO/attribute-mapping failures may indicate a separate per-group IdP app config, not one shared misconfiguration

* Session: `05b-cormorant-onelogin.md`
* What: Only a subset of users (contractors) were failing to get correct team mapping. Rather than assuming a single shared attribute-mapping bug explained it, Renee checked what was different about the failing group and found they used an entirely separate OneLogin app definition.
* Why it might help a teammate: Reframes how to approach "some but not all users are broken" SSO issues — worth checking for a distinct IdP-side app/config for the affected subgroup before assuming one fix covers everyone.
* Confidence: Needs verification — this is a reasoning approach the session lands on, not a confirmed fix. The session ends before the contractor-side config is actually inspected or corrected, and even the AI's earlier claim about the exact expected attribute name was never independently confirmed.

4. Possible documentation gap: meaning of `filtered_records` in Atlas ingestion logs

* Session: `02-whitfield-salesforce.md`
* What: Neither Jordan nor the AI could determine what "filtered" means for this connector version (an intentional exclusion vs. something being dropped incorrectly).
* Why it might help a teammate: If this is a genuine documentation gap rather than something specific to this pair not looking in the right place, other people debugging similar logs elsewhere could hit the same dead end.
* Confidence: Low / needs verification. This reflects what two participants didn't know in one session — it isn't confirmed that the information doesn't exist or isn't documented elsewhere.

5. Possible uncertainty about current support status of the "generic webhook connector"

* Session: `03-solstice-custom-integration.md`
* What: Whether Atlas's generic webhook connector (for customers without a native integration) is still an actively recommended path, or is being phased out, could not be confirmed — the only evidence was a brief, unelaborated Slack comment.
* Why it might help a teammate: If solutions engineers might otherwise propose this connector to future customers with nonstandard systems, its actual current status seems worth someone confirming directly rather than relying on an old, ambiguous comment.
* Confidence: Explicitly unverified in the session itself — Jordan's direct follow-up question to engineering was unanswered by the end of the session.

Sessions with nothing identified

* `04-monday-triage.md` — routine multitasking and status checks; the one personal item (a dentist-appointment message) isn't relevant to anyone else's work.
* `05c-delacroix-pingfederate.md` — investigation ends without a confirmed cause; nothing resolved enough to report.
* `05d-fernbridge-okta.md` — root cause turned out to be an external, unrelated provider outage; didn't surface anything specific to Atlas's systems or practices worth carrying forward.
```

## 6. Initial observations

These are observations, not conclusions.

- Generic Claude found the two technical candidates that both reviewers also found: Vantage's empty-field transform behavior and Bramwell's tenant-specific callback URL.
- It did not surface Vantage Candidate 1: preferring the existing tags model over creating a schema exception.
- Generic Claude proposed five candidate items overall.
- It also proposed possible items from Whitfield and Cormorant that neither reviewer selected.
- For Solstice, it raised the same uncertainty that Reviewer 2 (ChatGPT) marked as needing validation. Reviewer 1 selected nothing.
- It did not find the Monday-triage ticket-documentation working practice that the reviewers selected.
- It correctly left out the personal dentist content.
- This small pilot does not establish precision or recall, and it does not show that a specialized Notice capability is necessary.

## 7. Questions raised

- Is the hard part of Notice extracting candidates, or selecting among many plausible ones?
- Can a generic prompt aimed explicitly at working practices recover the Monday-triage candidate?
- Can Notice keep precision high without creating a burdensome review queue?
- How should potentially useful but unverified knowledge be treated differently from proposed shared knowledge?
- Does a specialized Notice approach do materially better than ordinary Claude prompting?
