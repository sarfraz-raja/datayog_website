import Image from "next/image";
import { cx } from "@/components/ui";

/** Sphere mark + crisp text wordmark, readable at any size. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cx("flex items-center gap-2", className)}>
      <Image src="/images/brand/logo-mark.png" alt="" width={66} height={128} preload className="h-10 w-auto lg:h-11" />
      <span className="text-xl font-extrabold tracking-[0.12em] lg:text-2xl">
        <span className={tone === "dark" ? "text-navy-900" : "text-white"}>DATA</span>
        <span className="text-brand-500">YOG</span>
      </span>
    </span>
  );
}
