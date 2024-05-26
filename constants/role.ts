type Role = {
  id: number;
  name: string;
  createdAt: string;
  updateAt: string;
};

export const ROLES: Array<Role> = [
  {
    id: 1,
    name: "Superadmin",
    createdAt: "2024-04-06T20:49:40.232Z",
    updateAt: "2024-04-06T20:49:40.232Z",
  },
  {
    id: 2,
    name: "Admin",
    createdAt: "2024-04-06T20:49:40.240Z",
    updateAt: "2024-04-06T20:49:40.240Z",
  },
  {
    id: 3,
    name: "Mandor",
    createdAt: "2024-04-06T20:49:40.244Z",
    updateAt: "2024-04-06T20:49:40.244Z",
  },
  {
    id: 4,
    name: "Anak Kandang",
    createdAt: "2024-04-06T20:49:40.246Z",
    updateAt: "2024-04-06T20:49:40.246Z",
  },
];

export const ROLES_OPTIONS_FORM: Array<{ label: string; value: number }> =
  ROLES.map((role) => ({
    value: role.id,
    label: role.name,
  }));
