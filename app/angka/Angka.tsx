import { angkaFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Angka() {
  const form = useForm<z.infer<typeof angkaFormSchema>>({
    resolver: zodResolver(angkaFormSchema),
  });

  const [nameLength, setNameLength] = useState<number>(0);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [dialog1Open, setDialog1Open] = useState<boolean>(false);
  const [dialog2Open, setDialog2Open] = useState<boolean>(false);

  const shuffleInput = async (val: z.infer<typeof angkaFormSchema>) => {
    // const numberGenerated = randomNumberPicker()
    setGeneratedNames(numberGenerated);
    console.log(nameGenerated);
    setIsAnimating(true);
    setDialog1Open(true);

    // Set a timeout to reset the isAnimating state after 5 seconds
    setTimeout(() => {
      setIsAnimating(false);
      setDialog1Open(false);
      setDialog2Open(true);
    }, 1500); // 5000 milliseconds = 5 seconds
  };

  return <div>Angka</div>;
}
