/** 1px horizontal line using design token (matches section/layer separators). */
export function Divider() {
  return (
    <div
      className="h-px w-full shrink-0"
      style={{ backgroundColor: "var(--divider)" }}
      aria-hidden
    />
  );
}
