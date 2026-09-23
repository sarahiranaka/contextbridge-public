# Product Thesis

> **Status: historical.** This is the last working version of an evolving product hypothesis, kept as written. It predates the decision to pause ContextBridge and its hypotheses were not validated. Read it alongside `docs/decision-pause.md`, which records what was actually tested and concluded.

## Observation

Personal AI is making individual employees more capable. As someone works with their AI coworker, the two of them build up shared understanding: how the product works, how to get things done, which shortcuts help, which assumptions hold, which don't.

Our pressure-testing also surfaced a second observation: in our experiment, a frontier model reasoned quite well across a small, controlled set of organizational artifacts. That result is limited in scope, but it suggests better document reasoning alone may not be a sufficient product wedge for ContextBridge.

## Problem

Personal AI can make individuals more capable while making organizational knowledge more siloed.

As employees repeatedly work with personalized AI coworkers, each human-AI pair develops useful knowledge: product understanding, workflows, techniques, discovered constraints, assumptions, and better ways of accomplishing tasks.

That learning improves the individual's AI relationship, but it does not naturally become organizational learning.

The team risks becoming a collection of increasingly capable human-AI silos — each pair getting better in isolation, with no mechanism for one pair's learning to reach another.

## Hypothesis

ContextBridge helps useful learning compound across personalized AI coworkers through three jobs:

1. **Notice** — identify potentially reusable learning emerging from ordinary human-AI work.
2. **Govern** — let humans decide what should become shared team context. Personal conversations and preferences remain private; uncertain claims can be validated; shared knowledge retains appropriate provenance and status.
3. **Deliver** — make approved knowledge available to other AI coworkers when it is relevant, rather than broadcasting all context to everyone.

The goal is not to synchronize everyone's AI memory or give every AI the same context.

The goal is: when one person and their AI learn something useful, the team should be able to benefit from it.

## Important product challenge

There is a much simpler alternative, and we should state it plainly rather than argue around it: a team could ask employees to periodically create or update a shared Markdown context file (for example, `TEAM_CONTEXT.md`) and instruct every AI coworker to read it.

ContextBridge should only exist if it meaningfully improves on this simpler workflow. That is an open question, not a foregone conclusion.

**Null hypothesis:** a well-maintained shared Markdown context file may be sufficient. If experiments show that Markdown provides most of the value with much less complexity, we should prefer the simpler solution.

**Hypothesized advantages worth testing**, none of which we have yet demonstrated:

- lower activation energy for capturing useful learning than manually writing and maintaining a file
- AI-assisted noticing of knowledge people may not think to document themselves
- inexpensive human review, so governance doesn't become its own chore
- relevance-triggered delivery rather than broadcasting everything into every context window
- managing conflicts, supersession, and provenance as shared knowledge accumulates beyond what a flat file stays legible at
- enabling organizational learning to compound over time rather than decay or go stale

These are hypotheses to validate, not claims we are making about what ContextBridge has already proven.

## Relationship to previous thesis

The previous thesis centered on document reasoning, provenance, authority, and supersession as the core problem. We're repositioning those mechanisms, not discarding them.

Provenance, authority, confidence, current state, and supersession still matter — but as **governance mechanisms** that support organizational learning, not as the primary problem ContextBridge exists to solve. They are how we keep shared knowledge trustworthy as it accumulates, not the reason a team would adopt the product in the first place.

## Product Principles

### Share learned context, not chat history.

Personal AI interactions should remain personal. Useful organizational knowledge should be extractable and reusable.

### Notice, don't broadcast.

The system's value is in surfacing what's worth sharing and delivering it when relevant — not in giving every AI coworker the same undifferentiated pile of context.

### Governance should be cheap.

If deciding what becomes shared knowledge is as much work as writing a document from scratch, employees will skip it. Review and validation need to be lightweight enough to actually happen.

### AI should accelerate judgment, not substitute for it.

The system should help employees understand evidence, history, and decisions while preserving human ownership of product judgment.

## Question

**How can useful learning from one human-AI working relationship become useful to the rest of the team without sharing private AI history or flooding everyone with more context?**
