import Link from "next/link";
import { ContextFlowDiagram } from "@/components/ContextFlowDiagram";

export default function Home() {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
        ContextBridge
      </p>
      <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        Shared context for AI coworkers.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-base">
        ContextBridge turns useful things individual AI coworkers learn into
        governed team knowledge that other AI coworkers can safely inherit —
        without sharing private AI history.
      </p>

      <div className="mt-10 w-full max-w-2xl">
        <ContextFlowDiagram
          leftLabel="Someone's AI"
          leftSub="Personal, private context"
          middleLabel="Team Context"
          middleSub="Governed, human-reviewed"
          rightLabel="Another AI coworker"
          rightSub="Inherits when relevant"
          arrowLeftCaption="notices something useful → proposes"
          arrowRightCaption="inherits it, without private history"
        />
      </div>

      <p className="mt-6 max-w-xl text-xs text-zinc-500 dark:text-zinc-500">
        This runs continuously for everyone on a team — onboarding is just
        one moment it happens a lot.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/demo"
          className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          Experience the demo
        </Link>
        <Link
          href="/team"
          className="text-sm text-zinc-500 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
        >
          or explore Team Context directly →
        </Link>
      </div>
    </div>
  );
}
