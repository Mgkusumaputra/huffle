import { string, z } from "zod";

export const kelompokFormSchema = z
  .object({
    name: z.string({ required_error: "Nama wajib di isi" }),
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
