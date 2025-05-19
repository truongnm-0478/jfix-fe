import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTERS } from "@/constant";
import type { AdminSpeakingQuestionCreate } from "@/dataHelper/adminSpeakingQuestions.dataHelper";
import { useCreateSpeakingQuestion } from "@/hooks/useAdminSpeakingQuestion";
import { speakingQuestionCreateFormSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import SpeakingQuestionForm from "./components/SpeakingQuestionForm";

const AdminSpeakingQuestionCreate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createSpeakingQuestionMutation = useCreateSpeakingQuestion();
  const formSchema = speakingQuestionCreateFormSchema(t);

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      japaneseText: "",
      vietnameseText: "",
      sampleAnswerJapanese: "",
      sampleAnswerVietnamese: "",
      audio: undefined,
      level: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    const speakingQuestionData: AdminSpeakingQuestionCreate = {
      japaneseText: data.japaneseText,
      vietnameseText: data.vietnameseText,
      sampleAnswerJapanese: data.sampleAnswerJapanese,
      sampleAnswerVietnamese: data.sampleAnswerVietnamese,
      audio: data.audio as File,
      level: data.level,
    };

    createSpeakingQuestionMutation.mutate(speakingQuestionData, {
      onSuccess: () => {
        navigate(ROUTERS.ADMIN_QUESTIONS);
      },
    });
  };

  return (
    <div className="px-4">
      <div className="flex mb-4">
        <Button
          variant="outline"
          className="text-primary bg-white border-primary font-semibold hover:bg-primary/10 hover:text-primary w-full sm:w-auto"
          onClick={() => navigate(ROUTERS.ADMIN_QUESTIONS)}
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-primary" />
          {t("common.back")}
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-primary">{t("adminSpeakingQuestion.createTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <FormProvider {...form}>
            <SpeakingQuestionForm 
              onSubmit={onSubmit} 
              isSubmitting={createSpeakingQuestionMutation.isPending} 
            />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSpeakingQuestionCreate; 