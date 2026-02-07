"use client";

export function GroupLabelRow({ label }: { label: string }) {
  return (
    <div
      className="px-2 py-1 font-medium"
      style={{
        fontSize: "var(--sidebar-font-size)",
        color: "var(--text-secondary)",
        paddingLeft: "var(--sidebar-padding-x)",
        paddingRight: "var(--sidebar-padding-x)",
      }}
    >
      {label}
    </div>
  );
}
