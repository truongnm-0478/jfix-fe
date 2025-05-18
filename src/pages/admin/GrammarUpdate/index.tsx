import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTERS } from "@/constant";
import { GrammarCreate } from "@/dataHelper/adminGrammar.dataHelper";
import { useAdminGrammarById, useUpdateGrammar } from "@/hooks/useAdminGrammar";
import { grammarUpdateFormSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import GrammarForm from "./components/GrammarForm";

const AdminGrammarUpdate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: grammarDetail, isLoading } = useAdminGrammarById(id || "");
  const grammar = grammarDetail?.data;
  const updateGrammarMutation = useUpdateGrammar();

  const formSchema = grammarUpdateFormSchema(t);
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      romaji: "",
      structure: "",
      usage: "",
      meaning: "",
      example: "",
      exampleMeaning: "",
      level: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (grammar) {
      form.reset({
        romaji: grammar.romaji || "",
        structure: grammar.structure || "",
        usage: grammar.usage || "",
        meaning: grammar.meaning || "",
        example: grammar.example || "",
        exampleMeaning: grammar.exampleMeaning || "",
        level: grammar.level || "",
      });
    }
  }, [grammar, form]);

  const onSubmit = async (data: FormValues) => {
    if (!id) return;

    const grammarData: GrammarCreate = {
      ...data,
    };

    updateGrammarMutation.mutate(
      { id, data: grammarData },
      {
        onSuccess: () => {
          navigate(ROUTERS.ADMIN_GRAMMAR_DETAIL.replace(":id", id || ""));
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
          onClick={() => navigate(ROUTERS.ADMIN_GRAMMAR_DETAIL.replace(":id", id || ""))}
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-primary" />
          {t("common.back")}
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-primary">{t("adminGrammar.updateTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <FormProvider {...form}>
            <GrammarForm 
              onSubmit={onSubmit} 
              isSubmitting={updateGrammarMutation.isPending} 
            />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGrammarUpdate; 