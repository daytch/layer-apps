import {
  bool,
  number,
  object,
  string,
  ref as yupRef,
  type InferType,
} from "yup";
const Schema = object({
  isReduceStock: bool(),
  stock: number().min(0),
  qty: number()
    .typeError("Jumlah tidak valid")
    .when("isReduceStock", {
      is: true,
      then: () =>
        number()
          .min(1, "Jumlah tidak valid.")
          .max(yupRef("stock"), "Jumlah tidak boleh melebihi stok."),
    }),
  feedId: number()
    .notRequired()
    .when("isReduceStock", {
      is: true,
      then: () => number().min(1, "Jenis pakan tidak boleh kosong."),
    }),
});

export type FormType = InferType<typeof Schema>;
export { Schema };
