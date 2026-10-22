import Image from "next/image";
import { cx } from "@/components/ui";
import type { ArtName } from "./scenes";

export type { ArtName };

/**
 * Brand illustration: navy backdrop with a dot grid and soft glow (CSS), plus an
 * animated line scene served as a static SVG file from /art/<name>.svg.
 * Fills its parent; give the parent a size or aspect ratio.
 */
export function Art({
  name,
  label,
  className,
  priority = false,
}: {
  name: ArtName | "hero-dashboard";
  label?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cx("art absolute inset-0 overflow-hidden bg-navy-950", className)}>
      <Image
        src={`/art/${name}.svg`}
        alt={label ?? ""}
        fill
        unoptimized
        preload={priority}
        loading={priority ? "eager" : "lazy"}
        className="object-contain"
      />
    </div>
  );
}
