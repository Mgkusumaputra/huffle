import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="">
      <p className="font-sm text-center text-muted-foreground">
        Created with{" "}
        <Link
          className="text-primary font-semibold"
          target="_blank"
          href="https://nextjs.org/"
        >
          Next.js
        </Link>
        ,{" "}
        <Link
          className="text-primary font-semibold"
          target="_blank"
          href="https://tailwindcss.com/"
        >
          Tailwind
        </Link>
        ,{" "}
        <Link
          className="text-primary font-semibold"
          target="_blank"
          href="https://ui.shadcn.com/"
        >
          Shadcn/ui
        </Link>
        , and 💖 by{" "}
        <Link
          className="text-primary font-semibold"
          target="_blank"
          href="https://mgkusumaputra.me/"
        >
          Mgkusumaputra
        </Link>
      </p>
    </footer>
  );
}
