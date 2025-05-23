export type UserRegister = {
  username: string;
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type UserData = {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  name: string;
  avatar?: string;
};

export type ChangePassword = {
  email: string;
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
};

export type ChangePasswordByToken = {
  token: string;
  password: string;
  password_confirmation: string;
};

export type LogoutResponse = {
  status: string;
  message: string;
  data: null;
};

export interface User {
  username: string | null;
  role: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  id: number | string | null;
}

export type UserLogin = {
  username: string;
  password: string;
};