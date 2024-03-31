export type RoleType = "SUPERADMIN" | "ADMIN" | "MANDOR" | "MEMBER";

export type Menu = {
  icon: Component;
  text: string;
  roles: Array<RoleType>;
  to: string;
};
