"use client";

import { useCallback, useSyncExternalStore } from "react";
import { seedCandidates } from "@/fixtures/candidates";
import { seedTeamContext } from "@/fixtures/team-context";
import type { Candidate, ContextItem } from "@/lib/types";

const STORAGE_KEY = "contextbridge-demo-v0";

interface StoreState {
  candidates: Candidate[];
  teamContext: ContextItem[];
  lastApprovedId: string | null;
}

// Always used for the server render and the client's hydration pass, so
// the two match exactly. Real (possibly localStorage-restored) state only
// takes over once useSyncExternalStore switches to getSnapshot below.
const seedState: StoreState = {
  candidates: seedCandidates,
  teamContext: seedTeamContext,
  lastApprovedId: null,
};

function loadInitialState(): StoreState {
  if (typeof window === "undefined") return seedState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoreState;
  } catch {
    // Corrupt or unavailable storage — fall back to seed state.
  }
  return seedState;
}

let state: StoreState = loadInitialState();
const listeners = new Set<() => void>();

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable (e.g. private browsing) — demo still works,
    // it just won't persist across reloads.
  }
}

function update(updater: (prev: StoreState) => StoreState) {
  state = updater(state);
  persist();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot() {
  return seedState;
}

function approveCandidate(id: string) {
  update((prev) => {
    const candidate = prev.candidates.find((c) => c.id === id);
    if (!candidate || candidate.status !== "proposed") return prev;

    const approvedAt = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const newContextItem: ContextItem = {
      id: `team-${candidate.id}`,
      category: "team-practice",
      title: candidate.title,
      summary: candidate.summary,
      provenance: candidate.source,
      approvedAt,
      contributor: candidate.contributor,
    };

    return {
      candidates: prev.candidates.map((c) =>
        c.id === id ? { ...c, status: "approved" as const } : c
      ),
      teamContext: [...prev.teamContext, newContextItem],
      lastApprovedId: newContextItem.id,
    };
  });
}

function dismissCandidate(id: string) {
  update((prev) => ({
    ...prev,
    candidates: prev.candidates.map((c) =>
      c.id === id ? { ...c, status: "dismissed" as const } : c
    ),
  }));
}

function resetStore() {
  update(() => seedState);
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clean up if storage was never available.
  }
}

export function useStore() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const approve = useCallback((id: string) => approveCandidate(id), []);
  const dismiss = useCallback((id: string) => dismissCandidate(id), []);
  const reset = useCallback(() => resetStore(), []);

  return { ...snapshot, approve, dismiss, reset };
}
