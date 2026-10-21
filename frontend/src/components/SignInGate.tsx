"use client";

import {
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { KanbanBoard } from "@/components/KanbanBoard";

const SESSION_KEY = "kanban-studio-authenticated";
const AUTH_CHANGE_EVENT = "kanban-studio-auth-change";

type AuthStatus = "checking" | "signed-out" | "signed-in";

const getAuthSnapshot = (): AuthStatus =>
  window.sessionStorage.getItem(SESSION_KEY) === "true"
    ? "signed-in"
    : "signed-out";

const getServerSnapshot = (): AuthStatus => "checking";

const subscribeToAuth = (onChange: () => void) => {
  window.addEventListener(AUTH_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

export const SignInGate = () => {
  const status = useSyncExternalStore(
    subscribeToAuth,
    getAuthSnapshot,
    getServerSnapshot
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username !== "user" || password !== "password") {
      setError("Incorrect username or password.");
      return;
    }

    window.sessionStorage.setItem(SESSION_KEY, "true");
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    setError("");
  };

  const handleSignOut = () => {
    window.sessionStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    setPassword("");
  };

  if (status === "checking") {
    return (
      <main
        aria-label="Loading sign-in state"
        className="flex min-h-screen items-center justify-center text-sm text-[var(--gray-text)]"
      >
        Loading...
      </main>
    );
  }

  if (status === "signed-in") {
    return <KanbanBoard onSignOut={handleSignOut} />;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <div className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,_rgba(32,157,215,0.25)_0%,_rgba(32,157,215,0.05)_55%,_transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[520px] w-[520px] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle,_rgba(117,57,145,0.18)_0%,_rgba(117,57,145,0.05)_55%,_transparent_75%)]" />
      <section className="relative w-full max-w-md rounded-[32px] border border-[var(--stroke)] bg-white/90 p-8 shadow-[var(--shadow)] backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--gray-text)]">
          Single Board Kanban
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--navy-dark)]">
          Kanban Studio
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--gray-text)]">
          Sign in to open your project board.
        </p>
        <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-semibold text-[var(--navy-dark)]"
              htmlFor="username"
            >
              Username
            </label>
            <input
              autoComplete="username"
              className="rounded-xl border border-[var(--stroke)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20"
              id="username"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              required
              value={username}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-semibold text-[var(--navy-dark)]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              autoComplete="current-password"
              className="rounded-xl border border-[var(--stroke)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20"
              id="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </div>
          {error ? (
            <p className="text-sm font-medium text-red-700" role="alert">
              {error}
            </p>
          ) : null}
          <button
            className="rounded-xl bg-[var(--secondary-purple)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-blue)]"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
};
