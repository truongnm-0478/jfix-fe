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
      errorMap: () => ({ message: t("validation.targetLevelRequired") }),
    }),
    description: z.string().nonempty(t("validation.descriptionRequired")),
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

export const grammarCreateFormSchema = (t: (key: string, params?: { field?: string }) => string) => z.object({
  romaji: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.romaji") }) }),
  structure: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.structure") }) }),
  usage: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.usage") }) }),
  meaning: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.meaning") }) }),
  example: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.example") }) }),
  exampleMeaning: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.exampleMeaning") }) }),
  level: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.level") }) }),
});

export const grammarUpdateFormSchema = (t: (key: string, params?: { field?: string }) => string) => z.object({
  romaji: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.romaji") }) }),
  structure: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.structure") }) }),
  usage: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.usage") }) }),
  meaning: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.meaning") }) }),
  example: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.example") }) }),
  exampleMeaning: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.exampleMeaning") }) }),
  level: z.string().min(1, { message: t("adminGrammar.validationRequired", { field: t("adminGrammar.level") }) }),
});

export const freeTopicCreateFormSchema = (t: (key: string, params?: { field?: string }) => string) => z.object({
  japaneseText: z.string().min(1, { message: t("adminFreeTopic.validationRequired", { field: t("adminFreeTopic.japaneseText") }) }),
  vietnameseText: z.string().min(1, { message: t("adminFreeTopic.validationRequired", { field: t("adminFreeTopic.vietnameseText") }) }),
  conversationPrompt: z.string().min(1, { message: t("adminFreeTopic.validationRequired", { field: t("adminFreeTopic.conversationPrompt") }) }),
  level: z.string().min(1, { message: t("adminFreeTopic.validationRequired", { field: t("adminFreeTopic.level") }) }),
});

export const freeTopicUpdateFormSchema = (t: (key: string, params?: { field?: string }) => string) => z.object({
  japaneseText: z.string().min(1, { message: t("adminFreeTopic.validationRequired", { field: t("adminFreeTopic.japaneseText") }) }),
  vietnameseText: z.string().min(1, { message: t("adminFreeTopic.validationRequired", { field: t("adminFreeTopic.vietnameseText") }) }),
  conversationPrompt: z.string().min(1, { message: t("adminFreeTopic.validationRequired", { field: t("adminFreeTopic.conversationPrompt") }) }),
  level: z.string().min(1, { message: t("adminFreeTopic.validationRequired", { field: t("adminFreeTopic.level") }) }),
});

export const speakingQuestionCreateFormSchema = (t: (key: string, params?: { field?: string }) => string) => z.object({
  japaneseText: z.string().min(1, { message: t("adminSpeakingQuestion.validationRequired", { field: t("adminSpeakingQuestion.japaneseText") }) }),
  vietnameseText: z.string().min(1, { message: t("adminSpeakingQuestion.validationRequired", { field: t("adminSpeakingQuestion.vietnameseText") }) }),
  sampleAnswerJapanese: z.string().min(1, { message: t("adminSpeakingQuestion.validationRequired", { field: t("adminSpeakingQuestion.sampleAnswerJapanese") }) }),
  sampleAnswerVietnamese: z.string().min(1, { message: t("adminSpeakingQuestion.validationRequired", { field: t("adminSpeakingQuestion.sampleAnswerVietnamese") }) }),
  audio: z.any().refine((val) => val instanceof File, { message: t("adminSpeakingQuestion.validationRequired", { field: t("adminSpeakingQuestion.audio") }) }),
  level: z.string().min(1, { message: t("adminSpeakingQuestion.validationRequired", { field: t("adminSpeakingQuestion.level") }) }),
});

export const speakingQuestionUpdateFormSchema = (t: (key: string, params?: { field?: string }) => string) => z.object({
  japaneseText: z.string().min(1, { message: t("adminSpeakingQuestion.validationRequired", { field: t("adminSpeakingQuestion.japaneseText") }) }),
  vietnameseText: z.string().min(1, { message: t("adminSpeakingQuestion.validationRequired", { field: t("adminSpeakingQuestion.vietnameseText") }) }),
  sampleAnswerJapanese: z.string().min(1, { message: t("adminSpeakingQuestion.validationRequired", { field: t("adminSpeakingQuestion.sampleAnswerJapanese") }) }),
  sampleAnswerVietnamese: z.string().min(1, { message: t("adminSpeakingQuestion.validationRequired", { field: t("adminSpeakingQuestion.sampleAnswerVietnamese") }) }),
  audioUrl: z.union([z.string(), z.null()]).optional(),
  audioFile: z.any().optional(),
  level: z.string().min(1, { message: t("adminSpeakingQuestion.validationRequired", { field: t("adminSpeakingQuestion.level") }) }),
});

