interface NodeProps {
  label: string;
  sub: string;
  emphasize?: boolean;
}

function Node({ label, sub, emphasize }: NodeProps) {
  return (
    <div
      className={`flex-1 rounded-2xl border bg-white p-4 text-center shadow-sm dark:bg-zinc-900 ${
        emphasize
          ? "border-emerald-400 ring-1 ring-emerald-300 dark:border-emerald-600 dark:ring-emerald-700"
          : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {label}
      </p>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{sub}</p>
    </div>
  );
}

function Arrow({ caption }: { caption: string }) {
  return (
    <div className="flex flex-row items-center gap-2 px-1 sm:flex-col sm:px-0">
      <span className="text-lg text-zinc-300 dark:text-zinc-600 sm:hidden" aria-hidden>
        ↓
      </span>
      <span
        className="hidden text-lg text-zinc-300 dark:text-zinc-600 sm:inline"
        aria-hidden
      >
        →
      </span>
      <span className="max-w-[9rem] text-center text-xs text-zinc-500 dark:text-zinc-400">
        {caption}
      </span>
    </div>
  );
}

export function ContextFlowDiagram({
  leftLabel,
  leftSub,
  middleLabel,
  middleSub,
  rightLabel,
  rightSub,
  arrowLeftCaption,
  arrowRightCaption,
  emphasizeMiddle = false,
}: {
  leftLabel: string;
  leftSub: string;
  middleLabel: string;
  middleSub: string;
  rightLabel: string;
  rightSub: string;
  arrowLeftCaption: string;
  arrowRightCaption: string;
  emphasizeMiddle?: boolean;
}) {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <Node label={leftLabel} sub={leftSub} />
      <Arrow caption={arrowLeftCaption} />
      <Node label={middleLabel} sub={middleSub} emphasize={emphasizeMiddle} />
      <Arrow caption={arrowRightCaption} />
      <Node label={rightLabel} sub={rightSub} />
    </div>
  );
}
