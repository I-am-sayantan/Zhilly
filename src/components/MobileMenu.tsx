"use client";

import { useRef, type ReactNode } from "react";

/** The phone menu: a plain <details>, closed again once a link inside it is chosen. */
export default function MobileMenu({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details
      className="menu"
      ref={ref}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) ref.current?.removeAttribute("open");
      }}
    >
      <summary><span className="ico" aria-hidden="true"></span><span className="vh">Menu</span></summary>
      {children}
    </details>
  );
}
