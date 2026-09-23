import { Badge } from "@/components/Badge";
import type { ContextItem } from "@/lib/types";

const confidenceTone = {
  high: "success",
  medium: "warning",
  low: "neutral",
} as const;

export function ContextCard({
  item,
  highlight = false,
}: {
  item: ContextItem;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm transition-shadow dark:bg-zinc-900 ${
        highlight
          ? "border-emerald-400 ring-1 ring-emerald-300 dark:border-emerald-600 dark:ring-emerald-700"
          : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={item.category === "product-fact" ? "info" : "neutral"}>
          {item.category === "product-fact" ? "Product fact" : "Team practice"}
        </Badge>
        {item.confidence && (
          <Badge tone={confidenceTone[item.confidence]}>
            {item.confidence} confidence
          </Badge>
        )}
        {highlight && <Badge tone="success">Just inherited</Badge>}
      </div>
      <h3 className="mt-3 text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {item.title}
      </h3>
      <p className="mt-1.5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {item.summary}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        <span>{item.provenance}</span>
        <span aria-hidden>·</span>
        <span>Approved {item.approvedAt}</span>
        {item.contributor && (
          <>
            <span aria-hidden>·</span>
            <span>via {item.contributor}</span>
          </>
        )}
      </div>
    </div>
  );
}
