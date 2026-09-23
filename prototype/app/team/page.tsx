"use client";

import { CandidateCard } from "@/components/CandidateCard";
import { ContextCard } from "@/components/ContextCard";
import { PageHeader } from "@/components/PageHeader";
import { useStore } from "@/lib/store";

export default function TeamContextPage() {
  const { teamContext, candidates, lastApprovedId } = useStore();

  const pendingReview = candidates.filter((c) => c.status === "proposed");

  return (
    <div>
      <PageHeader
        eyebrow="Team Context · Governance"
        title="The Atlas team's shared context registry"
        description="Everything approved here is what any AI coworker on the team can inherit — with where it came from and when it was approved. Items awaiting review are visible for transparency but aren't shared yet."
      />

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Approved — live team context ({teamContext.length})
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {teamContext.map((item) => (
            <ContextCard
              key={item.id}
              item={item}
              highlight={item.id === lastApprovedId}
            />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Proposed — awaiting review ({pendingReview.length})
        </h2>
        {pendingReview.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
            Nothing waiting on review right now.
          </div>
        ) : (
          <>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
              Anyone on the team can review these and decide below.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {pendingReview.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
