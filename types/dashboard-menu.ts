export type RoleType = "Superadmin" | "Admin" | "Mandor" | "Anak Kandang";

export type Menu = {
  icon: Component;
  text: string;
  roles: Array<RoleType>;
  to: string;
};
