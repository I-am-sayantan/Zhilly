/** The "being built" stamp. Inline on the two pages that show it (Home, Stay), so its text isn't in every page's HTML. */
export default function BuildStamp() {
  return (
    <svg className="stamp" viewBox="0 0 200 200" aria-hidden="true">
      <g filter="url(#inked)" fill="none" stroke="currentColor">
        <ellipse cx="100" cy="100" rx="92" ry="91" strokeWidth="2.2" transform="rotate(-5 100 100)" />
        <path id="rb" d="M100 100 m-77 0 a77 77 0 1 1 154 0 a77 77 0 1 1 -154 0" stroke="none" />
        <text fill="currentColor" stroke="none" fontWeight="700" fontSize="15" letterSpacing="2.4" style={{ fontFamily: "var(--sans)" }}>
          <textPath href="#rb">ROOM PHOTOS AFTER FIT-OUT · ZHILLY · </textPath>
        </text>
        <text x="100" y="96" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="800" fontSize="25" style={{ fontFamily: "var(--sans)" }}>
          BEING
        </text>
        <text x="100" y="124" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="800" fontSize="25" style={{ fontFamily: "var(--sans)" }}>
          BUILT
        </text>
      </g>
    </svg>
  );
}
