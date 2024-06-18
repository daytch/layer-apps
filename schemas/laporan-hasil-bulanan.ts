import { object, mixed, type InferType, number } from "yup";

export const MonthlyReportSchema = object({
  periode: mixed().test("Required", "Periode tidak boleh kosong", (value) => {
    const periodeValue = value as any;
    return !!periodeValue?.month?.toString()?.length;
  }),
  coop: mixed().test("Required", "Kandang tidak boleh kosong", (value) => {
    const coopValue = value as any;
    return !!coopValue?.value?.toString()?.length;
  }),
  total: number()
    .min(0, "Total tidak boleh kosong.")
    .typeError("Total tidak valid."),
});

export type MonthlyReportSchemaFormType = InferType<typeof MonthlyReportSchema>;
