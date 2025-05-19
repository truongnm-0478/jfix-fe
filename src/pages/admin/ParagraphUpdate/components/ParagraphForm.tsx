import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LEVELS } from "@/constant";
import { Save, Trash, Upload } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ParagraphFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  hasExistingAudio?: boolean;
}

const ParagraphForm: React.FC<ParagraphFormProps> = ({ 
  onSubmit, 
  isSubmitting,
  hasExistingAudio = false
}) => {
  const { t } = useTranslation();
  const form = useFormContext();
  const [fileName, setFileName] = useState<string>("");
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasNewFile, setHasNewFile] = useState<boolean>(false);
  
  const audioValue = useWatch({
    control: form.control,
    name: 'audioUrl',
  });

  const audioFile = useWatch({
    control: form.control,
    name: 'audioFile',
  });

  const hasAudio = hasNewFile || (audioValue && audioValue !== null);
  const hasAudioError = hasExistingAudio && !hasAudio;

  useEffect(() => {
    if (audioFile instanceof File) {
      setHasNewFile(true);
    }
  }, [audioFile]);

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
      
      setAudioPreviewUrl(audioValue);
    }
  }, [audioValue, fileName]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setHasNewFile(true);
      
      const localUrl = URL.createObjectURL(file);
      setAudioPreviewUrl(localUrl);
      
      form.setValue("audio", file, { shouldValidate: true });
      form.setValue("audioFile", file, { shouldValidate: true });
      form.clearErrors("audio");
      form.clearErrors("audioFile");
      
      if (hasExistingAudio) {
        form.setValue("audioUrl", null, { shouldValidate: false });
      }
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleClearAudio = () => {
    setHasNewFile(false);
    form.setValue("audio", undefined, { shouldValidate: true, shouldDirty: true });
    form.setValue("audioFile", null, { shouldValidate: true, shouldDirty: true });
    form.setValue("audioUrl", null, { shouldValidate: true, shouldDirty: true });
    setFileName("");
    setAudioPreviewUrl(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    if (hasExistingAudio) {
      setTimeout(() => {
        form.setError("audioFile", {
          type: "manual",
          message: t("adminParagraph.validationRequired", { field: t("adminParagraph.audio") })
        });
      }, 100);
    }
  };
  
  const levelOptions = LEVELS.filter(level => level !== "FREE").map(level => ({
    value: level,
    label: level
  }));

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          control={form.control}
          name="japaneseText"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminParagraph.japaneseText")} <span className="text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t("adminParagraph.japaneseTextPlaceholder")} 
                  className="resize-y min-h-96"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-rose-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vietnameseText"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminParagraph.vietnameseText")} <span className="text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t("adminParagraph.vietnameseTextPlaceholder")} 
                  className="resize-y min-h-96"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-rose-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminParagraph.level")} <span className="text-rose-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder={t("adminParagraph.levelPlaceholder")} />
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
              <FormMessage className="text-rose-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-semibold">
                {t("adminParagraph.topic")} <span className="text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={t("adminParagraph.topicPlaceholder")} 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-rose-500" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="audio"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-semibold">
              {t("adminParagraph.audio")} <span className="text-rose-500">*</span>
            </FormLabel>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <input
                  {...field}
                  type="file"
                  ref={fileInputRef}
                  accept="audio/*"
                  className="hidden"
                  onChange={handleFileChange}
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
                    placeholder={t("adminParagraph.audioPlaceholder")}
                    className={`bg-gray-50 cursor-default ${hasAudioError ? 'border-rose-500' : ''}`}
                  />
                </div>
                {(fileName || audioValue) && (
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
              
              {audioPreviewUrl && (
                <audio controls className="w-full max-w-md mt-2">
                  <source src={audioPreviewUrl} type="audio/mpeg" />
                  {t("adminParagraph.audioNotSupported")}
                </audio>
              )}
              {hasAudioError && (
                <p className="text-xs font-medium text-destructive">
                  {t("adminParagraph.validationRequired", { field: t("adminParagraph.audio") })}
                </p>
              )}
              {hasExistingAudio && (
                <p className="text-xs text-gray-500">
                  {t("adminParagraph.audioDescription")}
                </p>
              )}
            </div>
          </FormItem>
        )}
      />

      <div className="flex justify-end pt-4">
        <Button 
          type="submit" 
          className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto"
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

export default ParagraphForm; 