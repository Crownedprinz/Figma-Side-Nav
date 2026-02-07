/** Section header chevron: down when expanded, rotated -90deg when collapsed. */
export function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      style={{ transform: expanded ? "rotate(0deg)" : "rotate(-90deg)" }}
    >
      <path
        fill="currentColor"
        d="M9.768 6.768a.5.5 0 0 1 .707.707l-2.12 2.121a.5.5 0 0 1-.708 0L5.525 7.475a.5.5 0 0 1 .708-.707l1.768 1.767z"
      />
    </svg>
  );
}
