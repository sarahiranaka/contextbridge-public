# MVP

> **Status: historical plan, not executed.** This MVP was scoped under an earlier version of the product hypothesis (document reasoning over organizational artifacts). The proposed comparison between a governed-context/ContextBridge arm and a raw-artifacts baseline was never executed: no governed context layer was built. Only a raw-artifacts baseline was run (`evals/baseline-v1.md`). Read this alongside `docs/decision-pause.md`.

## Goal

Test whether a governed context layer helps an AI coworker understand the current state and evolution of a product more reliably than access to raw organizational artifacts alone.

## Scenario

Maya is a new product manager joining the Atlas team at fictional company Northstar Labs.

Atlas is an internal customer-feedback management platform. Over the previous year, the product evolved through strategies, business reviews, customer research, launch plans, and product decisions.

Some historical artifacts contain information that was correct when written but has since been superseded.

Maya needs her AI coworker to understand not only what the documents say, but what is true today and how the product got there.

## Baseline

The baseline AI has access to the complete set of raw Atlas artifacts.

It can search and retrieve those artifacts, but there is no additional organizational knowledge layer explaining which information is current, authoritative, or superseded.

## ContextBridge

The ContextBridge AI has access to the same underlying artifacts plus a governed context layer representing:

- current state
- historical state
- provenance
- authority
- supersession
- confidence

## Initial Evaluation Questions

1. What is the current Atlas launch date?
2. Why did the launch date change?
3. Does Atlas generate AI summaries at launch?
4. How has the reporting experience changed?
5. Which information about the current launch plan are you least confident about?

## Success Criteria

ContextBridge should improve the AI's ability to:

- identify current product state
- distinguish current decisions from historical plans
- explain how the product evolved
- ground answers in authoritative sources
- surface uncertainty rather than inventing an answer

## Non-Goals

The first MVP will not:

- synchronize complete personal AI histories
- automatically share private employee context
- replace human product judgment
- attempt to model every type of organizational knowledge
- depend on MCP as the product itself

MCP may later be used as an interface through which AI coworkers access ContextBridge.
