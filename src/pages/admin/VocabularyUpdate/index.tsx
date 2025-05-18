import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTERS } from "@/constant";
import { VocabularyCreate } from "@/dataHelper/adminVocubalary.dataHelper";
import { useAdminVocabularyById, useUpdateVocabulary } from "@/hooks/useAdminVocabulary";
import { vocabularyUpdateFormSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import VocabularyForm from "./components/VocabularyForm";

const AdminVocabularyUpdate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: vocabularyDetail, isLoading } = useAdminVocabularyById(id || "");
  const vocabulary = vocabularyDetail?.data;
  const updateVocabularyMutation = useUpdateVocabulary();
  const originalAudioRef = useRef<string | null>(null);

  const customSchema = vocabularyUpdateFormSchema(t).refine((data) => {
    if (originalAudioRef.current) {
      return !!data.audio || (data.audioFile instanceof File);
    }
    return true;
  }, {
    message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.audio") }),
    path: ["audio"],
  });

  type FormValues = z.infer<typeof customSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(customSchema),
    defaultValues: {
      word: "",
      reading: "",
      meaning: "",
      exampleWithoutReading: "",
      exampleMeaning: "",
      audio: null,
      audioFile: null,
      level: "",
      chapter: "",
      section: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (vocabulary) {
      originalAudioRef.current = vocabulary.audio || null;
            
      form.reset({
        word: vocabulary.word || "",
        reading: vocabulary.reading || "",
        meaning: vocabulary.meaning || "",
        exampleWithoutReading: vocabulary.exampleWithoutReading || "",
        exampleMeaning: vocabulary.exampleMeaning || "",
        audio: vocabulary.audio || null,
        audioFile: null,
        level: vocabulary.level || "",
        chapter: vocabulary.chapter || "",
        section: vocabulary.section || "",
      });
    }
  }, [vocabulary, form]);

  const onSubmit = async (data: FormValues) => {
    if (!id) return;

    const needsExplicitAudioReset = originalAudioRef.current && 
                                   (!data.audio || data.audio === "") && 
                                   !(data.audioFile instanceof File);

    const vocabularyData: VocabularyCreate = {
      ...data,
    };
    
    if (data.audioFile instanceof File) {
      delete vocabularyData.audio;
    } 
    else if (needsExplicitAudioReset) {
      vocabularyData.audio = undefined;
    }
    else if (data.audio === originalAudioRef.current) {
      delete vocabularyData.audio;
    }
    
    if (!(data.audioFile instanceof File)) {
      delete vocabularyData.audioFile;
    }

    updateVocabularyMutation.mutate(
      { id, data: vocabularyData },
      {
        onSuccess: () => {
          navigate(ROUTERS.ADMIN_VOCABULARY_DETAIL.replace(":id", id || ""));
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
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-20 w-full" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <Skeleton className="h-20 w-full" />
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
          onClick={() => navigate(ROUTERS.ADMIN_VOCABULARY_DETAIL.replace(":id", id || ""))}
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-primary" />
          {t("common.back")}
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-primary">{t("adminVocabulary.updateTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <FormProvider {...form}>
            <VocabularyForm 
              onSubmit={onSubmit} 
              isSubmitting={updateVocabularyMutation.isPending} 
              hasExistingAudio={!!originalAudioRef.current}
            />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVocabularyUpdate;