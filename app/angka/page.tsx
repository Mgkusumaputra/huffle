"use client";

import FieldInput from "@/components/fieldInput";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { randomNumberPicker } from "@/helper/angkaPicker";
import { angkaFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Metadata } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaShuffle } from "react-icons/fa6";
import { z } from "zod";

export const metadata: Metadata = {
  title: "Angka",
  description:
    "Huffle Angka!",
};

export default function Angka() {
  const form = useForm<z.infer<typeof angkaFormSchema>>({
    resolver: zodResolver(angkaFormSchema),
  });

  const [generatedNumber, setGeneratedNumber] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [dialog1Open, setDialog1Open] = useState<boolean>(false);
  const [dialog2Open, setDialog2Open] = useState<boolean>(false);

  const shuffleInput = async (val: z.infer<typeof angkaFormSchema>) => {
    const numberGenerated = randomNumberPicker(
      Number(val.from),
      Number(val.to),
      Number(val.numberGenerated)
    );
    setGeneratedNumber(numberGenerated);
    setIsAnimating(true);
    setDialog1Open(true);

    // Set a timeout to reset the isAnimating state after 5 seconds
    setTimeout(() => {
      setIsAnimating(false);
      setDialog1Open(false);
      setDialog2Open(true);
    }, 1500); // 5000 milliseconds = 5 seconds
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold leading-normal">
        Huffle{" "}
        <span className="bg-primary px-2 text-primary-foreground rounded-lg">
          Angka
        </span>
      </h1>

      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(shuffleInput)}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-row items-center gap-3 mt-4">
              <FieldInput title="Dari">
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="1"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FieldInput>

              <FieldInput title="Sampai">
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="100"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FieldInput>
            </div>
            <FieldInput title="Jumlah Angka">
              <FormField
                control={form.control}
                name="numberGenerated"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="1"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FieldInput>

            <Button className="flex items-center gap-2 mt-5" type="submit">
              <FaShuffle /> Huffle
            </Button>
            <Button
              className="flex items-center gap-2 mt-2"
              type="button"
              variant="outline"
              onClick={() => {
                form.reset({
                  from: "",
                  to: "",
                  numberGenerated: "",
                });
                setGeneratedNumber([]);
              }}
            >
              Reset
            </Button>
          </form>
        </Form>
      </div>

      <AlertDialog open={dialog1Open} onOpenChange={setDialog1Open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              className={
                isAnimating ? "animate-shake text-center" : "text-center"
              }
            >
              Angka Yang Terpilih Adalah..
            </AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={dialog2Open} onOpenChange={setDialog2Open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {generatedNumber.join(", ")}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center items-center">
            <AlertDialogAction>Ok!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
