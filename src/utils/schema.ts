import {
  LEVELS,
  MIN_DAYS,
  regexEmail,
  regexPassword,
  regexPhone,
  regexUsername
} from "@/constant";
import { z } from "zod";

export const loginSchema = (t: (key: string) => string) => z.object({
  username: z.string()
    .min(3, t('validation.username.min'))
    .max(50, t('validation.username.max'))
    .regex(regexUsername, t('validation.username.regex')),
  password: z.string()
    .min(3, t('validation.password.min'))
    .max(50, t('validation.password.max'))
    .regex(regexPassword, t('validation.password.regex')),
});

export const registerSchema = (t: (key: string) => string) => z.object({
    username: z.string()
      .min(3, t("validation.username.min"))
      .max(50, t("validation.username.max"))
      .regex(regexUsername, t("validation.username.regex")),
    name: z.string().min(2, t("validation.required")),
    email: z.string()
      .regex(regexEmail, t("validation.invalid-email")),
    phone: z.string()
      .regex(regexPhone, t("validation.invalid-phone")),
    password: z.string()
      .min(3, t('validation.password.min'))
      .max(50, t('validation.password.max'))
      .regex(regexPassword, t("validation.password.regex")),
    confirmPassword: z.string()
      .min(1, t("validation.required"))
      .regex(regexPassword, t("validation.password.regex")),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t("validation.password.match"),
    path: ["confirmPassword"],
});

export const learningGoalSchema = (t: (key: string) => string) =>
  z.object({
    targetLevel: z.enum(LEVELS, {
      errorMap: () => ({ message: t("validation.required") }),
    }),
    description: z.string().nonempty(t("validation.required")),
    targetDate: z.string().optional(),
  }).refine(
    (data) => {
      if (data.targetLevel === "FREE") return true;
      if (!data.targetDate) return false;
      const today = new Date();
      const target = new Date(data.targetDate);
      const diff = Math.ceil((target.getTime() - today.setHours(0,0,0,0)) / (1000 * 60 * 60 * 24));
      return diff >= MIN_DAYS;
    },
    { message: t("learningGoalForm.targetDateMin"), path: ["targetDate"] }
  );

export const vocabularyCreateFormSchema = (t: (key: string, params?: { field?: string }) => string) => z.object({
  word: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.word") }) }),
  reading: z.string().optional(),
  meaning: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.meaning") }) }),
  exampleWithoutReading: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.exampleWithReading") }) }),
  exampleMeaning: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.exampleMeaning") }) }),
  audio: z.string().optional().nullable(),
  audioFile: z.instanceof(File).optional().nullable(),
  level: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.level") }) }),
  chapter: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.chapter") }) }),
  section: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.section") }) }),
});

export const vocabularyUpdateFormSchema = (t: (key: string, params?: { field?: string }) => string) => z.object({
  word: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.word") }) }),
  reading: z.string().optional(),
  meaning: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.meaning") }) }),
  exampleWithoutReading: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.exampleWithReading") }) }),
  exampleMeaning: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.exampleMeaning") }) }),
  audio: z.union([z.string(), z.null()]).optional(),
  audioFile: z.any().optional(),
  level: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.level") }) }),
  chapter: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.chapter") }) }),
  section: z.string().min(1, { message: t("adminVocabulary.validationRequired", { field: t("adminVocabulary.section") }) }),
});
