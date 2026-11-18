/** A confirmed fact, or the dotted placeholder tag while the owner hasn't supplied it. */
export default function Pending({ value, label }: { value: string | null; label: string }) {
  return value ? <>{value}</> : <span className="ph">[{label}]</span>;
}
