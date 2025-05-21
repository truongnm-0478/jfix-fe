// File: components/ChangePassword.jsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useChangePassword } from "@/hooks/useUserProfile";
import { changePasswordSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Save, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export const ChangePassword = () => {
  const { t } = useTranslation();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const updatePasswordMutation = useChangePassword();

  const formSchema = changePasswordSchema(t);
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    switch (field) {
      case "old":
        setShowOldPassword(!showOldPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  const onSubmit = (data: FormValues) => {
    updatePasswordMutation.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    }, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  return (
    <Card className="bg-white overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {t("profile.changePassword")}
        </h3>

        {updatePasswordMutation.isError && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {updatePasswordMutation.error && t("profile.errors.passwordChangeFailed")}
          </div>
        )}
        
        {updatePasswordMutation.isSuccess && (
          <div className="mb-6 p-4 bg-green-50 flex items-center gap-2 text-green-600 rounded-lg">
            <ShieldCheck size={20} />
            <span>{t("profile.successMessages.passwordChanged")}</span>
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    {t("profile.fields.currentPassword")} <span className="text-rose-500">*</span>
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showOldPassword ? "text" : "password"}
                        placeholder={t("profile.placeholders.currentPassword")} 
                        className="bg-white pr-10"
                        {...field} 
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      onClick={() => togglePasswordVisibility("old")}
                    >
                      {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    {t("profile.fields.newPassword")} <span className="text-rose-500">*</span>
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showNewPassword ? "text" : "password"}
                        placeholder={t("profile.placeholders.newPassword")} 
                        className="bg-white pr-10"
                        {...field} 
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      onClick={() => togglePasswordVisibility("new")}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {t("profile.passwordRequirements")}
                  </p>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    {t("profile.fields.confirmPassword")} <span className="text-rose-500">*</span>
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t("profile.placeholders.confirmPassword")} 
                        className="bg-white pr-10"
                        {...field} 
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      onClick={() => togglePasswordVisibility("confirm")}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto"
                disabled={updatePasswordMutation.isPending}
              >
                {updatePasswordMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <Loader2 size={18} className="animate-spin mr-2" />
                    {t("profile.buttons.updating")}
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {t("profile.buttons.updatePassword")}
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

export default ChangePassword;