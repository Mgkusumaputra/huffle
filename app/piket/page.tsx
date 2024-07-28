"use client";

import FieldInput from "@/components/fieldInput";
import CardResult from "@/components/piket/cardResult";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { days } from "@/constant";
import { Person } from "@/helper/groupPicker";
import { DayAssignment, randomPicketPicker } from "@/helper/picketPicker";
import { piketFormSchema } from "@/lib/form-schema";
import { Capitalize, groupPickerString } from "@/lib/utils";
import { Hari } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToPng } from "@hugocxl/react-to-image";
import { BadgeCheck, Download } from "lucide-react";
import { Metadata } from "next";
import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { FaShuffle } from "react-icons/fa6";
import { z } from "zod";

// export const metadata: Metadata = {
//   title: "Piket",
//   description:
//     "Huffle Kelompok!",
// };

export default function Piket() {
  const form = useForm<z.infer<typeof piketFormSchema>>({
    resolver: zodResolver(piketFormSchema),
    defaultValues: {
      hari: ["senin", "selasa", "rabu", "kamis", "jumat"],
    },
  });

  const [nameLength, setNameLength] = useState<number>(0);
  const [generatedGroups, setGeneratedGroups] = useState<[string, Person[]][]>(
    []
  );

  const shuffleInput = async (val: z.infer<typeof piketFormSchema>) => {
    const groupPickerArray = groupPickerString(val.name);

    const selectedDays = val.hari;

    const generatedGroups = randomPicketPicker(selectedDays, groupPickerArray);
    setGeneratedGroups(generatedGroups);
  };

  const groupsGenerated = generatedGroups.length > 0;

  // Image Download Handler
  const [{ isSuccess }, convert] = useToPng<HTMLDivElement>({
    selector: "#generatedGroup",
    backgroundColor: "#FFFFFF",
    onError: (error) => console.log("Error:", error),
    onSuccess: (data) => {
      const link = document.createElement("a");
      link.download = "daftar-piket.png";
      link.href = data;
      link.click();
    },
  });

  return (
    <>
      <h1 className="text-4xl text-center font-bold leading-normal">
        Huffle{" "}
        <span className="bg-primary px-2 text-primary-foreground rounded-lg">
          Piket
        </span>
      </h1>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(shuffleInput)}
            className="flex flex-col gap-3"
          >
            {/* Input Nama */}
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

            {/* Checkbox Hari */}
            <FieldInput title="Pilih Hari">
              <FormField
                control={form.control}
                name="hari"
                render={() => (
                  <FormItem>
                    {days.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="hari"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  className="rounded"
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {Capitalize(item.label)}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
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
                });
                setGeneratedGroups([]);
                setNameLength(0);
              }}
            >
              Reset
            </Button>
          </form>
        </Form>
      </div>

      {groupsGenerated && (
        <div className="flex flex-col gap-4">
          <div
            id="generatedGroup"
            className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-5 text-primary-foreground py-7"
          >
            {generatedGroups.map((group, index) => (
              <CardResult
                key={index}
                groupName={Capitalize(group[0])}
                jumlahAnggota={group[1].length}
              >
                {group[1].map((person: Person, personIndex: number) => (
                  <li className={`flex gap-2 font-normal`} key={personIndex}>
                    <p>{person.name}</p>
                  </li>
                ))}
              </CardResult>
            ))}
          </div>
          {isSuccess && (
            <Button disabled>
              <BadgeCheck className="mr-2 h-4 w-4" />
              Kelompok berhasil disimpan
            </Button>
          )}
          {!isSuccess && (
            <Button onClick={convert}>
              <Download className="mr-2 h-4 w-4" />
              Simpan daftar piket
            </Button>
          )}
        </div>
      )}
    </>
  );
}
