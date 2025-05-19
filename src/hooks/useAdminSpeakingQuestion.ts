import { toast } from "@/components/ui/sonner";
import { AdminSpeakingQuestionCreate, SpeakingQuestionQueryParams } from "@/dataHelper/adminSpeakingQuestions.dataHelper";
import { adminSpeakingQuestionApi } from "@/services/api/adminSpeakingQuestionApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useAdminSpeakingQuestion = (params: SpeakingQuestionQueryParams) => {
  return useQuery({
    queryKey: ["admin-speaking-question", params],
    queryFn: () => adminSpeakingQuestionApi.getSpeakingQuestion(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminSpeakingQuestionById = (speakingQuestionId: string) => {
  return useQuery({
    queryKey: ["admin-speaking-question-detail", speakingQuestionId],
    queryFn: () => adminSpeakingQuestionApi.getSpeakingQuestionById(speakingQuestionId),
    staleTime: 1000 * 60 * 5,
    enabled: !!speakingQuestionId,
  });
};

export const useCreateSpeakingQuestion = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (speakingQuestionData: AdminSpeakingQuestionCreate) => adminSpeakingQuestionApi.createSpeakingQuestion(speakingQuestionData),
    onSuccess: (response) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminSpeakingQuestion.createdSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-speaking-question"] });
        return;
      }
      toast.error(t("adminSpeakingQuestion.errorCreating"));
    },
    onError: () => {
      toast.error(t("adminSpeakingQuestion.errorCreating"));
    },
  });
};

export const useUpdateSpeakingQuestion = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: AdminSpeakingQuestionCreate }) => 
      adminSpeakingQuestionApi.updateSpeakingQuestion(id, data),
    onSuccess: (response, variables) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminSpeakingQuestion.updatedSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-speaking-question"] });
        queryClient.invalidateQueries({ 
          queryKey: ["admin-speaking-question-detail", variables.id] 
        });
        return;
      }
      toast.error(t("adminSpeakingQuestion.errorUpdating"));
    },
    onError: () => {
      toast.error(t("adminSpeakingQuestion.errorUpdating"));
    },
  });
};

export const useDeleteSpeakingQuestion = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (speakingQuestionId: string) => adminSpeakingQuestionApi.deleteSpeakingQuestion(speakingQuestionId),
    onSuccess: (response) => {
      if (response.status === 200 && response.message === "Success") {
        toast.success(t("adminSpeakingQuestion.deletedSuccess"));
        queryClient.invalidateQueries({ queryKey: ["admin-speaking-question"] });
        return;
      }
      toast.error(t("adminSpeakingQuestion.errorDeleting"));
    },
    onError: () => {
      toast.error(t("adminSpeakingQuestion.errorDeleting"));
    },
  });
}; 