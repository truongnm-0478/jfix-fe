export const enum ROUTERS {
  // Default
  DEFAULT = "/",
  ABOUT = "/about",
  CONTACT = "/contact",
  HOME = "/home",
  NOT_FOUND = "/404",
  NOTIFICATIONS = "/notifications",
  USER_RANKING = "/user-ranking",

  // Auth
  LOGIN = "/login",
  REGISTER = "/register",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password",

  // Admin
  ADMIN_DASHBOARD = "/admin/dashboard",
  ADMIN_SETTINGS = "/admin/settings",
  BLANK_PAGE = "admin/blank_page",
  UNAUTHORIZED = "admin/403_unauthorized",
  ADMIN_LESSONS = "/admin/lessons",
  ADMIN_NOTIFICATIONS = "/admin/notifications",

  ADMIN_USERS = "/admin/users",
  ADMIN_USER_DETAIL = "/admin/users/:id",
  ADMIN_USER_CREATE = "/admin/users/create",

  ADMIN_VOCABULARY = "/admin/vocabulary",
  ADMIN_VOCABULARY_DETAIL = "/admin/vocabulary/:id",
  ADMIN_VOCABULARY_EDIT = "/admin/vocabulary/edit/:id",
  ADMIN_VOCABULARY_CREATE = "/admin/vocabulary/create",

  ADMIN_GRAMMAR = "/admin/grammar",
  ADMIN_GRAMMAR_DETAIL = "/admin/grammar/:id",
  ADMIN_GRAMMAR_EDIT = "/admin/grammar/edit/:id",
  ADMIN_GRAMMAR_CREATE = "/admin/grammar/create",

  ADMIN_FREE_TOPICS = "/admin/free-topics",
  ADMIN_FREE_TOPICS_DETAIL = "/admin/free-topics/:id",
  ADMIN_FREE_TOPICS_EDIT = "/admin/free-topics/edit/:id",
  ADMIN_FREE_TOPICS_CREATE = "/admin/free-topics/create",

  ADMIN_QUESTIONS = "/admin/questions",
  ADMIN_QUESTIONS_DETAIL = "/admin/questions/:id",
  ADMIN_QUESTIONS_EDIT = "/admin/questions/edit/:id",
  ADMIN_QUESTIONS_CREATE = "/admin/questions/create",

  ADMIN_SENTENCES = "/admin/sentences",
  ADMIN_SENTENCES_DETAIL = "/admin/sentences/:id",
  ADMIN_SENTENCES_EDIT = "/admin/sentences/edit/:id",
  ADMIN_SENTENCES_CREATE = "/admin/sentences/create",

  ADMIN_PARAGRAPHS = "/admin/paragraphs",
  ADMIN_PARAGRAPHS_DETAIL = "/admin/paragraphs/:id",
  ADMIN_PARAGRAPHS_EDIT = "/admin/paragraphs/edit/:id",
  ADMIN_PARAGRAPHS_CREATE = "/admin/paragraphs/create",

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
  PROGRESS = "/progress",
  CHECK_GRAMMAR = "/check-grammar",

  // Flashcard
  VOCABULARY_FLASHCARD = "/learn/vocabulary/flashcard",
  GRAMMAR_FLASHCARD = "/learn/grammar/flashcard",
  COMMUNICATION_FLASHCARD = "/learn/communication/flashcard",
  LISTENING_FLASHCARD = "/learn/listening/flashcard",
  PRONUNCIATION_FLASHCARD = "/learn/pronunciation/flashcard",
  QUESTION_FLASHCARD = "/learn/question/flashcard",

  // Japanese Chat
  JAPANESE_CHAT = "/learn/communication/chat",

  // Setting
  USER_SETTING = "/setting",
  USER_PROFILE = "profile",
  UPDATE_PROFILE = "update",
  CHANGE_PASSWORD = "password",
  UPDATE_LEARNING_GOAL = "learning-goal",
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
  TablePageSize = "jfix_table_page_size",
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
export const levels = ["N1", "N2", "N3", "N4", "N5"] as const;
export const chapters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"] as const;
export const sections = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"] as const;

export const TOTAL_VOCAB = 800;
export const MIN_DAYS = 20;
export const MAX_MESSAGES = 5;