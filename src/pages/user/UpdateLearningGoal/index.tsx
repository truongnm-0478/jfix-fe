import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LEVELS, MIN_DAYS, TOTAL_VOCAB } from "@/constant";
import { useLearningGoal } from "@/hooks/useAchievement";
import { learningGoalApi } from "@/services/api/learningGoalApi";
import { learningGoalSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Save, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

type LearningGoalFormData = z.infer<ReturnType<typeof learningGoalSchema>>;

export const UpdateLearningGoal = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { data: learningGoal, isLoading } = useLearningGoal();

  const form = useForm<LearningGoalFormData>({
    resolver: zodResolver(learningGoalSchema(t)),
    defaultValues: {
      targetLevel: "FREE", // fallback ban đầu
      description: "",
      targetDate: "",
    },
  });

  useEffect(() => {
    if (learningGoal?.data) {
      form.reset({
        targetLevel: learningGoal.data.targetLevel as (typeof LEVELS)[number],
        description: learningGoal.data.description || "",
        targetDate: learningGoal.data.targetDate || "",
      });
    }
  }, [learningGoal, form]);

  const targetLevel = form.watch("targetLevel");
  const targetDate = form.watch("targetDate");

  const days = useMemo(() => {
    if (!targetDate || targetLevel === "FREE") return 0;
    const today = new Date();
    const target = new Date(targetDate);
    return Math.max(
      1,
      Math.ceil(
        (target.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
      )
    );
  }, [targetDate, targetLevel]);

  const dailyVocabTarget = useMemo(
    () =>
      targetLevel !== "FREE" && days > 0 ? Math.ceil(TOTAL_VOCAB / days) : 0,
    [days, targetLevel]
  );

  const dailyMinutes = useMemo(
    () =>
      targetLevel !== "FREE" && dailyVocabTarget > 0
        ? Math.ceil(dailyVocabTarget * 0.5)
        : 0,
    [dailyVocabTarget, targetLevel]
  );

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      return learningGoalApi.updateLearningGoal(payload);
    },
    onSuccess: () => {
      setSuccess(true);
      setError(null);
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Update failed");
    },
  });

  const handleSubmit = async (values: LearningGoalFormData) => {
    let payload;
    if (values.targetLevel === "FREE") {
      payload = {
        ...values,
        targetDate: "",
        dailyVocabTarget: 10,
        dailyMinutes: 20,
      };
    } else {
      payload = {
        ...values,
        dailyVocabTarget,
        dailyMinutes,
        targetDate: values.targetDate || "",
      };
    }
    await mutation.mutateAsync(payload);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <Card className="bg-white overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {t("learningGoalForm.update")}
        </h3>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 flex items-center gap-2 text-green-600 rounded-lg">
            <ShieldCheck size={20} />
            <span>{t("learningGoalForm.success")}</span>
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full space-y-6"
            aria-label={t("learningGoalForm.formAria")}
          >
            <FormField
              control={form.control}
              name="targetLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    {t("learningGoalForm.targetLevel")}{" "}
                    <span className="text-rose-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        aria-label={t("learningGoalForm.targetLevel")}
                      >
                        <SelectValue
                          placeholder={t("learningGoalForm.selectLevel")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    {t("learningGoalForm.description")}{" "}
                    <span className="text-rose-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      aria-label={t("learningGoalForm.description")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {targetLevel !== "FREE" && (
              <FormField
                control={form.control}
                name="targetDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      {t("learningGoalForm.targetDate")}{" "}
                      <span className="text-rose-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        min={
                          new Date(Date.now() + MIN_DAYS * 24 * 60 * 60 * 1000)
                            .toISOString()
                            .split("T")[0]
                        }
                        aria-label={t("learningGoalForm.targetDate")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto"
                disabled={mutation.isPending}
                aria-label={t("learningGoalForm.save")}
              >
                {mutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <Loader2 size={18} className="animate-spin mr-2" />
                    {t("learningGoalForm.saving")}
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {t("learningGoalForm.save")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default UpdateLearningGoal;