export const sentenceCreateFormSchema = (t: (key: string, params?: { field?: string }) => string) => z.object({
  japaneseText: z.string().min(1, { message: t("adminSentence.validationRequired", { field: t("adminSentence.japaneseText") }) }),
  vietnameseText: z.string().min(1, { message: t("adminSentence.validationRequired", { field: t("adminSentence.vietnameseText") }) }),
  audio: z.any().refine((val) => val instanceof File, { message: t("adminSentence.validationRequired", { field: t("adminSentence.audio") }) }),
  level: z.string().min(1, { message: t("adminSentence.validationRequired", { field: t("adminSentence.level") }) }),
});

export const sentenceUpdateFormSchema = (t: (key: string, params?: { field?: string }) => string) => z.object({
  japaneseText: z.string().min(1, { message: t("adminSentence.validationRequired", { field: t("adminSentence.japaneseText") }) }),
  vietnameseText: z.string().min(1, { message: t("adminSentence.validationRequired", { field: t("adminSentence.vietnameseText") }) }),
  audioUrl: z.union([z.string(), z.null()]).optional(),
  audioFile: z.any().optional(),
  level: z.string().min(1, { message: t("adminSentence.validationRequired", { field: t("adminSentence.level") }) }),
});

export const paragraphCreateFormSchema = (t: (key: string, params?: { field?: string }) => string) => z.object({
  japaneseText: z.string().min(1, { message: t("adminParagraph.validationRequired", { field: t("adminParagraph.japaneseText") }) }),
  vietnameseText: z.string().min(1, { message: t("adminParagraph.validationRequired", { field: t("adminParagraph.vietnameseText") }) }),
  audio: z.any().refine((val) => val instanceof File, { message: t("adminParagraph.validationRequired", { field: t("adminParagraph.audio") }) }),
  level: z.string().min(1, { message: t("adminParagraph.validationRequired", { field: t("adminParagraph.level") }) }),
  topic: z.string().min(1, { message: t("adminParagraph.validationRequired", { field: t("adminParagraph.topic") }) }),
});

export const paragraphUpdateFormSchema = (t: (key: string, params?: { field?: string }) => string) => z.object({
  japaneseText: z.string().min(1, { message: t("adminParagraph.validationRequired", { field: t("adminParagraph.japaneseText") }) }),
  vietnameseText: z.string().min(1, { message: t("adminParagraph.validationRequired", { field: t("adminParagraph.vietnameseText") }) }),
  audioUrl: z.union([z.string(), z.null()]).optional(),
  audioFile: z.any().optional(),
  level: z.string().min(1, { message: t("adminParagraph.validationRequired", { field: t("adminParagraph.level") }) }),
  topic: z.string().min(1, { message: t("adminParagraph.validationRequired", { field: t("adminParagraph.topic") }) }),
});

export const updateProfileSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(1, t("profile.validation.nameRequired")),
  email: z.string()
    .min(1, t("profile.validation.emailRequired"))
    .regex(regexEmail, t("validation.invalid-email")),
  phone: z.string()
    .min(1, t("profile.validation.phoneRequired"))
    .regex(/^\d{10,15}$/, t("profile.validation.phoneFormat")),
  avatar: z.any().optional(),
});

export const changePasswordSchema = (t: (key: string) => string) => z.object({
  oldPassword: z.string().min(1, t("profile.validation.currentPasswordRequired")),
  newPassword: z.string()
    .min(8, t("profile.validation.newPasswordMin"))
    .regex(regexPassword, t("profile.validation.passwordRequirements")),
  confirmPassword: z.string().min(1, t("profile.validation.confirmPasswordRequired")),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: t("profile.validation.passwordsMatch"),
  path: ["confirmPassword"],
});

export const userCreateFormSchema = (t: (key: string, params?: { field?: string }) => string) => z.object({
  username: z.string()
    .min(3, t("validation.username.min"))
    .max(50, t("validation.username.max"))
    .regex(regexUsername, t("validation.username.regex")),
  name: z.string()
    .min(1, { message: t("adminUsers.validationRequired", { field: t("adminUsers.name") }) }),
  email: z.string()
    .min(1, { message: t("adminUsers.validationRequired", { field: t("adminUsers.email") }) })
    .regex(regexEmail, t("validation.invalid-email")),
  phone: z.string()
    .min(1, { message: t("adminUsers.validationRequired", { field: t("adminUsers.phone") }) })
    .regex(regexPhone, t("validation.invalid-phone")),
  role: z.string()
    .min(1, { message: t("adminUsers.validationRequired", { field: t("adminUsers.role") }) }),
  password: z.string()
    .min(8, t("validation.password.min"))
    .max(50, t("validation.password.max"))
    .regex(regexPassword, t("validation.password.regex")),
});

export const forgotPasswordSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t("validation.required"))
      .email(t("validation.invalid-email")),
  });
