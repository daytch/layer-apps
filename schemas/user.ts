import { mixed, object, type InferType, string, array, boolean } from "yup";
export const UserFormSchema = object({
  name: string().required("Nama tidak boleh kosong."),
  isUpdateMode: boolean().default(false),
  password: string()
    .when(["isUpdateMode"], {
      is: (value: boolean) => !value,
      then: () => string().required("Password tidak boleh kosong."),
    })
    .when(["isUpdateMode"], {
      is: (value: boolean) => !!value,
      then: () => string().nullable(),
    }),
  phoneNumber: string().optional(),
  email: string()
    .email("Email tidak valid.")
    .required("Email tidak boleh kosong."),
  role: mixed().test("Required", "Role tidak boleh kosong.", (value: any) => {
    return value?.value !== undefined;
  }),
  coop: mixed()
    .when(["role"], {
      is: (roleValue: any) =>
        !!roleValue?.label &&
        !roleValue?.label?.toLowerCase()?.includes("admin") &&
        roleValue?.label === "Mandor",
      then: () =>
        array().test(
          "users",
          "Tidak boleh kosong",
          (value: any) => !!value.length
        ),
    })
    .when(["role"], {
      is: (roleValue: any) =>
        !!roleValue?.label &&
        !roleValue?.label?.toLowerCase()?.includes("admin") &&
        roleValue?.label === "Anak Kandang",
      then: () =>
        mixed().test(
          "anak-kandang-users",
          "Tidak boleh kosong",
          (coopValue: any) => {
            return !!coopValue?.label;
          }
        ),
    }),
});

export type UserFormValueType = InferType<typeof UserFormSchema>;
