import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  action?: ReactNode;
}) {
  return (
    <div
      className={`mb-10 flex flex-col gap-3 md:mb-14 ${
        align === "center" ? "items-center text-center" : ""
      } ${action ? "md:flex-row md:items-end md:justify-between md:text-left" : ""}`}
    >
      <div className={align === "center" && !action ? "max-w-2xl" : ""}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-3 font-display text-3xl leading-tight md:text-5xl">{title}</h2>
        {description && (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--mute)] md:text-base">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
