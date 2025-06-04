import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/sonner";
import { LEVELS, MIN_DAYS, ROUTERS, TOTAL_VOCAB } from "@/constant";
import { learningGoalApi } from "@/services/api/learningGoalApi";
import { learningGoalSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarCheck2, Sparkles, Target } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type LearningGoalFormData = z.infer<ReturnType<typeof learningGoalSchema>>;

const AddLearningGoal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<LearningGoalFormData>({
    resolver: zodResolver(learningGoalSchema(t)),
    defaultValues: {
      targetLevel: undefined,
      description: "",
      targetDate: "",
    },
  });

  const targetLevel = form.watch("targetLevel");
  const targetDate = form.watch("targetDate");

  const days = useMemo(() => {
    if (!targetDate || targetLevel === "FREE") return 0;
    const today = new Date();
    const target = new Date(targetDate);
    return Math.max(1, Math.ceil((target.getTime() - today.setHours(0,0,0,0)) / (1000 * 60 * 60 * 24)));
  }, [targetDate, targetLevel]);
  const dailyVocabTarget = useMemo(() => (targetLevel !== "FREE" && days > 0) ? Math.ceil(TOTAL_VOCAB / days) : 0, [days, targetLevel]);
  const dailyMinutes = useMemo(() => (targetLevel !== "FREE" && dailyVocabTarget > 0) ? Math.ceil(dailyVocabTarget * 0.5) : 0, [dailyVocabTarget, targetLevel]);

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      return learningGoalApi.createLearningGoal(payload);
    },
    onSuccess: (response: any) => {
      toast.success(t("learningGoalForm.success"));
      queryClient.invalidateQueries({ queryKey: ['learningGoal'] });
      
      if (response.data.targetLevel === "FREE") {
        navigate(ROUTERS.LEARNING_RESOURCES);
      } else {
        navigate(ROUTERS.LEARN);
      }
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = async (values: LearningGoalFormData) => {
    let payload;
    if (values.targetLevel === "FREE") {
      payload = { ...values, targetDate: '', dailyVocabTarget: 10, dailyMinutes: 20 };
    } else {
      payload = { ...values, dailyVocabTarget, dailyMinutes, targetDate: values.targetDate || "" };
    }
    await mutation.mutateAsync(payload);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-blue-100 relative"
          aria-label={t("learningGoalForm.formAria")}
        >
          <div className="flex flex-col items-center gap-2 mb-2">
            <Sparkles className="w-10 h-10 text-yellow-400 animate-bounce" />
            <h2 className="text-2xl font-extrabold text-blue-700 mb-1">{t("learningGoalForm.title")}</h2>
            <p className="text-sm text-gray-500 text-center">
              {t("learningGoalForm.motivation", "learningGoalForm.motivation")}
            </p>
          </div>

          <FormField
            control={form.control}
            name="targetLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold flex items-center gap-2 text-blue-700">
                  <Target className="w-4 h-4 text-blue-400" />
                  {t("learningGoalForm.targetLevel")}
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger aria-label={t("learningGoalForm.targetLevel")}> 
                      <SelectValue placeholder={t("learningGoalForm.selectLevel")} />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-blue-700">{t("learningGoalForm.description")}</FormLabel>
                <FormControl>
                  <Input {...field} aria-label={t("learningGoalForm.description")}/>
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
                  <FormLabel className="font-semibold flex items-center gap-2 text-blue-700">
                    <CalendarCheck2 className="w-4 h-4 text-green-400" />
                    {t("learningGoalForm.targetDate")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      min={new Date(Date.now() + MIN_DAYS*24*60*60*1000).toISOString().split("T")[0]}
                      aria-label={t("learningGoalForm.targetDate")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r font-bold text-lg py-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
            disabled={mutation.isPending}
            aria-label={t("learningGoalForm.save")}
          >
            <Sparkles className="w-5 h-5 animate-spin-slow" />
            {mutation.isPending ? t("learningGoalForm.saving") : t("learningGoalForm.save")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddLearningGoal; 