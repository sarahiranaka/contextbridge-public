# Evaluation Plan v2

**Status:** Planned, not executed. ContextBridge was paused before any v2 evaluation ran (see `docs/decision-pause.md`).

## Why v2 Exists

Baseline v1, a single run, suggested that a frontier model can reason correctly across a small, well-structured set of organizational artifacts.

Using only the raw source documents, the baseline matched the answer key on all five questions the key covers (post hoc scoring; see `evals/baseline-v1.md`).

The main concern was epistemic calibration on CSV export, which the answer key does not cover. The model explicitly said export status was unresolved and rated its confidence Medium. But it led with "Officially, yes," treating the absence of a formal decision removing export as stronger evidence than the artifacts supported.

Evaluation v2 should therefore test harder and more realistic organizational knowledge problems rather than assuming raw-document reasoning is broadly insufficient.

## New Evaluation Dimensions

### 1. Ambiguous Current State

Some questions should not have a definitive answer.

The system should distinguish between:

- confirmed current state
- likely current state
- unresolved state
- unsupported inference

### 2. Authority vs. Recency

Newer artifacts are not automatically more authoritative.

The system should distinguish between:

- approved decisions
- product updates
- research evidence
- meeting discussion
- proposals
- informal working notes

### 3. Terminology Drift

The same product concept may change names over time.

The system should determine when two terms refer to the same concept without assuming that every similar term is equivalent.

### 4. Individually Learned Context

Some useful knowledge may exist in an employee's working context rather than formal organizational artifacts.

Examples include:

- summarized understanding of an application
- reusable prototyping workflows
- discovered system constraints
- working assumptions
- practices that make AI collaboration more effective

ContextBridge should explore how useful individual learning can become team knowledge without transferring private AI history wholesale.

## Core Evaluation Question

Can a governed organizational context layer improve reliability, calibration, provenance, and knowledge transfer beyond what a frontier model can achieve from raw organizational artifacts alone?

## Design Principle

The benchmark should remain fair.

Evaluation difficulty should come from realistic organizational ambiguity, evolution, authority differences, and distributed knowledge — not artificial traps designed solely to make the baseline fail.
