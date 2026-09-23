"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";

const links = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team Context" },
];

export function Nav() {
  const pathname = usePathname();
  const { reset } = useStore();

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
          <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            ContextBridge
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <nav className="flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors sm:px-4 ${
                    active
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/demo"
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Experience the demo
          </Link>

          <button
            onClick={() => {
              if (window.confirm("Reset the demo to its starting state?")) {
                reset();
              }
            }}
            className="text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
          >
            Reset demo
          </button>
        </div>
      </div>
    </header>
  );
}
