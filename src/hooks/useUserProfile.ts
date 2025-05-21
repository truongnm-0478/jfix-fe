import { UpdateProfile } from "@/dataHelper/user.dataHelper";
import { userApi } from "@/services/api/userApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => userApi.getUserDetail(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfile) => userApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: { oldPassword: string, newPassword: string, confirmPassword: string }) => userApi.changePassword(data),
  });
};
