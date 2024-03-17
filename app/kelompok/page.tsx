"use client";

import FieldInput from "@/components/fieldInput";
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
import { randomGroupPicker } from "@/helper/groupPicker";
import { kelompokFormSchema } from "@/lib/form-schema";
import { groupPickerString } from "@/lib/utils";
import { GroupPickerDistributionMethod, RandomPickerOptions } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Kelompok() {
  const form = useForm<z.infer<typeof kelompokFormSchema>>({
    resolver: zodResolver(kelompokFormSchema),
  });

  const shuffleInput = async (val: z.infer<typeof kelompokFormSchema>) => {
    const genderPicker = groupPickerString(val.name);
    let options: RandomPickerOptions = {
      numberOfGroups: val.numberOfGroup,
      maxMembersPerGroup: val.maxPeoplePerGroup,
      pickRepresentative: val.representative,
      distributionMethod:
        val.distributionMethod as GroupPickerDistributionMethod,
    };
    const generatedGroups = randomGroupPicker(genderPicker, options);
    console.log(genderPicker);
    console.log(generatedGroups);
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
                      />
                    </FormControl>
                    <FormMessage />
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

            <div className="flex flex-row justify-around items-center w-full max-sm:flex-col max-sm:items-start max-sm:gap-3">
              {/* Distribution Method*/}
              <FormField
                control={form.control}
                name="distributionMethod"
                render={({ field }) => (
                  <FormItem className="space-x-3">
                    <FormLabel className="font-semibold">
                      Acak Berdasarkan
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue="Default"
                        className="flex flex-row space-x-1 max-sm:space-x-0 max-sm:flex-col max-sm:space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Default" />
                          </FormControl>
                          <FormLabel className="font-normal">Default</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Gender" />
                          </FormControl>
                          <FormLabel className="font-normal">Gender</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FieldInput title="Acak berdasarkan">
            </FieldInput> */}

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

            <Button className="mt-5" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
