import { toast } from "@/components/ui/sonner";
import { AdminSentenceCreate, SentenceQueryParams } from "@/dataHelper/adminSentence.dataHelper";
import { adminSentenceApi } from "@/services/api/adminSentenceApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useAdminSentence = (params: SentenceQueryParams) => {
  return useQuery({
    queryKey: ["admin-sentence", params],
    queryFn: () => adminSentenceApi.getSentence(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminSentenceById = (sentenceId: string) => {
  return useQuery({
    queryKey: ["admin-sentence-detail", sentenceId],
    queryFn: () => adminSentenceApi.getSentenceById(sentenceId),
    staleTime: 1000 * 60 * 5,
    enabled: !!sentenceId,
  });
};

export const useCreateSentence = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (sentenceData: AdminSentenceCreate) => adminSentenceApi.createSentence(sentenceData),
    onSuccess: (response) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminSentence.createdSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-sentence"] });
        return;
      }
      toast.error(t("adminSentence.errorCreating"));
    },
    onError: () => {
      toast.error(t("adminSentence.errorCreating"));
    },
  });
};

export const useUpdateSentence = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: AdminSentenceCreate }) => 
      adminSentenceApi.updateSentence(id, data),
    onSuccess: (response, variables) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminSentence.updatedSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-sentence"] });
        queryClient.invalidateQueries({ 
          queryKey: ["admin-sentence-detail", variables.id] 
        });
        return;
      }
      toast.error(t("adminSentence.errorUpdating"));
    },
    onError: () => {
      toast.error(t("adminSentence.errorUpdating"));
    },
  });
};

export const useDeleteSentence = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (sentenceId: string) => adminSentenceApi.deleteSentence(sentenceId),
    onSuccess: (response) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminSentence.deletedSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-sentence"] });
        return;
      }
      toast.error(t("adminSentence.errorDeleting"));
    },
    onError: () => {
      toast.error(t("adminSentence.errorDeleting"));
    },
  });
}; 