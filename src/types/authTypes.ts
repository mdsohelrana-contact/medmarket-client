export const user_role = {
  customer: "customer",
  admin: "admin",
} as const;

export type TUserRole = keyof typeof user_role;

export interface IRegisterUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  profileImg: any;
}

export interface ILoginInput {
  email?: string;
  phone?: string;
  password: string;
}
