import { ReactNode } from "react";

interface CardResultProps {
  groupIndex: number;
  jumlahAnggota: number;
  children: ReactNode;
}

export default function CardResult({
  groupIndex,
  jumlahAnggota,
  children,
}: CardResultProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex flex-col items-start bg-primary rounded-t-lg w-ful  text-primary-foreground px-6 py-3">
        <h2 className="text-primary-foreground text-xl">
          Kelompok {groupIndex + 1}
        </h2>
        <p className="text-xs ">Jumlah anggota: {jumlahAnggota}</p>
      </div>
      <ul className="mt-3 px-6 pb-3">{children}</ul>
    </div>
  );
}
