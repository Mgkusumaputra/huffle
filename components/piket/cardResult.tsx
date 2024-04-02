import { ReactNode } from "react";

interface CardResultProps {
  groupName: string;
  jumlahAnggota: number;
  children: ReactNode;
}

export default function CardResult({
  groupName,
  jumlahAnggota,
  children,
}: CardResultProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex flex-col items-start bg-primary rounded-t-lg w-ful  text-primary-foreground px-6 py-3">
        <h2 className="text-primary-foreground text-xl">
          Kelompok {groupName}
        </h2>
        <p className="text-xs ">Jumlah anggota: {jumlahAnggota}</p>
      </div>
      <ul className="mt-3 px-6 pb-3">{children}</ul>
    </div>
  );
}
