import { toast } from "@/components/ui/sonner";
import { AdminParagraphCreate, ParagraphQueryParams } from "@/dataHelper/adminParagraph.dataHelper";
import { adminParagraphApi } from "@/services/api/adminParagraphApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useAdminParagraph = (params: ParagraphQueryParams) => {
  return useQuery({
    queryKey: ["admin-paragraph", params],
    queryFn: () => adminParagraphApi.getParagraph(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminParagraphById = (paragraphId: string) => {
  return useQuery({
    queryKey: ["admin-paragraph-detail", paragraphId],
    queryFn: () => adminParagraphApi.getParagraphById(paragraphId),
    staleTime: 1000 * 60 * 5,
    enabled: !!paragraphId,
  });
};

export const useCreateParagraph = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (paragraphData: AdminParagraphCreate) => adminParagraphApi.createParagraph(paragraphData),
    onSuccess: (response) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminParagraph.createdSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-paragraph"] });
        return;
      }
      toast.error(t("adminParagraph.errorCreating"));
    },
    onError: () => {
      toast.error(t("adminParagraph.errorCreating"));
    },
  });
};

export const useUpdateParagraph = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: AdminParagraphCreate }) => 
      adminParagraphApi.updateParagraph(id, data),
    onSuccess: (response, variables) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminParagraph.updatedSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-paragraph"] });
        queryClient.invalidateQueries({ 
          queryKey: ["admin-paragraph-detail", variables.id] 
        });
        return;
      }
      toast.error(t("adminParagraph.errorUpdating"));
    },
    onError: () => {
      toast.error(t("adminParagraph.errorUpdating"));
    },
  });
};

export const useDeleteParagraph = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (paragraphId: string) => adminParagraphApi.deleteParagraph(paragraphId),
    onSuccess: (response) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminParagraph.deletedSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-paragraph"] });
        return;
      }
      toast.error(t("adminParagraph.errorDeleting"));
    },
    onError: () => {
      toast.error(t("adminParagraph.errorDeleting"));
    },
  });
}; 