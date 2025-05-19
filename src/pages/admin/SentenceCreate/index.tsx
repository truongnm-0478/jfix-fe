import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTERS } from "@/constant";
import type { AdminSentenceCreate } from "@/dataHelper/adminSentence.dataHelper";
import { useCreateSentence } from "@/hooks/useAdminSentence";
import { sentenceCreateFormSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import SentenceForm from "./components/SentenceForm";

const AdminSentenceCreate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createSentenceMutation = useCreateSentence();
  const formSchema = sentenceCreateFormSchema(t);

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      japaneseText: "",
      vietnameseText: "",
      audio: undefined,
      level: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    const sentenceData: AdminSentenceCreate = {
      japaneseText: data.japaneseText,
      vietnameseText: data.vietnameseText,
      audio: data.audio as File,
      level: data.level,
    };

    createSentenceMutation.mutate(sentenceData, {
      onSuccess: () => {
        navigate(ROUTERS.ADMIN_SENTENCES);
      },
    });
  };

  return (
    <div className="px-4">
      <div className="flex mb-4">
        <Button
          variant="outline"
          className="text-primary bg-white border-primary font-semibold hover:bg-primary/10 hover:text-primary w-full sm:w-auto"
          onClick={() => navigate(ROUTERS.ADMIN_SENTENCES)}
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-primary" />
          {t("common.back")}
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-primary">{t("adminSentence.createTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <FormProvider {...form}>
            <SentenceForm 
              onSubmit={onSubmit} 
              isSubmitting={createSentenceMutation.isPending} 
            />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSentenceCreate; 