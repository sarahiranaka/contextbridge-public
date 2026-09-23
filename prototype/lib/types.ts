export type ContextCategory = "product-fact" | "team-practice";

export type ConfidenceLevel = "high" | "medium" | "low";

export type CandidateStatus = "proposed" | "approved" | "dismissed";

// A single piece of governed, shared knowledge Maya's AI can inherit.
export interface ContextItem {
  id: string;
  category: ContextCategory;
  title: string;
  summary: string;
  provenance: string;
  approvedAt: string;
  confidence?: ConfidenceLevel;
  contributor?: string;
}

// Something Alex's AI has surfaced as potentially reusable, pending human review.
export interface Candidate {
  id: string;
  title: string;
  summary: string;
  contributor: string;
  source: string;
  status: CandidateStatus;
  needsValidation?: boolean;
}
