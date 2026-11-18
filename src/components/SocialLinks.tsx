import { site } from "@/lib/site";

/** Instagram and Facebook icon buttons (44px tap targets), used in the footer and on Find us. */
export default function SocialLinks() {
  return (
    <ul className="social">
      <li>
        <a href={site.instagramUrl} target="_blank" rel="noopener" aria-label="Zhilly on Instagram">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </li>
      <li>
        <a href={site.facebookUrl} target="_blank" rel="noopener" aria-label="Zhilly on Facebook">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false" fill="currentColor">
            <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3Z" />
          </svg>
        </a>
      </li>
    </ul>
  );
}
