import { toast } from "@/components/ui/sonner";
import { GrammarCreate, GrammarQueryParams } from "@/dataHelper/adminGrammar.dataHelper";
import { adminGrammarApi } from "@/services/api/adminGrammarApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useAdminGrammar = (params: GrammarQueryParams) => {
  return useQuery({
    queryKey: ["admin-grammar", params],
    queryFn: () => adminGrammarApi.getGrammar(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminGrammarById = (grammarId: string) => {
  return useQuery({
    queryKey: ["admin-grammar-detail", grammarId],
    queryFn: () => adminGrammarApi.getGrammarById(grammarId),
    staleTime: 1000 * 60 * 5,
    enabled: !!grammarId,
  });
};

export const useCreateGrammar = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (grammarData: GrammarCreate) => adminGrammarApi.createGrammar(grammarData),
    onSuccess: (response) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminGrammar.createdSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-grammar"] });
        return;
      }
      toast.error(t("adminGrammar.errorCreating"));
    },
    onError: () => {
      toast.error(t("adminGrammar.errorCreating"));
    },
  });
};

export const useUpdateGrammar = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: GrammarCreate }) => 
      adminGrammarApi.updateGrammar(id, data),
    onSuccess: (response, variables) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminGrammar.updatedSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-grammar"] });
        queryClient.invalidateQueries({ 
          queryKey: ["admin-grammar-detail", variables.id] 
        });
        return;
      }
      toast.error(t("adminGrammar.errorUpdating"));
    },
    onError: () => {
      toast.error(t("adminGrammar.errorUpdating"));
    },
  });
};

export const useDeleteGrammar = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (grammarId: string) => adminGrammarApi.deleteGrammar(grammarId),
    onSuccess: (response) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminGrammar.deletedSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-grammar"] });
        return;
      }
      toast.error(t("adminGrammar.errorDeleting"));
    },
    onError: () => {
      toast.error(t("adminGrammar.errorDeleting"));
    },
  });
}; 