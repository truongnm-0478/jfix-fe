import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateUserProfile, useUserProfile } from "@/hooks/useUserProfile";
import { updateProfileSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

interface ProfileUpdateData {
  name: string;
  email: string;
  phone: string;
  avatar?: File | null;
}

export const UpdateProfile = () => {
  const { t } = useTranslation();
  const updateProfileMutation = useUpdateUserProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  
  const formSchema = updateProfileSchema(t);
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      avatar: undefined,
    },
    mode: "onChange",
  });

  const { data: userData } = useUserProfile();
  const user = userData?.data;

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar || undefined,
      });
      
      if (user.avatar && !newAvatarFile) {
        setPreviewAvatar(user.avatar);
      }
    }
  }, [user, form, newAvatarFile]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setNewAvatarFile(file);
      form.setValue("avatar", file, { shouldValidate: true });
      console.log("New avatar file selected:", file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: FormValues) => {
    const updateData: ProfileUpdateData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
    
    if (newAvatarFile) {
      updateData.avatar = newAvatarFile;
    }
    
    updateProfileMutation.mutate(updateData as any, {
      onSuccess: () => {
        setNewAvatarFile(null);
      },
    });
  };

  return (
    <Card className="bg-white overflow-hidden relative">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {t("profile.updateProfile")}
        </h3>
        
        {updateProfileMutation.isError && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {updateProfileMutation.error instanceof Error 
              ? updateProfileMutation.error.message 
              : t("profile.errors.updateFailed")}
          </div>
        )}
        
        {updateProfileMutation.isSuccess && (
          <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg">
            {t("profile.successMessages.profileUpdated")}
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-6">
              <div className="flex flex-col items-center mb-4">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20">
                    {previewAvatar ? (
                      <img
                        src={previewAvatar}
                        alt={form.getValues("name")}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Camera size={32} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleBrowseClick}
                    className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 cursor-pointer shadow-md hover:bg-primary-dark transition"
                  >
                    <Camera size={14} />
                  </button>
                </div>
                
                <input
                  type="file"
                  id="avatar-upload"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="text-sm text-primary cursor-pointer"
                >
                  {t("profile.changeAvatar")}
                </button>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    {t("profile.fields.name")} <span className="text-rose-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("profile.placeholders.name")} 
                      className="bg-white"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    {t("profile.fields.email")} <span className="text-rose-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("profile.placeholders.email")} 
                      className="bg-white"
                      {...field} 
                    />
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
                  <FormLabel className="text-gray-700 font-medium">
                    {t("profile.fields.phone")} <span className="text-rose-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("profile.placeholders.phone")} 
                      className="bg-white"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto"
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <Loader2 size={18} className="animate-spin mr-2" />
                    {t("profile.buttons.saving")}
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {t("profile.buttons.saveChanges")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <img src="/app/images/bg/cat-3.png" alt="cat" className="md:w-44 w-full h-auto md:absolute md:left-6 md:bottom-0" />
    </Card>
  );
};

export default UpdateProfile;