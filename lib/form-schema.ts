import { string, z } from "zod";

export const kelompokFormSchema = z
  .object({
    name: z.string().min(1, { message: "Nama wajib di isi" }),
    numberOfGroup: z.string().optional(),
    maxPeoplePerGroup: z.string().optional(),
    representative: z.boolean().default(false).optional(),
  })
  .refine(
    (data) =>
      (data.numberOfGroup === null && data.maxPeoplePerGroup === null) ||
      data.numberOfGroup === null ||
      data.maxPeoplePerGroup !== null ||
      data.maxPeoplePerGroup === null ||
      data.numberOfGroup !== null ||
      data.maxPeoplePerGroup ^ data.numberOfGroup,
    {
      message:
        "Tidak dapat menentukan Jumlah Kelompok dan Jumlah Orang/Kelompok secara bersamaan.",
      path: ["numberOfGroup"],
    }
  );

export const piketFormSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib di isi" }),
  hari: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Pilih minimal 2 hari",
  }),
});

export const nameFormSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib di isi" }),
  numberNameGenerated: z
    .string()
    .min(1, { message: "Jumlah nama wajib di isi" }),
});
