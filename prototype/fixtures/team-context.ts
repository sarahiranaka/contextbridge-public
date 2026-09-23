import type { ContextItem } from "@/lib/types";

/**
 * Synthetic starting state for the Atlas team's governed context.
 *
 * This file is a demo fixture written for the prototype. It does not read,
 * import, or derive from anything under `data/atlas/` in the parent
 * repository — the application never touches that directory.
 */
export const seedTeamContext: ContextItem[] = [
  {
    id: "fact-launch-date",
    category: "product-fact",
    title: "Current launch date: October 15",
    summary:
      "Atlas is targeting an October 15 launch. This reflects the most recent approved product decision and supersedes the earlier June 1 and September 15 targets.",
    provenance: "Approved product decision (demo fixture)",
    confidence: "high",
    approvedAt: "Aug 3 (seed)",
  },
  {
    id: "fact-ai-summaries",
    category: "product-fact",
    title: "AI-generated summaries: deferred until after launch",
    summary:
      "AI summaries were part of the original launch scope. Pilot testing showed summary quality wasn't reliable enough yet, so the capability was deferred post-launch.",
    provenance: "Approved product decision (demo fixture)",
    confidence: "high",
    approvedAt: "Aug 3 (seed)",
  },
  {
    id: "fact-reporting-experience",
    category: "product-fact",
    title: "Reporting experience: interactive dashboards",
    summary:
      "Atlas launches with interactive, filterable dashboards instead of the originally planned static PDF reports, based on customer research.",
    provenance: "Approved product decision (demo fixture)",
    confidence: "high",
    approvedAt: "Aug 3 (seed)",
  },
];
