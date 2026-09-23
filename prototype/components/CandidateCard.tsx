"use client";

import { Badge } from "@/components/Badge";
import type { Candidate } from "@/lib/types";
import { useStore } from "@/lib/store";

export function CandidateCard({ candidate }: { candidate: Candidate }) {
  const { approve, dismiss } = useStore();
  const isProposed = candidate.status === "proposed";
  const isApproved = candidate.status === "approved";
  const isDismissed = candidate.status === "dismissed";

  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm dark:bg-zinc-900 ${
        isDismissed
          ? "border-zinc-200 opacity-60 dark:border-zinc-800"
          : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="neutral">Proposed by {candidate.contributor}&apos;s AI</Badge>
        {candidate.needsValidation && (
          <Badge tone="warning">Needs validation</Badge>
        )}
        {isApproved && <Badge tone="success">In team context</Badge>}
        {isDismissed && <Badge tone="neutral">Dismissed</Badge>}
      </div>
      <h3 className="mt-3 text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {candidate.title}
      </h3>
      <p className="mt-1.5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {candidate.summary}
      </p>
      <p className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        {candidate.source}
      </p>

      {isProposed && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => approve(candidate.id)}
            className="rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Approve
          </button>
          <button
            onClick={() => dismiss(candidate.id)}
            className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
