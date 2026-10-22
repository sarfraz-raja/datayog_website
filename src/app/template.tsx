import { ViewTransition } from "react";

/** Remounts on every navigation, so the page content fades between routes. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
