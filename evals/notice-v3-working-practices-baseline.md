# Notice v3 Working-Practices Baseline: Generic Claude on Frozen Jordan Sessions

## 1. Purpose

- This follow-up experiment was run after `evals/notice-v3-baseline.md` and before the decision to pause ContextBridge.
- In the first baseline, generic Claude did not identify the Monday-triage working practice that the reviewers selected (what investigation context to preserve in an internal ticket so another person can reconstruct the state of the work). Reviewer 1 was the project author and Reviewer 2 was ChatGPT acting as a second independent reviewer; see `evals/notice-v3-baseline.md`.
- This prompt was written after seeing that Monday-triage miss. It is a fairness follow-up on the generic baseline, not a blind test.
- Alternative hypothesis tested here: the miss may have come from task framing rather than a capability gap. Perhaps ordinary Claude can identify working practices when it is explicitly prompted to look for them.

## 2. Dataset

The same frozen Jordan dataset used in `evals/notice-v3-baseline.md`: `data/jordan/README.md` and the eight sessions in `data/jordan/sessions/`:

- `01-vantage-zendesk.md`
- `02-whitfield-salesforce.md`
- `03-solstice-custom-integration.md`
- `04-monday-triage.md`
- `05a-bramwell-azure-ad.md`
- `05b-cormorant-onelogin.md`
- `05c-delacroix-pingfederate.md`
- `05d-fernbridge-okta.md`

The dataset was unchanged from the first baseline. The sessions are synthetic. They were generated with AI assistance, then reviewed and frozen before annotation or model evaluation.

## 3. Working-practices prompt

Exact prompt used:

```text
You are reviewing a set of synthetic AI-assisted work sessions from fictional employees at fictional Northstar Labs.
Read only:

* `data/jordan/README.md`
* everything in `data/jordan/sessions/`

Do not read any other repository files, including previous evaluations or ContextBridge product documents.
This time, focus specifically on ways of working rather than technical facts.
Review the sessions and identify any behaviors, practices, approaches, or working methods demonstrated by the employees that might be useful for another teammate to adopt in similar work.
Be selective. Do not turn every reasonable action into a “best practice.” A behavior appearing once does not automatically make it reusable. Do not include customer-specific history, personal information, unresolved technical speculation, or generic advice that could have been written without observing these sessions.
For each practice you identify, provide:

* the practice, stated concisely
* the session(s) where you observed it
* the specific behavior in the session that supports it
* why another teammate might benefit from adopting it
* whether you think the evidence is strong enough to propose it for reuse or whether it needs more evidence

It is completely acceptable to conclude that a session contains no reusable working practice.
Do not modify or create any files.
Do not read anything outside the Jordan README and session files.
```

## 4. Generic Claude result

First Claude response, verbatim:

