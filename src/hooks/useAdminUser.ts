import { toast } from "@/components/ui/sonner";
import { CreateUserRequest, UserQueryParams } from "@/dataHelper/adminUser.dataHelper";
import { adminUserApi } from "@/services/api/adminUserApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useAdminUsers = (params: UserQueryParams) => {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => adminUserApi.getUsers(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminUserById = (userId: string) => {
  return useQuery({
    queryKey: ["admin-user", userId],
    queryFn: () => adminUserApi.getUserById(userId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useLockUser = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => adminUserApi.lockUser(userId),
    onSuccess: (response, userId) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(response.data);
        queryClient.invalidateQueries({ queryKey: ["admin-users"] });
        queryClient.invalidateQueries({ queryKey: ["admin-user", userId] });
        return;
      }
      toast.error(t("adminUsers.errorLockingUser"));
    },
    onError: () => {
      toast.error(t("adminUsers.errorLockingUser"));
    },
  });
};

export const useUnlockUser = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => adminUserApi.unlockUser(userId),
    onSuccess: (response, userId) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(response.data);
        queryClient.invalidateQueries({ queryKey: ["admin-users"] });
        queryClient.invalidateQueries({ queryKey: ["admin-user", userId] });
        return;
      }
      toast.error(t("adminUsers.errorUnlockingUser"));
    },
    onError: () => {
      toast.error(t("adminUsers.errorUnlockingUser"));
    },
  });
};

export const useCreateUser = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: CreateUserRequest) => adminUserApi.createUser(userData),
    onSuccess: (response) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminUsers.userCreatedSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-users"] });
        return;
      }
      toast.error(t("adminUsers.errorCreatingUser"));
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message);
    },
  });
};
