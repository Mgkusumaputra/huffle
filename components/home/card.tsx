import Link from "next/link";

interface CardProps {
  title: string;
  href: string;
}

export default function Card({ title, href }: CardProps) {
  return (
    <Link
      href={href}
      className="rounded-lg border bg-card text-card-foreground shadow-sm px-3 py-6 w-full transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:bg-primary"
    >
      <h2 className="font-medium text-center transition-colors group-hover:text-primary-foreground">
        {title}
      </h2>
    </Link>
  );
}
