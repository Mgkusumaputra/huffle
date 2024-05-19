"use client";

import FieldInput from "@/components/fieldInput";
import CardResult from "@/components/kelompok/cardResult";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Person, randomGroupPicker } from "@/helper/groupPicker";
import { kelompokFormSchema } from "@/lib/form-schema";
import { groupPickerString } from "@/lib/utils";
import { GroupPickerDistributionMethod, RandomPickerOptions } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Metadata } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { UseFormReturn, useForm, useFormContext } from "react-hook-form";
import { FaShuffle } from "react-icons/fa6";
import { z } from "zod";

// export const metadata: Metadata = {
//   title: "Kelompok",
//   description: "Huffle Kelompok!",
// };

interface inputSchema {
  name?: string;
  numberOfGroup?: number;
  maxPeoplePerGroup?: number;
  distributionMethod?: string;
  representative?: boolean;
}

export default function Kelompok() {
  const form = useForm<z.infer<typeof kelompokFormSchema>>({
    resolver: zodResolver(kelompokFormSchema),
  });

  const [generatedGroups, setGeneratedGroups] = useState<Person[][]>([]);
  const [nameLength, setNameLength] = useState<number>(0);

  const shuffleInput = async (val: z.infer<typeof kelompokFormSchema>) => {
    const groupPickerArray = groupPickerString(val.name);
    let options: RandomPickerOptions = {
      numberOfGroups: Number(val.numberOfGroup),
      maxMembersPerGroup: Number(val.maxPeoplePerGroup),
      pickRepresentative: val.representative,
    };
    const generatedGroups = randomGroupPicker(groupPickerArray, options);
    setGeneratedGroups(generatedGroups);
  };

  const useReset = (form?: UseFormReturn<any>) => {
    const formctx = useFormContext();
    const { getValues, setValue } = form ?? formctx;
    const fields = Object.keys(getValues());
    fields.forEach((field) => setValue(field, ""));
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold leading-normal">
        Huffle{" "}
        <span className="bg-primary px-2 text-primary-foreground rounded-lg">
          Kelompok
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

            <div className="flex flex-row items-center gap-3">
              {/* Input Jumlah Kelompok */}
              <FieldInput title="Jumlah Kelompok">
                <FormField
                  control={form.control}
                  name="numberOfGroup"
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
                      <FormDescription>Isi salah satu</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FieldInput>

              <p>Atau</p>

              {/* Input Jumlah Orang Per Kelompok */}
              <FieldInput title="Jumlah Orang/Kelompok">
                <FormField
                  control={form.control}
                  name="maxPeoplePerGroup"
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
                      <FormDescription>&#10240;</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FieldInput>
            </div>

            <div className="flex flex-row justify-center items-center w-full max-sm:flex-col max-sm:items-start max-sm:gap-3">
              {/* Checkbox Representative */}
              <FormField
                control={form.control}
                name="representative"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                    <FormLabel className="font-semibold leading-none">
                      Pilih ketua kelompok?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        className="rounded"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

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
                  maxPeoplePerGroup: "",
                  numberOfGroup: "",
                  representative: false,
                });
                setNameLength(0);
                setGeneratedGroups([]);
              }}
            >
              Reset
            </Button>
          </form>
        </Form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-5 text-primary-foreground mt-7">
        {generatedGroups.map((group, index) => (
          <CardResult
            key={index}
            groupIndex={index}
            jumlahAnggota={group.length}
          >
            {group.map((person, index) => (
              <li
                className={`flex gap-2 ${
                  person.representative ? "font-semibold" : "font-normal"
                }`}
                key={index}
              >
                <p>{person.name}</p>
                {person.representative && (
                  <Badge variant="default">Ketua Kelompok</Badge>
                )}
              </li>
            ))}
          </CardResult>
        ))}
      </div>
    </>
  );
}
