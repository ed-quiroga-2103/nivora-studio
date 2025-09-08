import React from "react";
import styles from "./Separator.module.scss";

type Orientation = "horizontal" | "vertical";
type Variant = "solid" | "dashed" | "dotted" | "gradient";

export interface SeparatorProps {
  orientation?: Orientation; // default: "horizontal"
  label?: React.ReactNode; // only shown for horizontal
  align?: "start" | "center" | "end"; // label alignment (horizontal)
  variant?: Variant; // default: "solid"
  thickness?: number | string; // e.g., 1 or "2px" (default: 1px)
  color?: string; // CSS color (default: currentColor)
  length?: number | string; // e.g., 100, "50%", "8rem" (axis length)
  gap?: number | string; // block margin (default: 1rem)
  className?: string;
  style?: React.CSSProperties;
}

const toPx = (v?: number | string) => (typeof v === "number" ? `${v}px` : v);

const Separator: React.FC<SeparatorProps> = ({
  orientation = "horizontal",
  label,
  align = "center",
  variant = "solid",
  thickness = 1,
  color,
  length = "100%",
  gap = "1rem",
  className = "",
  style,
}) => {
  const cssVars: React.CSSProperties = {
    // CSS variables (consumed by the SCSS)
    ["--sep-thickness" as any]: toPx(thickness) ?? "1px",
    ["--sep-color" as any]: color ?? "currentColor",
    ["--sep-length" as any]:
      typeof length === "number" ? `${length}px` : length,
    ["--sep-gap" as any]: toPx(gap) ?? "1rem",
    ...style,
  };

  const variantClass =
    variant === "solid"
      ? styles.solid
      : variant === "dashed"
      ? styles.dashed
      : variant === "dotted"
      ? styles.dotted
      : styles.gradient;

  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={[
          styles.separator,
          styles.vertical,
          variantClass,
          className,
        ].join(" ")}
        style={cssVars}
      />
    );
  }

  // Horizontal
  const alignClass =
    align === "start"
      ? styles.alignStart
      : align === "end"
      ? styles.alignEnd
      : styles.alignCenter;

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={[
          styles.separator,
          styles.horizontal,
          styles.withLabel,
          alignClass,
          variantClass,
          className,
        ].join(" ")}
        style={cssVars}
      >
        <span className={styles.label}>{label}</span>
      </div>
    );
  }

  return (
    <hr
      className={[
        styles.separator,
        styles.horizontal,
        variantClass,
        className,
      ].join(" ")}
      style={cssVars}
    />
  );
};

export default Separator;
