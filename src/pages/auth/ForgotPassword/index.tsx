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
import { forgotPasswordSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { z } from "zod";

type ForgotPasswordFormData = z.infer<ReturnType<typeof forgotPasswordSchema>>;

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema(t)),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      toast.success(t("forgotPassword.success"));
      form.reset();
    },
    onError: () => {
      toast.error(t("forgotPassword.error"));
    },
  });

  const handleSubmit = (values: ForgotPasswordFormData) => {
    if (!values.email) return;
    forgotPasswordMutation.mutate(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[url('/app/images/bg/bg_meow.png')] bg-white bg-gray-100 bg-cover bg-center bg-no-repeat">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full max-w-md space-y-6 rounded-xl bg-white backdrop-blur-sm px-6 py-14 shadow-2xl shadow-black/50"
        >
          <h2 className="text-center text-2xl font-bold text-primary-30">
            {t("forgotPassword.title")}
          </h2>
          <p className="text-center text-sm text-gray-600">
            {t("forgotPassword.description")}
          </p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("forgotPassword.email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    className={
                      form.formState.errors.email ? "border-red-500" : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={forgotPasswordMutation.isPending}
            className="w-full rounded-md"
          >
            {forgotPasswordMutation.isPending
              ? t("forgotPassword.submitting")
              : t("forgotPassword.submit")}
          </Button>
          <div className="mt-4 text-center">
            <Link
              to={ROUTERS.LOGIN}
              className="text-sm text-primary hover:underline hover:font-inter hover:text-sm font-medium"
            >
              {t("forgotPassword.backToLogin")}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;