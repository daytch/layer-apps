import { object, mixed, type InferType, number } from "yup";

export const MonthlyReportSchema = object({
  coop: mixed().test(
    "required",
    "Nama Kandang tidak boleh kosong",
    (value: any) => {
      return value > 0 && !!value?.toString()?.length;
    }
  ),
  file: mixed().test("required", "File tidak boleh kosong", (value?: any) => {
    const file = value as File;
    return !!file?.name?.length;
  }),
  periode: mixed().test(
    "required",
    "Periode tidak boleh kosong",
    (value?: any) => {
      return value && !!value?.year?.toString()?.length;
    }
  ),
});

export type MonthlyReportSchemaFormType = InferType<typeof MonthlyReportSchema>;
