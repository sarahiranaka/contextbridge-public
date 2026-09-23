# ContextBridge — v1 Prototype

> **Concept demo of a paused product hypothesis.** This prototype illustrates
> what ContextBridge was imagined to do. It is not a validated or production
> product. All interactions — the AI coworker's suggestions, approvals,
> dismissals, and inherited context — are simulated over static fixtures. It
> does not call an AI model or any external API. ContextBridge development was
> paused before any of this was built for real; see
> `../docs/decision-pause.md`.

A polished, click-through prototype of ContextBridge, built for a portfolio
demo. See `../docs/product-experience.md` for the product narrative this
implements.

## What this is

- **Home (`/`)** — a landing page that states the idea in one screen: "Shared
  context for AI coworkers," plus a diagram showing the relationship between
  someone's personal AI context, governed Team Context, and another AI
  coworker who inherits from it.
- **Experience the demo (`/demo`)** — a 3-chapter guided story that uses two
  personas (Maya, Alex) purely to illustrate the loop. They are not product
  roles or nav destinations:
  1. **Inherit** — Maya joins Atlas and her AI inherits existing governed
     context. Onboarding is framed explicitly as one example, not the point.
  2. **Contribute** — Alex's AI surfaces a candidate practice. The reviewer
     acts as Alex and must Approve or Dismiss it — that decision is what
     advances the story, not a "Next" button.
  3. **Compound** — the consequence of that decision, shown immediately:
     if approved, the practice is now live in Team Context and visibly
     available to Maya's AI (never Alex's raw notes or conversations); if
     dismissed, it stays private and nothing changes elsewhere.
- **Team Context (`/team`)** — the persistent, persona-free registry: what's
  approved and live, and what's still awaiting review, with the same
  Approve/Dismiss controls available any time, to anyone.

## Data

All content lives in `fixtures/` and is hand-authored, clearly synthetic demo
data. This app does not import, read, or parse anything under the parent
repository's `data/atlas/` directory — that dataset was reserved for
evaluation work, including the evaluation planned in `../docs/eval-plan-v2.md`,
which was not executed before the project was paused.

State (approvals/dismissals) is held in memory and mirrored to
`localStorage` so it survives a page reload. Use **Reset demo** in the nav,
or **Restart the demo** at the end of Chapter 3, to return to the starting
fixtures at any time.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Not in v1 (by design)

No Claude API calls, no document upload, no embeddings/real retrieval, no
auth, no database, no server routes. Everything is client-side state over
static fixtures. These are intentionally left as clean seams for later
milestones, not implemented here.
