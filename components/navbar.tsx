import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { FaShuffle } from "react-icons/fa6";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between py-2">
        <Link
          href="/"
          className="flex items-center gap-1 text-2xl font-semibold"
        >
          <FaShuffle className="text-primary" /> Huffle
        </Link>
        <Link href="https://github.com/Mgkusumaputra/huffle">
          <FaGithub className="text-3xl text-muted-foreground transition-colors hover:text-secondary-foreground" />
        </Link>
      </nav>
      <Separator className="my-2" />
    </>
  );
}
