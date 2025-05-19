import { toast } from "@/components/ui/sonner";
import { FreeTopicCreate, FreeTopicQueryParams } from "@/dataHelper/adminFreeTopic.dataHelper";
import { adminFreeTopicApi } from "@/services/api/adminFreeTopicApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useAdminFreeTopic = (params: FreeTopicQueryParams) => {
  return useQuery({
    queryKey: ["admin-free-topic", params],
    queryFn: () => adminFreeTopicApi.getFreeTopic(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminFreeTopicById = (freeTopicId: string) => {
  return useQuery({
    queryKey: ["admin-free-topic-detail", freeTopicId],
    queryFn: () => adminFreeTopicApi.getFreeTopicById(freeTopicId),
    staleTime: 1000 * 60 * 5,
    enabled: !!freeTopicId,
  });
};

export const useCreateFreeTopic = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (freeTopicData: FreeTopicCreate) => adminFreeTopicApi.createFreeTopic(freeTopicData),
    onSuccess: (response) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminFreeTopic.createdSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-free-topic"] });
        return;
      }
      toast.error(t("adminFreeTopic.errorCreating"));
    },
    onError: () => {
      toast.error(t("adminFreeTopic.errorCreating"));
    },
  });
};

export const useUpdateFreeTopic = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: FreeTopicCreate }) => 
      adminFreeTopicApi.updateFreeTopic(id, data),
    onSuccess: (response, variables) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminFreeTopic.updatedSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-free-topic"] });
        queryClient.invalidateQueries({ 
          queryKey: ["admin-free-topic-detail", variables.id] 
        });
        return;
      }
      toast.error(t("adminFreeTopic.errorUpdating"));
    },
    onError: () => {
      toast.error(t("adminFreeTopic.errorUpdating"));
    },
  });
};

export const useDeleteFreeTopic = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (freeTopicId: string) => adminFreeTopicApi.deleteFreeTopic(freeTopicId),
    onSuccess: (response) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminFreeTopic.deletedSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-free-topic"] });
        return;
      }
      toast.error(t("adminFreeTopic.errorDeleting"));
    },
    onError: () => {
      toast.error(t("adminFreeTopic.errorDeleting"));
    },
  });
}; 