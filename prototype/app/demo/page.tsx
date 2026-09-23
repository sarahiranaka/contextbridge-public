"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CandidateCard } from "@/components/CandidateCard";
import { ContextCard } from "@/components/ContextCard";
import { ContextFlowDiagram } from "@/components/ContextFlowDiagram";
import { PageHeader } from "@/components/PageHeader";
import { useStore } from "@/lib/store";

const CHAPTERS = ["inherit", "contribute", "compound"] as const;
type Chapter = (typeof CHAPTERS)[number];

const CHAPTER_LABELS: Record<Chapter, string> = {
  inherit: "Inherit",
  contribute: "Contribute",
  compound: "Compound",
};

// The one candidate this guided demo focuses on, so the story stays
// concrete and the decision in Chapter 2 has an unambiguous consequence.
const FEATURED_CANDIDATE_ID = "practice-preserve-patterns";

export default function DemoPage() {
  const { candidates, teamContext, lastApprovedId, reset } = useStore();
  const [chapter, setChapter] = useState<Chapter>("inherit");
  const [maxReached, setMaxReached] = useState(0);

  const featured = candidates.find((c) => c.id === FEATURED_CANDIDATE_ID);

  const goTo = (next: Chapter) => {
    const nextIndex = CHAPTERS.indexOf(next);
    setChapter(next);
    setMaxReached((prev) => Math.max(prev, nextIndex));
  };

  // The reviewer's Approve/Dismiss click on Chapter 2 is what advances the
  // story — not a passive "Next" button. Detect that decision and move on.
  const prevStatusRef = useRef(featured?.status);
  useEffect(() => {
    if (
      chapter === "contribute" &&
      prevStatusRef.current === "proposed" &&
      featured &&
      featured.status !== "proposed"
    ) {
      setChapter("compound");
      setMaxReached((prev) => Math.max(prev, CHAPTERS.indexOf("compound")));
    }
    prevStatusRef.current = featured?.status;
  }, [featured, chapter]);

  const restart = () => {
    reset();
    setChapter("inherit");
    setMaxReached(0);
  };

  const productFacts = teamContext.filter(
    (item) => item.category === "product-fact"
  );
  const teamPractices = teamContext.filter(
    (item) => item.category === "team-practice"
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-center gap-2">
        {CHAPTERS.map((c, i) => {
          const reached = i <= maxReached;
          const active = c === chapter;
          return (
            <button
              key={c}
              disabled={!reached}
              onClick={() => reached && setChapter(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : reached
                    ? "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    : "cursor-not-allowed text-zinc-300 dark:text-zinc-700"
              }`}
            >
              {i + 1} · {CHAPTER_LABELS[c]}
            </button>
          );
        })}
      </div>

      {chapter === "inherit" && (
        <div>
          <PageHeader
            eyebrow="Chapter 1 of 3 · Inherit"
            title="Maya joins Atlas"
            description="Maya is a new PM joining the Atlas project. Her AI coworker inherits Atlas's existing governed context immediately — nothing here came from a person directly, it came from Team Context. Onboarding is just one use case: the same inheritance happens continuously for every teammate, not only new hires."
          />

          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            What Maya&apos;s AI already knows
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {productFacts.map((item) => (
              <ContextCard key={item.id} item={item} />
            ))}
          </div>

          <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Team practices Maya has inherited
          </h2>
          {teamPractices.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
              None yet — keep going to see how one gets added.
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {teamPractices.map((item) => (
                <ContextCard
                  key={item.id}
                  item={item}
                  highlight={item.id === lastApprovedId}
                />
              ))}
            </div>
          )}

          <div className="mt-10">
            <button
              onClick={() => goTo("contribute")}
              className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Next: See what Alex&apos;s AI noticed →
            </button>
          </div>
        </div>
      )}

      {chapter === "contribute" && (
        <div>
          <PageHeader
            eyebrow="Chapter 2 of 3 · Contribute"
            title="Alex's AI notices something useful"
            description="Alex has spent months prototyping Atlas changes with his AI coworker. Along the way, his AI noticed a working pattern worth sharing. You're now acting as Alex — nothing becomes team knowledge until you decide."
          />

          {!featured ? (
            <p className="text-sm text-zinc-500">Candidate not found.</p>
          ) : featured.status === "proposed" ? (
            <div className="mx-auto max-w-md">
              <CandidateCard candidate={featured} />
            </div>
          ) : (
            <div className="mx-auto max-w-md space-y-4">
              <CandidateCard candidate={featured} />
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/50 p-4 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
                You already {featured.status === "approved" ? "approved" : "dismissed"}{" "}
                this one.{" "}
                <button
                  onClick={() => goTo("compound")}
                  className="font-medium text-emerald-700 underline underline-offset-2 dark:text-emerald-400"
                >
                  See the consequence →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {chapter === "compound" && featured && (
        <div>
          {featured.status === "approved" ? (
            <>
              <PageHeader
                eyebrow="Chapter 3 of 3 · Compound"
                title="The team just learned something."
                description="Maya's AI inherited the approved practice — not Alex's notes, prototypes, or conversations. Only governed, reviewed knowledge crossed over."
              />

              <div className="mb-8">
                <ContextFlowDiagram
                  leftLabel="Alex's AI"
                  leftSub="Private working context"
                  middleLabel={featured.title}
                  middleSub="Now governed Team Context"
                  rightLabel="Maya's AI"
                  rightSub="Inherits it automatically"
                  arrowLeftCaption="Alex approved it"
                  arrowRightCaption="without Alex's notes or conversations"
                  emphasizeMiddle
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Now in Team Context
                  </h2>
                  <div className="mt-4">
                    {teamContext
                      .filter((item) => item.id === lastApprovedId)
                      .map((item) => (
                        <ContextCard key={item.id} item={item} highlight />
                      ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Maya&apos;s AI can now see
                  </h2>
                  <div className="mt-4">
                    {teamContext
                      .filter((item) => item.id === lastApprovedId)
                      .map((item) => (
                        <ContextCard key={item.id} item={item} highlight />
                      ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <PageHeader
                eyebrow="Chapter 3 of 3 · Compound"
                title="Nothing changed — and that's the point."
                description="Alex dismissed the suggestion, so it stays private. It never becomes Team Context, and Maya's AI never sees it. Governance means real decisions can go either way."
              />
              <div className="mx-auto max-w-md">
                <CandidateCard candidate={featured} />
              </div>
            </>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={restart}
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {featured.status === "approved"
                ? "Restart the demo"
                : "Restart the demo to see what happens if approved"}
            </button>
            <Link
              href="/team"
              className="text-sm text-zinc-500 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
            >
              Explore Team Context freely →
            </Link>
          </div>

          <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-500">
            This loop runs continuously — anyone can contribute, anyone can
            inherit, at any time.
          </p>
        </div>
      )}
    </div>
  );
}
