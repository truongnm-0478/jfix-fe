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
import { ROUTERS } from "@/constant";
import { authApi } from "@/services/api/authApi";
import { resetPasswordSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type ResetPasswordFormData = z.infer<ReturnType<typeof resetPasswordSchema>>;

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema(t)),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast.success(t("resetPassword.success"));
      navigate(ROUTERS.LOGIN);
    },
    onError: () => {
      toast.error(t("resetPassword.error"));
    },
  });

  const handleSubmit = (values: ResetPasswordFormData) => {
    if (!values.otp || !values.newPassword || !values.confirmPassword) return;

    resetPasswordMutation.mutate({
      token: values.otp,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[url('/app/images/bg/bg_meow.png')] bg-white bg-gray-100 bg-cover bg-center bg-no-repeat">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full max-w-md space-y-6 rounded-xl bg-white backdrop-blur-sm px-6 py-14 shadow-2xl shadow-black/50"
        >
          <h2 className="text-center text-2xl font-bold text-primary-30">
            {t("resetPassword.title")}
          </h2>
          <p className="text-center text-sm text-gray-600">
            {t("resetPassword.description")}
          </p>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("resetPassword.otp")}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    maxLength={6}
                    placeholder={t("resetPassword.otpPlaceholder")}
                    {...field}
                    className={
                      form.formState.errors.otp ? "border-red-500" : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("resetPassword.newPassword")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className={
                      form.formState.errors.newPassword ? "border-red-500" : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("resetPassword.confirmPassword")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className={
                      form.formState.errors.confirmPassword ? "border-red-500" : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={resetPasswordMutation.isPending}
            className="w-full rounded-md"
          >
            {resetPasswordMutation.isPending
              ? t("resetPassword.submitting")
              : t("resetPassword.submit")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
