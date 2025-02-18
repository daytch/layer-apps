import {
  object,
  string,
  type InferType,
  mixed,
  number,
  ref as yupRef,
  bool,
} from "yup";

export const OBAT_SCHEMA = object({
  name: string().required("Nama tidak boleh kosong."),
  coop: mixed().test(
    "Required",
    "Kandang tidak boleh kosong.",
    (value: any) => !!value?.value
  ),
  SKU: string().required("SKU tidak boleh kosong."),
  uom: string().required("Satuan tidak boleh kosong."),
  price: number()
    .typeError("Harga tidak valid.")
    .required("Harga Persatuan tidak boleh kosong.")
    .positive("Harga Persatuan tidak valid."),
  quantity: number()
    .typeError("Jumlah barang tidak valid.")
    .required("Jumlah barang tidak boleh kosong."),
  isEatable: bool().notRequired().default(false),
});

export const USAGE_FOOD_MEDICINE_HISTORY = object({
  coop: mixed().test(
    "Required",
    "Kandang tidak boleh kosong.",
    (value: any) => !!value?.toString()?.length
  ),
  food: mixed().test("required", "Jenis obat tidak boleh kosong", (value) => {
    const foodValue = value as number;
    return !!foodValue?.toString().length;
  }),
  stockFood: number().min(-1, "Tidak boleh kosong."),
  total: number()
    .required("Tidak boleh kosong")
    .min(1, "Tidak boleh kosong")
    .max(yupRef("stockFood"), "Stok obat tidak mencukupi."),
  transDate: string().required("Tanggal tidak boleh kosong."),
});

export type FormValueObat = InferType<typeof OBAT_SCHEMA>;
export type FormValueUsageFoodMedicine = InferType<
  typeof USAGE_FOOD_MEDICINE_HISTORY
>;
