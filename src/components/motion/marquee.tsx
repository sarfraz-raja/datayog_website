import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/components/ui";

/**
 * Endless horizontal scroller, CSS only. The content is rendered twice and the
 * track slides by exactly one copy, so the loop is seamless. Pauses on hover.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cx("marquee", className)}
      data-reverse={reverse || undefined}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className="marquee-track">
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
