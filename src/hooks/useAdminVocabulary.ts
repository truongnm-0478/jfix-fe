import { toast } from "@/components/ui/sonner";
import { VocabularyCreate, VocabularyQueryParams } from "@/dataHelper/adminVocubalary.dataHelper";
import { adminVocabularyApi } from "@/services/api/adminVocabularyApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useAdminVocabulary = (params: VocabularyQueryParams) => {
  return useQuery({
    queryKey: ["admin-vocabulary", params],
    queryFn: () => adminVocabularyApi.getVocabulary(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminVocabularyById = (vocabularyId: string) => {
  return useQuery({
    queryKey: ["admin-vocabulary-detail", vocabularyId],
    queryFn: () => adminVocabularyApi.getVocabularyById(vocabularyId),
    staleTime: 1000 * 60 * 5,
    enabled: !!vocabularyId,
  });
};

export const useCreateVocabulary = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (vocabularyData: VocabularyCreate) => adminVocabularyApi.createVocabulary(vocabularyData),
    onSuccess: (response) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminVocabulary.createdSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-vocabulary"] });
        return;
      }
      toast.error(t("adminVocabulary.errorCreating"));
    },
    onError: () => {
      toast.error(t("adminVocabulary.errorCreating"));
    },
  });
};

export const useUpdateVocabulary = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: VocabularyCreate }) => 
      adminVocabularyApi.updateVocabulary(id, data),
    onSuccess: (response, variables) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminVocabulary.updatedSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-vocabulary"] });
        queryClient.invalidateQueries({ 
          queryKey: ["admin-vocabulary-detail", variables.id] 
        });
        return;
      }
      toast.error(t("adminVocabulary.errorUpdating"));
    },
    onError: () => {
      toast.error(t("adminVocabulary.errorUpdating"));
    },
  });
};

export const useDeleteVocabulary = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (vocabularyId: string) => adminVocabularyApi.deleteVocabulary(vocabularyId),
    onSuccess: (response) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminVocabulary.deletedSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-vocabulary"] });
        return;
      }
      toast.error(t("adminVocabulary.errorDeleting"));
    },
    onError: () => {
      toast.error(t("adminVocabulary.errorDeleting"));
    },
  });
}; 