import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTERS } from "@/constant";
import type { AdminSpeakingQuestionCreate } from "@/dataHelper/adminSpeakingQuestions.dataHelper";
import { useAdminSpeakingQuestionById, useUpdateSpeakingQuestion } from "@/hooks/useAdminSpeakingQuestion";
import { speakingQuestionUpdateFormSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import SpeakingQuestionForm from "./components/SpeakingQuestionForm";

const AdminSpeakingQuestionUpdate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: speakingQuestionDetail, isLoading } = useAdminSpeakingQuestionById(id || "");
  const speakingQuestion = speakingQuestionDetail?.data;
  const updateSpeakingQuestionMutation = useUpdateSpeakingQuestion();
  const originalAudioRef = useRef<string | null>(null);

  const customSchema = speakingQuestionUpdateFormSchema(t).refine((data) => {
    if (originalAudioRef.current) {
      return !!data.audioUrl || (data.audioFile instanceof File);
    }
    return true;
  }, {
    message: t("adminSpeakingQuestion.validationRequired", { field: t("adminSpeakingQuestion.audio") }),
    path: ["audio"],
  });

  type FormValues = z.infer<typeof customSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(customSchema),
    defaultValues: {
      japaneseText: "",
      vietnameseText: "",
      sampleAnswerJapanese: "",
      sampleAnswerVietnamese: "",
      audioUrl: null,
      audioFile: null,
      level: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (speakingQuestion) {
      originalAudioRef.current = speakingQuestion.audioUrl || null;
            
      form.reset({
        japaneseText: speakingQuestion.japaneseText || "",
        vietnameseText: speakingQuestion.vietnameseText || "",
        sampleAnswerJapanese: speakingQuestion.sampleAnswerJapanese || "",
        sampleAnswerVietnamese: speakingQuestion.sampleAnswerVietnamese || "",
        audioUrl: speakingQuestion.audioUrl || null,
        audioFile: null,
        level: speakingQuestion.level || "",
      });
      
      form.trigger();
    }
  }, [speakingQuestion, form]);

  const onSubmit = async (data: FormValues) => {
    if (!id) return;

    const needsExplicitAudioReset = originalAudioRef.current && 
                                   (!data.audioUrl || data.audioUrl === "") && 
                                   !(data.audioFile instanceof File);

    const speakingQuestionData: AdminSpeakingQuestionCreate = {
      japaneseText: data.japaneseText,
      vietnameseText: data.vietnameseText,
      sampleAnswerJapanese: data.sampleAnswerJapanese,
      sampleAnswerVietnamese: data.sampleAnswerVietnamese,
      level: data.level,
      audio: data.audioFile as File,
    };
    
    if (data.audioFile instanceof File) {
      speakingQuestionData.audio = data.audioFile;
      // @ts-ignore
      delete speakingQuestionData.audioUrl;
    } 
    else if (needsExplicitAudioReset) {
      // @ts-ignore
      speakingQuestionData.audioUrl = null;
      // @ts-ignore
      delete speakingQuestionData.audio;
    }
    else if (data.audioUrl === originalAudioRef.current) {
      // @ts-ignore
      delete speakingQuestionData.audio;
      // @ts-ignore
      delete speakingQuestionData.audioUrl;
    }
    
    if (!(data.audioFile instanceof File)) {
      // @ts-ignore
      delete speakingQuestionData.audioFile;
    }

    updateSpeakingQuestionMutation.mutate(
      { id, data: speakingQuestionData },
      {
        onSuccess: () => {
          navigate(ROUTERS.ADMIN_QUESTIONS_DETAIL.replace(":id", id || ""));
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="px-4">
        <div className="flex mb-4">
          <Skeleton className="h-10 w-24" />
        </div>
        <Card>
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <Skeleton className="h-8 w-64" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="flex justify-end pt-4">
                <Skeleton className="h-10 w-full sm:w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="flex mb-4">
        <Button
          variant="outline"
          className="text-primary bg-white border-primary font-semibold hover:bg-primary/10 hover:text-primary w-full sm:w-auto"
          onClick={() => navigate(ROUTERS.ADMIN_QUESTIONS_DETAIL.replace(":id", id || ""))}
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-primary" />
          {t("common.back")}
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-primary">{t("adminSpeakingQuestion.updateTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <FormProvider {...form}>
            <SpeakingQuestionForm 
              onSubmit={onSubmit} 
              isSubmitting={updateSpeakingQuestionMutation.isPending} 
              hasExistingAudio={!!originalAudioRef.current}
            />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSpeakingQuestionUpdate; 