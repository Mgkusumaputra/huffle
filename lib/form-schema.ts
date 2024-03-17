import { string, z } from "zod";

export const kelompokFormSchema = z.object({
  name: z.string({ required_error: "Nama wajib di isi" }),
  numberOfGroup: z.coerce
    .number({
      invalid_type_error: "Jumlah kelompok harus angka",
    })
    .optional(),
  maxPeoplePerGroup: z.coerce
    .number({
      invalid_type_error: "Jumlah orang harus angka",
    })
    .optional(),
  distributionMethod: z.string().default("Default"),
  representative: z.boolean().default(false).optional(),
});
//   .refine(
//     (data) => {
//       data.numberOfGroup !== undefined && data.maxPeoplePerGroup !== undefined;
//     },
//     {
//       message:
//         "Tidak dapat menentukan Jumlah Kelompok dan Jumlah Orang/Kelompok secara bersamaan.",
//       path: ["numberOfGroup"],
//     }
//   );
