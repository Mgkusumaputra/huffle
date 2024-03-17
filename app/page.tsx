import Card from "@/components/home/card";
import { Badge } from "@/components/ui/badge";
import { CARD_FEATURES } from "@/constant";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-4xl text-center font-bold leading-normal">
          Ngapain pusing milih? mending{" "}
          <span className="bg-primary px-2 text-primary-foreground rounded-lg">
            Huffle
          </span>{" "}
          aja!
        </h1>
        <p className="text-muted-foreground text-center">
          Lebih gampang atur kelompok, buat piket, pilih nama dan angka acak
          bareng Huffle
        </p>
      </div>
      <div className="flex flex-col items-center gap-3 mt-6">
        {CARD_FEATURES.map((data, index) => (
          <Card key={index} title={data.title} href={data.href} />
        ))}
        <Badge className="w-max mt-4">
          <Link href="https://tally.so/r/w5zZpM">Kirim saran buat huffle!</Link>
        </Badge>
      </div>
    </>
  );
}

