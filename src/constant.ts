export const enum ROUTERS {
  // Default
  DEFAULT = "/",
  ABOUT = "/about",
  CONTACT = "/contact",
  HOME = "/",
  NOT_FOUND = "/404",

  // Auth
  LOGIN = "/login",
  REGISTER = "/register",
  FORGOT_PASSWORD = "/forgot-password",

  // User
  USER_PROFILE = "/profile",
  USER_SETTINGS = "/settings",

  // Admin
  ADMIN_DASHBOARD = "/admin/dashboard",
  ADMIN_USERS = "/admin/users",
  ADMIN_SETTINGS = "/admin/settings",
  BLANK_PAGE = "admin/blank_page",
  UNAUTHORIZED = "admin/403_unauthorized",

  // Learning
  LEARN = "/learn",
  LEARN_VOCABULARY = "/learn/vocabulary",
  LEARN_GRAMMAR = "/learn/grammar",
  LEARN_COMMUNICATION = "/learn/communication",
  LEARN_LISTENING = "/learn/listening",
  LEARN_PRONUNCIATION = "/learn/pronunciation",
  LEARN_QUESTION = "/learn/question",

  // Learning Goal
  LEARNING_GOAL = "/learning-goal",

  // Achievement
  ACHIEVEMENT = "/achievement",
  STREAK_DAY = "/streak-day",

  // Flashcard
  VOCABULARY_FLASHCARD = "/learn/vocabulary/flashcard",
  GRAMMAR_FLASHCARD = "/learn/grammar/flashcard",
  COMMUNICATION_FLASHCARD = "/learn/communication/flashcard",
  LISTENING_FLASHCARD = "/learn/listening/flashcard",
  PRONUNCIATION_FLASHCARD = "/learn/pronunciation/flashcard",
  QUESTION_FLASHCARD = "/learn/question/flashcard",

  // Japanese Chat
  JAPANESE_CHAT = "/learn/communication/chat",
}

export const enum STORAGE_VAR {
  User = "jfix-user",
  AccessToken = "jfix-access-token",
  RefreshToken = "jfix-refresh-token",
  Language = "jfix-language",
  JapaneseListeningExerciseState = "japanese-listening-exercise-state",
  JapaneseChatMessages = "japanese_chat_messages",
  JapaneseChatTopic = "japanese_chat_topic",
  StudyMode = "jfix_study_mode",
}

export const enum ROLE {
  ADMIN = "admin",
}

export const MAX_FILE_SIZE = 1024 * 1024; // 1MB
export const ALLOWED_TYPES = ["text/csv"];


export const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const regexUsername = /^[a-zA-Z0-9_]+$/;
export const regexPhone = /^\d{10}$/;
export const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const LEVELS = ["N1", "N2", "N3", "N4", "N5", "FREE"] as const;

export const TOTAL_VOCAB = 800;
export const MIN_DAYS = 20;
export const MAX_MESSAGES = 5;