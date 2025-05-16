export interface AdminUser {
  id: number;
  username: string;
  role: string;
  name: string;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  createDate: string;
  createBy: string;
  updateDate: string | null;
  updateBy: string | null;
  deleteDate: string | null;
  deleteBy: string | null;
  deleted: boolean;
}

export interface AdminUserResponse {
  data: AdminUser[];
  totalRecords: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
}

export interface UserQueryParams {
  page?: number;
  size?: number;
  role?: string;
  username?: string;
  email?: string;
  name?: string;
  phone?: string;
  isDeleted?: boolean;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  deleted?: boolean;
}