import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { chapters, levels, sections } from "@/constant";
import { Save, Trash, Upload } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface VocabularyFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  hasExistingAudio?: boolean;
}

const VocabularyForm: React.FC<VocabularyFormProps> = ({ onSubmit, isSubmitting, hasExistingAudio = false }) => {
  const { t } = useTranslation();
  const form = useFormContext();
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const formState = form.getFieldState("audio");
  const hasAudioError = !!formState.error;
  
  const audioValue = useWatch({
    control: form.control,
    name: 'audio',
  });

  useEffect(() => {
    if (audioValue && !fileName) {
      try {
        const url = new URL(audioValue);
        const pathSegments = url.pathname.split('/');
        const filename = pathSegments[pathSegments.length - 1];
        if (filename) {
          setFileName(filename);
        }
      } catch (e) {
        const pathSegments = audioValue.split('/');
        const filename = pathSegments[pathSegments.length - 1];
        if (filename) {
          setFileName(filename);
        }
      }
    }
  }, [audioValue, fileName]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const audioUrl = URL.createObjectURL(file);
      form.setValue("audio", audioUrl, { shouldValidate: true });
      form.setValue("audioFile", file, { shouldValidate: true });
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleClearAudio = () => {
    form.setValue("audio", null, { shouldValidate: true, shouldDirty: true });
    form.setValue("audioFile", null, { shouldValidate: true, shouldDirty: true });
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    form.trigger("audio");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          control={form.control}
          name="word"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminVocabulary.word")} <span className="text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t("adminVocabulary.wordPlaceholder")} {...field} />
              </FormControl>
              <FormMessage className="text-rose-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reading"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminVocabulary.reading")}
              </FormLabel>
              <FormControl>
                <Input placeholder={t("adminVocabulary.readingPlaceholder")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="meaning"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-semibold">
              {t("adminVocabulary.meaning")} <span className="text-rose-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("adminVocabulary.meaningPlaceholder")}
                className="resize-none min-h-24"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-rose-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="exampleWithoutReading"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-semibold">
              {t("adminVocabulary.exampleWithReading")} <span className="text-rose-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("adminVocabulary.exampleWithoutReadingPlaceholder")}
                className="resize-none min-h-20"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-rose-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="exampleMeaning"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-semibold">
              {t("adminVocabulary.exampleMeaning")} <span className="text-rose-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("adminVocabulary.exampleMeaningPlaceholder")}
                className="resize-none min-h-20"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-rose-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="audio"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-semibold">
              {t("adminVocabulary.audio")} {hasExistingAudio && <span className="text-rose-500">*</span>}
            </FormLabel>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleBrowseClick}
                  className="bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {t("common.browse")}
                </Button>
                <div className="flex-1 overflow-hidden">
                  <Input 
                    value={fileName} 
                    readOnly 
                    placeholder={t("adminVocabulary.audioPlaceholder")}
                    className={`bg-gray-50 cursor-default ${hasAudioError ? 'border-rose-500' : ''}`}
                  />
                </div>
                {field.value && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClearAudio}
                    className="bg-white border-gray-300 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              {field.value && (
                <audio controls className="w-full max-w-md mt-2">
                  <source src={field.value} type="audio/mpeg" />
                  {t("adminVocabulary.audioNotSupported")}
                </audio>
              )}
            </div>
            <FormMessage className="text-rose-500" />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminVocabulary.level")} <span className="text-rose-500">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder={t("adminVocabulary.levelPlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
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
          name="chapter"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminVocabulary.chapter")} <span className="text-rose-500">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder={t("adminVocabulary.chapterPlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {chapters.map((chapter) => (
                    <SelectItem key={chapter} value={chapter}>
                      {chapter}
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
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminVocabulary.section")} <span className="text-rose-500">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder={t("adminVocabulary.sectionPlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-rose-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          className="bg-primary text-white hover:bg-primary/90 min-w-32 w-full sm:w-auto"
          disabled={isSubmitting || hasAudioError}
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

export default VocabularyForm; 