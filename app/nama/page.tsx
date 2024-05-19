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
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { randomNamePicker } from "@/helper/namePicker";
import { nameFormSchema } from "@/lib/form-schema";
import { SplitString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Metadata } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaShuffle } from "react-icons/fa6";
import { z } from "zod";

export const metadata: Metadata = {
  title: "Nama",
  description:
    "Huffle Nama!",
};

export default function Name() {
  const form = useForm<z.infer<typeof nameFormSchema>>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: {
      numberNameGenerated: "1",
    },
  });

  const [nameLength, setNameLength] = useState<number>(0);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [dialog1Open, setDialog1Open] = useState<boolean>(false);
  const [dialog2Open, setDialog2Open] = useState<boolean>(false);

  const shuffleInput = async (val: z.infer<typeof nameFormSchema>) => {
    const namePickerArray = SplitString(val.name);

    const nameGenerated = randomNamePicker(
      namePickerArray,
      Number(val.numberNameGenerated)
    );
    setGeneratedNames(nameGenerated);
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
          Nama
        </span>
      </h1>

      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(shuffleInput)}
            className="flex flex-col gap-3"
          >
            {/* Input Name */}
            <FieldInput
              title="Nama"
              tooltip="Tambahkan nama selanjutnya pada baris baru"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        className="w-full"
                        placeholder="Masukan daftar nama di sini"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          const list: string[] = e.target.value
                            .split(/\r?\n/)
                            .filter(String);
                          setNameLength(list.length);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Kamu memasukkan {nameLength} nama
                    </FormDescription>
                  </FormItem>
                )}
              />
            </FieldInput>

            {/* Input Number of Generated Name */}
            <FieldInput title="Jumlah Nama">
              <FormField
                control={form.control}
                name="numberNameGenerated"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
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
                  name: "",
                  numberNameGenerated: "1",
                });
                setNameLength(0);
                setGeneratedNames([]);
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
              Nama Yang Terpilih Adalah..
            </AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={dialog2Open} onOpenChange={setDialog2Open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {/* {generatedNames.map((name, index) => (
                <span key={index}>{name}</span>
              ))} */}
              {generatedNames.join(", ")}
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
