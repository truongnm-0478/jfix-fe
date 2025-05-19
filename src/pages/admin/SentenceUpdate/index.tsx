import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTERS } from "@/constant";
import type { AdminSentenceCreate } from "@/dataHelper/adminSentence.dataHelper";
import { useAdminSentenceById, useUpdateSentence } from "@/hooks/useAdminSentence";
import { sentenceUpdateFormSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import SentenceForm from "./components/SentenceForm";

const AdminSentenceUpdate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: sentenceDetail, isLoading } = useAdminSentenceById(id || "");
  const sentence = sentenceDetail?.data;
  const updateSentenceMutation = useUpdateSentence();
  const originalAudioRef = useRef<string | null>(null);

  // Tạo schema với validation audio
  const customSchema = sentenceUpdateFormSchema(t).refine((data) => {
    if (originalAudioRef.current) {
      return !!data.audioUrl || (data.audioFile instanceof File);
    }
    return true;
  }, {
    message: t("adminSentence.validationRequired", { field: t("adminSentence.audio") }),
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
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (sentence) {
      originalAudioRef.current = sentence.audioUrl || null;
            
      form.reset({
        japaneseText: sentence.japaneseText || "",
        vietnameseText: sentence.vietnameseText || "",
        audioUrl: sentence.audioUrl || null,
        audioFile: null,
        level: sentence.level || "",
      });
      
      // Validate form after reset to ensure proper validation state
      form.trigger();
    }
  }, [sentence, form]);

  const onSubmit = async (data: FormValues) => {
    if (!id) return;

    // Xác định xem có cần reset audio hay không (người dùng xóa audio hiện có mà không tải lên audio mới)
    const needsExplicitAudioReset = originalAudioRef.current && 
                                   (!data.audioUrl || data.audioUrl === "") && 
                                   !(data.audioFile instanceof File);

    const sentenceData: AdminSentenceCreate = {
      japaneseText: data.japaneseText,
      vietnameseText: data.vietnameseText,
      level: data.level,
      audio: data.audioFile as File,
    };
    
    // Xử lý audio dựa trên tình trạng
    if (data.audioFile instanceof File) {
      // Có file mới, sử dụng file đó
      sentenceData.audio = data.audioFile;
      // @ts-ignore
      delete sentenceData.audioUrl;
    } 
    else if (needsExplicitAudioReset) {
      // Người dùng xóa audio hiện có và không tải lên file mới
      // @ts-ignore
      sentenceData.audioUrl = null;
      // @ts-ignore
      delete sentenceData.audio;
    }
    else if (data.audioUrl === originalAudioRef.current) {
      // Không thay đổi audio, giữ nguyên URL cũ
      // @ts-ignore
      delete sentenceData.audio;
      // @ts-ignore
      delete sentenceData.audioUrl;
    }
    
    if (!(data.audioFile instanceof File)) {
      // @ts-ignore
      delete sentenceData.audioFile;
    }

    updateSentenceMutation.mutate(
      { id, data: sentenceData },
      {
        onSuccess: () => {
          navigate(ROUTERS.ADMIN_SENTENCES_DETAIL.replace(":id", id || ""));
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
          onClick={() => navigate(ROUTERS.ADMIN_SENTENCES_DETAIL.replace(":id", id || ""))}
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-primary" />
          {t("common.back")}
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-primary">{t("adminSentence.updateTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <FormProvider {...form}>
            <SentenceForm 
              onSubmit={onSubmit} 
              isSubmitting={updateSentenceMutation.isPending} 
              hasExistingAudio={!!originalAudioRef.current}
            />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSentenceUpdate; 