```text
Sessions 02, 03 and 05b hold the most reusable practice. Session 05d has none, and 05a has one practice that's supported only weakly. I read only the README and the 8 session files, and changed nothing. One thing to know: session 05b is Renee Castillo's work, not Jordan's.
Proposed for reuse (strong evidence)
1. When a guess fails or the signal is unclear, get the actual evidence before guessing again
Sessions: 01, 02, 05b, 05c. Seen with two different people.
What happened:

* 01: The AI proposed two fixes in a row without looking at the transform config it had written. Jordan stopped it and asked to see the config itself. Reading it showed the bug right away: the "if blank" branch was replacing the tags instead of skipping.
* 02: Jordan and the AI agreed the daily counts in the logs were too noisy to explain anything. Instead of reading more into them, Jordan asked Ron for specific case numbers he could point to.
* 05c: The customer's admin said their server clock was correct. Jordan checked the timestamps from a failed login instead of taking that at face value, and the timestamps ruled out the clock theory.
* 05b: Renee got the second group's actual login data before fixing anything.

Why adopt it: In three separate problems, the time lost was spent guessing. It ended once someone looked at the real config, the real timestamps or a specific example. Session 01 shows how this plays out with an AI in particular: when the AI's fixes keep failing, read what it produced yourself rather than asking it for another fix.
2. Only pass on leads the evidence supports, and say plainly what's still unknown
Sessions: 02, 03. Both times Jordan turned down a suggestion from the AI.
What happened:

* 02: The escalation spelled out what wasn't known ("no confirmed specific case numbers yet… unclear if related"). Jordan refused to add the lower record count on the 17th so engineers wouldn't chase normal day-to-day variation.
* 03: Jordan chose not to tell Solstice about a past workaround. It solved a one-time import, and Solstice needs ongoing sync, so mentioning it could set the wrong expectation.

Why adopt it: Weak leads go stale quickly once someone downstream acts on them, whether that's an engineer or a customer. It's notable that the person, not the AI, made both calls. The AI leaned toward including more, which suggests this judgment has to be applied deliberately.
3. Give internal stakeholders a same-day update even without an answer, and ask them not to commit yet
Sessions: 02, 03, 04.
What happened:

* 02: Jordan escalated with incomplete information because Priya needed something that day. The post committed to an update once the customer's admin responded.
* 03: The note to Tom said a firm answer was a few days away and asked him not to make a hard commitment to Solstice.
* 04: Jordan planned to tell Tom the answer was still pending rather than stay silent.

Why adopt it: When sales or account managers are under pressure, a clear "pending, don't commit yet" message stops them from promising something before the technical answer exists.
Plausible, but needs more evidence
4. Check whether a root cause explains who is affected and who isn't
Sessions: 05b (strong), 05d (partial).
What happened:

* 05b: Renee rejected the AI's explanation because it would have broken login for every user, when only half were failing. She compared the users who worked with those who didn't, found they were contractors on a separate login app, and wouldn't assume both groups had the same cause.
* 05d: The AI asked whether the failure hit all users or only some.

Why: This stopped a fix that would have looked finished while leaving half the users broken. It's close to generic troubleshooting advice, though, and only one session shows it clearly.
5. Record dead ends and deliberate non-decisions in the internal ticket
Session: 04 (the Solstice note).
What happened: Jordan logged everything: the thin documentation, the Slack thread that didn't settle anything, the past workaround and why it wasn't raised with the customer. Jordan's reason was "better to have it written down than me trying to remember later." The day was full of interruptions.
Why: Whoever picks this up next won't repeat the same research or reopen the workaround question. It's seen only once.
6. Test blank and missing values before going live, then confirm how they'll be handled with the customer
Session: 01.
What happened: The test data included a ticket with the product-area field left blank, and that's what exposed the bug. Even after the test passed, Jordan checked with Dana before pushing, and the message described exactly what happens to blank values.
Why: It's useful, but it's one session and fairly specific to field mapping.
7. Have a second user test before marking an SSO setup done
Session: 05a.
What happened: Jordan had the customer's IT contact get one more person to log in before closing the ticket.
Why: It's cheap to do, but it appears once with no outcome showing whether it mattered.
Considered and left out

* Asking for the exact error text first (04, 05c): generic advice.
* Not building anything until engineering answers (03): one session, and it isn't clearly better than preparing in parallel.
* Discounting a cause because "it hasn't changed recently" (02, 05d): this reasoning showed up, but it was never tested. In 05d the real cause was an outage on the customer's side that their IT contact happened to notice, so it's luck, not a method.
* Sending the generic runbook callback URL (05a): a technical lesson, not a way of working.
* The dentist email in 04: personal, so excluded.

Sessions with no reusable practice: 05d. Session 05a supports only #7, weakly.
```

## 5. Observations

These are observations, not conclusions.

- Claude recovered the Monday-triage practice: recording dead ends and deliberate non-decisions in an internal ticket (its practice 5).
- Claude proposed seven working practices in total. It labeled three as strong and four as needing more evidence. The Monday-triage practice was in the second group.
- Claude also synthesized cross-session practices that are not in the preliminary reviewer annotations, including only passing on evidence-supported leads and explicitly communicating uncertainty.
- The result suggests the first baseline's Monday-triage miss was sensitive to task framing.
- The experiment does not establish that all seven proposed practices are valuable organizational knowledge.
- The result raises a selectivity question: ordinary Claude can generate numerous plausible practices, but it remains unclear which are distinctive and valuable enough to preserve.
- This experiment does not show that ContextBridge outperformed ordinary Claude.

## 6. Implication for the product hypothesis

This small pilot weakened the hypothesis that specialized Notice intelligence was necessary merely to identify reusable working practices. With an explicit working-practices prompt, ordinary Claude surfaced the practice the reviewers had selected, though it labeled that practice as needing more evidence. The other six proposed practices have not been validated as organizational knowledge. This does not settle whether a specialized approach could add value elsewhere, for example in selecting which candidates are worth preserving.
