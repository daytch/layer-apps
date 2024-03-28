type RoleType = "SUPERADMIN" | "ADMIN" | "MANDOR" | "USER";

export type Menu = {
  icon: Component;
  text: string;
  roles: Array<RoleType>;
  to: string;
};
