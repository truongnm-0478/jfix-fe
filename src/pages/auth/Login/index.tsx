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
import { toast } from "@/components/ui/sonner";
import { levels, ROUTERS } from "@/constant";
import { User } from "@/dataHelper/auth.dataHelper";
import { useLearningGoal } from "@/hooks/useAchievement";
import { authApi } from "@/services/api/authApi";
import { learningGoalApi } from "@/services/api/learningGoalApi";
import { useUserStore } from "@/store/useUserStore";
import { loginSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useUserStore();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const checkGoalMutation = useMutation({
    mutationFn: learningGoalApi.checkLearningGoal,
    onError: () => navigate(ROUTERS.LEARNING_GOAL),
  });

  const { data: learningGoal } = useLearningGoal();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async ({ data }) => {
      const user: User = {
        username: data?.username ?? null,
        role: data?.role ?? null,
        name: data?.name ?? null,
        email: data?.email ?? null,
        phone: data?.phone ?? null,
        avatar: data?.avatar ?? null,
        id: data?.id ?? null,
      };
  
      login(user, data?.accessToken ?? null, data?.refreshToken ?? null);
      toast.success(t("login.success"));
  
      if (user.role === "ADMIN") {
        navigate(ROUTERS.ADMIN_DASHBOARD);
        return;
      }
  
      try {
        const { data: hasGoal } = await checkGoalMutation.mutateAsync();
        if (!hasGoal) {
          navigate(ROUTERS.LEARNING_GOAL);
          return;
        }
        const targetLevel = learningGoal?.data?.targetLevel as "N1" | "N2" | "N3" | "N4" | "N5";

        if (user.role === "USER" && targetLevel && levels.includes(targetLevel)) {
          navigate(ROUTERS.LEARNING_RESOURCES);
        } else {
          navigate(ROUTERS.LEARN);
        }
      } catch (error) {
        navigate(ROUTERS.LEARNING_GOAL);
      }
    },
    onError: () => {
      toast.error(t("login.failed"));
    },
  });  

  const handleSubmit = (values: LoginFormData) => {
    if (!values.username || !values.password) return;
    loginMutation.mutate(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[url('/app/images/bg/bg_meow.png')] bg-white bg-gray-100 bg-cover bg-center bg-no-repeat">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full max-w-md space-y-6 rounded-xl bg-white backdrop-blur-sm px-6 py-14 shadow-2xl shadow-black/50"
        >
          <h2 className="text-center text-2xl font-bold text-primary-30">
            JFIX - {t("login.login")}
          </h2>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("login.username")}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className={
                      form.formState.errors.username ? "border-red-500" : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("login.password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className={
                      form.formState.errors.password ? "border-red-500" : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end pb-6">
            <Link
              to={ROUTERS.FORGOT_PASSWORD}
              className="text-sm text-primary hover:underline hover:font-inter hover:text-sm font-medium"
            >
              {t("login.forgot-password")}
            </Link>
          </div>
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-md"
          >
            {loginMutation.isPending ? t("login.submitting") : t("login.sign-in")}
          </Button>
          <div className="mt-4 text-center">
            <span className="text-sm">{t("login.register-text")} </span>
            <Link
              to={ROUTERS.REGISTER}
              className="text-sm text-primary hover:underline hover:font-inter hover:text-sm font-medium"
            >
              {` ${t("login.register")}`}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
