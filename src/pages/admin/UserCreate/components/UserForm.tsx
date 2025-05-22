import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface UserFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, isSubmitting }) => {
  const { t } = useTranslation();
  const form = useFormContext();

  const roles = ["ADMIN", "USER"];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminUsers.username")} <span className="text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t("adminUsers.usernamePlaceholder")} {...field} />
              </FormControl>
              <FormMessage className="text-rose-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminUsers.name")} <span className="text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t("adminUsers.namePlaceholder")} {...field} />
              </FormControl>
              <FormMessage className="text-rose-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminUsers.email")} <span className="text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t("adminUsers.emailPlaceholder")} {...field} />
              </FormControl>
              <FormMessage className="text-rose-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminUsers.phone")} <span className="text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t("adminUsers.phonePlaceholder")} {...field} />
              </FormControl>
              <FormMessage className="text-rose-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminUsers.role")} <span className="text-rose-500">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("adminUsers.rolePlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {t(`adminUsers.roles.${role}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-rose-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminUsers.password")} <span className="text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder={t("adminUsers.passwordPlaceholder")} 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-rose-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-white font-semibold px-6"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? t("common.saving") : t("common.save")}
        </Button>
      </div>
    </form>
  );
};

export default UserForm; 