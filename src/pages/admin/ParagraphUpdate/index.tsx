import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTERS } from "@/constant";
import type { AdminParagraphCreate } from "@/dataHelper/adminParagraph.dataHelper";
import { useAdminParagraphById, useUpdateParagraph } from "@/hooks/useAdminParagraph";
import { paragraphUpdateFormSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import ParagraphForm from "./components/ParagraphForm";

const AdminParagraphUpdate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: paragraphDetail, isLoading } = useAdminParagraphById(id || "");
  const paragraph = paragraphDetail?.data;
  const updateParagraphMutation = useUpdateParagraph();
  const originalAudioRef = useRef<string | null>(null);

  const customSchema = paragraphUpdateFormSchema(t).refine((data) => {
    if (data.audioFile instanceof File) {
      return true;
    }
    if (originalAudioRef.current) {
      return !!data.audioUrl || (data.audioFile instanceof File);
    }
    return true;
  }, {
    message: t("adminParagraph.validationRequired", { field: t("adminParagraph.audio") }),
    path: ["audio"],
  });

  type FormValues = z.infer<typeof customSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(customSchema),
    defaultValues: {
      japaneseText: "",
      vietnameseText: "",
      audioUrl: null,
      audioFile: null,
      level: "",
      topic: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (paragraph) {
      originalAudioRef.current = paragraph.audioUrl || null;
            
      form.reset({
        japaneseText: paragraph.japaneseText || "",
        vietnameseText: paragraph.vietnameseText || "",
        audioUrl: paragraph.audioUrl || null,
        audioFile: null,
        level: paragraph.level || "",
        topic: paragraph.topic || "",
      });
      
      form.trigger();
    }
  }, [paragraph, form]);

  const onSubmit = async (data: FormValues) => {
    if (!id) return;

    const needsExplicitAudioReset = originalAudioRef.current && 
                                   (!data.audioUrl || data.audioUrl === "") && 
                                   !(data.audioFile instanceof File);

    const paragraphData: AdminParagraphCreate = {
      japaneseText: data.japaneseText,
      vietnameseText: data.vietnameseText,
      level: data.level,
      topic: data.topic,
      audio: null,
    };
    
    if (data.audioFile instanceof File) {
      paragraphData.audio = data.audioFile;
      // @ts-ignore
      delete paragraphData.audioUrl;
    } 
    else if (needsExplicitAudioReset) {
      // @ts-ignore
      paragraphData.audioUrl = null;
      // @ts-ignore
      delete paragraphData.audio;
    }
    else if (data.audioUrl === originalAudioRef.current) {
      // @ts-ignore
      delete paragraphData.audio;
      // @ts-ignore
      delete paragraphData.audioUrl;
    }
    
    updateParagraphMutation.mutate(
      { id, data: paragraphData },
      {
        onSuccess: () => {
          navigate(ROUTERS.ADMIN_PARAGRAPHS_DETAIL.replace(":id", id || ""));
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
          onClick={() => navigate(ROUTERS.ADMIN_PARAGRAPHS_DETAIL.replace(":id", id || ""))}
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-primary" />
          {t("common.back")}
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-primary">{t("adminParagraph.updateTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <FormProvider {...form}>
            <ParagraphForm 
              onSubmit={onSubmit} 
              isSubmitting={updateParagraphMutation.isPending} 
              hasExistingAudio={!!originalAudioRef.current}
            />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminParagraphUpdate; 