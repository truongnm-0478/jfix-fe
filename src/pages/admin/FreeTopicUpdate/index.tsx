import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTERS } from "@/constant";
import { FreeTopicCreate } from "@/dataHelper/adminFreeTopic.dataHelper";
import { useAdminFreeTopicById, useUpdateFreeTopic } from "@/hooks/useAdminFreeTopic";
import { freeTopicUpdateFormSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import FreeTopicForm from "../FreeTopicCreate/components/FreeTopicForm";

const AdminFreeTopicUpdate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: freeTopicDetail, isLoading } = useAdminFreeTopicById(id || "");
  const freeTopic = freeTopicDetail?.data;
  const updateFreeTopicMutation = useUpdateFreeTopic();

  const formSchema = freeTopicUpdateFormSchema(t);
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      japaneseText: "",
      vietnameseText: "",
      conversationPrompt: "",
      level: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (freeTopic) {
      form.reset({
        japaneseText: freeTopic.japaneseText || "",
        vietnameseText: freeTopic.vietnameseText || "",
        conversationPrompt: freeTopic.conversationPrompt || "",
        level: freeTopic.level || "",
      });
    }
  }, [freeTopic, form]);

  const onSubmit = async (data: FormValues) => {
    if (!id) return;

    const freeTopicData: FreeTopicCreate = {
      ...data,
    };

    updateFreeTopicMutation.mutate(
      { id, data: freeTopicData },
      {
        onSuccess: () => {
          navigate(ROUTERS.ADMIN_FREE_TOPICS_DETAIL.replace(":id", id || ""));
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
              <Skeleton className="h-20 w-full" />
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
          onClick={() => navigate(ROUTERS.ADMIN_FREE_TOPICS_DETAIL.replace(":id", id || ""))}
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-primary" />
          {t("common.back")}
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-primary">{t("adminFreeTopic.updateTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <FormProvider {...form}>
            <FreeTopicForm 
              onSubmit={onSubmit} 
              isSubmitting={updateFreeTopicMutation.isPending} 
            />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFreeTopicUpdate; 