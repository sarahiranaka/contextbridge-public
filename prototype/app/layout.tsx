import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ContextBridge — Atlas Demo",
  description:
    "A synthetic prototype of ContextBridge's Contribute → Govern → Inherit loop.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <Nav />
        <div className="border-b border-amber-200/60 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-500/10">
          <p className="mx-auto max-w-5xl px-6 py-2 text-xs text-amber-800 dark:text-amber-300">
            <strong>Concept demo of a paused product hypothesis.</strong>{" "}
            Approvals and AI suggestions are simulated; nothing here calls an
            AI model or external API. Not a validated or production product.
            All content is fictional fixture data written for this prototype.
          </p>
        </div>
        <main className="flex-1">
          <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
