import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTERS } from "@/constant";
import { CreateUserRequest } from "@/dataHelper/adminUser.dataHelper";
import { useCreateUser } from "@/hooks/useAdminUser";
import { userCreateFormSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import UserForm from "./components/UserForm";

export const UserCreate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createUserMutation = useCreateUser();
  const formSchema = userCreateFormSchema(t);

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      phone: "",
      role: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const userData: CreateUserRequest = {
      ...data,
    };

    createUserMutation.mutate(userData, {
      onSuccess: () => {
        navigate(ROUTERS.ADMIN_USERS);
      },
    });
  };

  return (
    <div className="px-4">
      <div className="flex mb-4">
        <Button
          variant="outline"
          className="text-primary bg-white border-primary font-semibold hover:bg-primary/10 hover:text-primary w-full sm:w-auto"
          onClick={() => navigate(ROUTERS.ADMIN_USERS)}
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-primary" />
          {t("common.back")}
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-primary">{t("adminUsers.createTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <FormProvider {...form}>
            <UserForm 
              onSubmit={onSubmit} 
              isSubmitting={createUserMutation.isPending} 
            />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserCreate;