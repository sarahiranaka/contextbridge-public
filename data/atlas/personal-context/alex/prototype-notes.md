# Prototyping Atlas — Working Notes

Personal working notes, not an official artifact. Built up over several prototyping passes on Atlas with my AI assistant. Mostly here so I stop re-deriving the same setup every time.

## Starting point

I don't design prototype screens from scratch. I start from the existing Atlas app — same component patterns, same spacing, same interaction conventions — and modify only what the workflow I'm testing actually needs. Stakeholders read visual novelty as "this is what we're building," so the more a prototype looks like a fresh design, the more feedback I get on things that were never in question (color, layout, nav placement) instead of the actual workflow question.

Concretely: I keep the left-side nav and the existing information hierarchy untouched in every prototype. If nav or hierarchy is genuinely part of what's being tested, that's a different exercise and I say so up front.

## Data

Always synthetic feedback data, never production. I keep a small hand-built dataset (~30-40 feedback entries) with a realistic spread of sentiment, length, and tagging so reviewers aren't distracted by "wait, is this a real customer." Data realism matters more than data volume for prototype reviews — nobody has ever asked me for a bigger dataset, but plenty of people have gotten hung up on data that felt fake.

## Scope

Prototype the one workflow being tested, not the surrounding app. If the dashboard filter interaction is the thing under test, everything else on the page can be static or a screenshot. I've wasted time in the past building out adjacent screens nobody asked about.

## Marking mocked functionality

Anything not wired to real logic gets an explicit visual marker — I use a small "MOCK" tag in the corner of the affected component — plus a one-line note in the prototype's readme listing what's mocked and what isn't. Without this, reviewers (and sometimes engineers scoping the real build) assume mocked behavior is real, which has caused confusion at least twice.

## Assumptions that need engineering validation

Anything a prototype implies about performance, data volume, or backend behavior gets called out separately so it doesn't quietly become a requirement. Current running list from the dashboard prototyping work:

- Client-side filtering across a customer's full feedback history is assumed fast enough for the prototype to feel responsive at demo scale. Unverified whether this holds at real data volumes — the largest pilot customers may have feedback volumes an order of magnitude past what I've tested with, and I haven't confirmed with engineering whether server-side filtering is required for the real build.
- Assuming the interactive dashboard can reuse the existing tagging pipeline's output directly with no reshaping. Not verified against actual pipeline output.

## Prototype changelog

I keep a short dated changelog at the top of each prototype file (one line per revision — what changed, why) instead of relying on version history or memory to explain how a prototype evolved. Cheap to maintain and has saved real time in reviews when someone asks "wait, why does this look different from last week" — I've started doing this on every prototype regardless of size, and it's probably worth other people doing the same on theirs.

## Working setup

I prototype in dark mode because it's easier on my eyes during long sessions — but I always flip to light mode before sharing a link, since most reviewers view it that way and dark-mode screenshots read as unfinished to some stakeholders. This is just how I work, not a recommendation for how prototypes should be built.
