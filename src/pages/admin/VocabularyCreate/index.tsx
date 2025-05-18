import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTERS } from "@/constant";
import { VocabularyCreate } from "@/dataHelper/adminVocubalary.dataHelper";
import { useCreateVocabulary } from "@/hooks/useAdminVocabulary";
import { vocabularyCreateFormSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import VocabularyForm from "./components/VocabularyForm";

const AdminVocabularyCreate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createVocabularyMutation = useCreateVocabulary();
  const formSchema = vocabularyCreateFormSchema(t);

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: "",
      reading: "",
      meaning: "",
      exampleWithoutReading: "",
      exampleMeaning: "",
      audio: undefined,
      audioFile: undefined,
      level: "",
      chapter: "",
      section: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const vocabularyData: VocabularyCreate = {
      ...data,
      audio: data.audio || undefined,
      reading: data.reading || undefined,
    };

    createVocabularyMutation.mutate(vocabularyData, {
      onSuccess: () => {
        navigate(ROUTERS.ADMIN_VOCABULARY);
      },
    });
  };

  return (
    <div className="px-4">
      <div className="flex mb-4">
        <Button
          variant="outline"
          className="text-primary bg-white border-primary font-semibold hover:bg-primary/10 hover:text-primary w-full sm:w-auto"
          onClick={() => navigate(ROUTERS.ADMIN_VOCABULARY)}
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-primary" />
          {t("common.back")}
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-primary">{t("adminVocabulary.createTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <FormProvider {...form}>
            <VocabularyForm 
              onSubmit={onSubmit} 
              isSubmitting={createVocabularyMutation.isPending} 
            />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVocabularyCreate;