import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface GrammarFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

const GrammarForm: React.FC<GrammarFormProps> = ({ onSubmit, isSubmitting }) => {
  const { t } = useTranslation();
  const form = useFormContext();
  
  const levelOptions = [
    { value: "N5", label: "N5" },
    { value: "N4", label: "N4" },
    { value: "N3", label: "N3" },
    { value: "N2", label: "N2" },
    { value: "N1", label: "N1" },
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          control={form.control}
          name="romaji"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminGrammar.romaji")} <span className="text-rose-500">*</span>
                </FormLabel>
              <FormControl>
                <Input placeholder={t("adminGrammar.romajiPlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="structure"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminGrammar.structure")} <span className="text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t("adminGrammar.structurePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="usage"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-semibold">
              {t("adminGrammar.usage")} <span className="text-rose-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t("adminGrammar.usagePlaceholder")} 
                className="min-h-24 resize-y"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="meaning"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-semibold">
              {t("adminGrammar.meaning")} <span className="text-rose-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t("adminGrammar.meaningPlaceholder")} 
                className="min-h-24 resize-y"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="example"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-semibold">
              {t("adminGrammar.example")} <span className="text-rose-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t("adminGrammar.examplePlaceholder")} 
                className="min-h-24 resize-y"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="exampleMeaning"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-semibold">
              {t("adminGrammar.exampleMeaning")} <span className="text-rose-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t("adminGrammar.exampleMeaningPlaceholder")} 
                className="min-h-24 resize-y"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="level"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-semibold">
              {t("adminGrammar.level")} <span className="text-rose-500">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("adminGrammar.levelPlaceholder")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {levelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end pt-4">
        <Button 
          type="submit" 
          className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              {t("common.saving")}
            </div>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              {t("common.save")}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default GrammarForm; 