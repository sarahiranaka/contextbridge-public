# Product Experience

> **Status: historical.** This describes the intended product experience and demo story behind the `prototype/` concept demo, written before ContextBridge was paused. The flows it describes (Notice, Govern, Deliver) were not built as a working product or validated. Read it alongside `docs/decision-pause.md`.

## Product Idea

As AI coworkers become personalized, useful knowledge can become trapped inside individual AI relationships.

ContextBridge turns useful learning from individual AI coworkers into governed team context that other AI coworkers can safely inherit.

It does not synchronize everyone's AI memory. Personal conversations and preferences remain personal.

Instead, ContextBridge creates a governed bridge between personal AI context and shared organizational context.

## Core Loop

ContextBridge supports two complementary flows:

**Contribute:** An employee and their AI discover something potentially useful to the team. ContextBridge proposes the reusable knowledge for human review before it becomes shared context.

**Inherit:** When another employee's AI needs relevant context, it can use approved team knowledge without receiving another employee's private AI history.

The goal is not for every AI coworker to know the same things. The goal is for each AI coworker to have access to the right shared context when it is needed.

## Demo Story

### 1. Maya inherits organizational context

Maya is a new product manager joining Atlas.

Her AI coworker can access the underlying Atlas artifacts, but ContextBridge also provides a governed understanding of the product.

Maya can quickly understand:

- what is currently true
- what changed and why
- which sources support that understanding
- what remains unresolved

For example, ContextBridge knows that the current launch date is October 15 while CSV availability at launch remains unresolved.

### 2. Alex and his AI learn something useful

Alex is an experienced Atlas employee who regularly prototypes product changes with his AI coworker.

Over time, Alex and his AI have developed useful prototyping practices.

ContextBridge identifies potentially reusable learning without publishing Alex's personal AI context.

For example, it may propose:

- preserve existing application patterns when they are not part of the test
- prototype only the workflow being evaluated
- use representative synthetic customer data
- clearly identify mocked functionality

It may also identify an unverified technical assumption that should be validated rather than shared as fact.

Personal working preferences should remain private.

### 3. Useful learning becomes team context

Alex reviews the proposed context.

He can approve, edit, reject, or request validation of individual items.

Only approved knowledge becomes part of the Atlas team's shared context.

The shared context retains information about where the knowledge came from and its level of authority.

### 4. Maya inherits Alex's learning

Later, Maya asks her AI coworker to help prototype an Atlas change.

Her AI can retrieve the relevant approved Atlas practices.

Maya benefits from what Alex and his AI learned without receiving Alex's conversations, personal preferences, or unrelated context.

## Product Principle

ContextBridge does not make everyone's AI context identical.

It allows useful organizational learning to compound across AI coworkers while preserving boundaries between personal and shared context.
