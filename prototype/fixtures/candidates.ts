import type { Candidate } from "@/lib/types";

/**
 * Synthetic starting state for candidate practices Alex's AI has surfaced.
 *
 * This file is a demo fixture written for the prototype. It does not read,
 * import, or derive from anything under `data/atlas/` in the parent
 * repository — the application never touches that directory.
 */
export const seedCandidates: Candidate[] = [
  {
    id: "practice-preserve-patterns",
    title: "Preserve existing app patterns in prototypes",
    summary:
      "Start from Atlas's real components, spacing, and navigation instead of a fresh design. Visual novelty reads as \"this is what we're building,\" which pulls reviewer feedback away from the workflow actually being tested.",
    contributor: "Alex",
    source: "Surfaced from Alex's prototyping sessions with his AI coworker",
    status: "proposed",
  },
  {
    id: "practice-synthetic-data",
    title: "Use realistic synthetic data, never production data",
    summary:
      "Build a small, hand-crafted dataset with a realistic spread of content rather than pulling real customer data. Reviewers get distracted by \"is this real\" more often than they ask for a bigger dataset.",
    contributor: "Alex",
    source: "Surfaced from Alex's prototyping sessions with his AI coworker",
    status: "proposed",
  },
  {
    id: "practice-mark-mocked",
    title: "Explicitly mark mocked functionality",
    summary:
      "Tag anything not wired to real logic and note it in the prototype's readme. Without a clear marker, reviewers and engineers have assumed mocked behavior was real.",
    contributor: "Alex",
    source: "Surfaced from Alex's prototyping sessions with his AI coworker",
    status: "proposed",
  },
  {
    id: "practice-scope-one-workflow",
    title: "Prototype one workflow, not the surrounding app",
    summary:
      "Keep everything outside the workflow under test static or a screenshot. Building out adjacent screens nobody asked about is wasted effort.",
    contributor: "Alex",
    source: "Surfaced from Alex's prototyping sessions with his AI coworker",
    status: "proposed",
  },
  {
    id: "practice-client-side-filtering",
    title: "Client-side filtering is fast enough for prototypes",
    summary:
      "An assumption from recent dashboard prototyping work. Unverified against real data volumes at the largest pilot customers — flagged for engineering validation, not yet confirmed as fact.",
    contributor: "Alex",
    source: "Surfaced from Alex's prototyping sessions — flagged as unverified",
    status: "proposed",
    needsValidation: true,
  },
];
