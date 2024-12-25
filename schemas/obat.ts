import { object, string, type InferType, mixed, number, ref } from "yup";

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
    .required("Jumlah barang tidak boleh kosong.")
    .max(ref("total"), "Tidak boleh lebih dari total"),
  total: number()
    .min(0, "Total Stok tidak boleh kosong.")
    .typeError("Total Stok tidak valid.")
    .required("Total Stok tidak boleh kosong."),
});

export type FormValueObat = InferType<typeof OBAT_SCHEMA>;
