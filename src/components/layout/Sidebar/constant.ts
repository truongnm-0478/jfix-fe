import { ROUTERS } from "@/constant";
import {
  AudioLines,
  Bell,
  Book,
  BookA,
  BookOpen,
  BookType,
  CheckCheck,
  Home,
  ListTodo,
  MicVocal,
  ScrollText,
  Settings,
  SquareKanban,
  User2,
  Users,
  WrapText,
} from "lucide-react";

export const MENU_ITEMS = [
  {
    icon: SquareKanban,
    label: "sidebar.dashboard",
    path: ROUTERS.ADMIN_DASHBOARD,
    roles: ["ADMIN"],
  },
  {
    icon: Users,
    label: "sidebar.userManagement",
    path: ROUTERS.ADMIN_USERS,
    roles: ["ADMIN"],
  },
  {
    icon: Settings,
    label: "sidebar.adminSettings",
    path: ROUTERS.ADMIN_SETTINGS,
    roles: ["ADMIN"],
  },
  {
    icon: BookOpen,
    label: "sidebar.lessonManagement",
    path: ROUTERS.ADMIN_LESSONS,
    roles: ["ADMIN"],
  },
  {
    icon: BookA,
    label: "sidebar.vocabularyManagement",
    path: ROUTERS.ADMIN_VOCABULARY,
    roles: ["ADMIN"],
  },
  {
    icon: BookType,
    label: "sidebar.grammarManagement",
    path: ROUTERS.ADMIN_GRAMMAR,
    roles: ["ADMIN"],
  },
  {
    icon: AudioLines,
    label: "sidebar.freeTopicManagement",
    path: ROUTERS.ADMIN_FREE_TOPICS,
    roles: ["ADMIN"],
  },
  {
    icon: MicVocal,
    label: "sidebar.questionManagement",
    path: ROUTERS.ADMIN_QUESTIONS,
    roles: ["ADMIN"],
  },
  {
    icon: WrapText,
    label: "sidebar.sentenceManagement",
    path: ROUTERS.ADMIN_SENTENCES,
    roles: ["ADMIN"],
  },
  {
    icon: ScrollText,
    label: "sidebar.paragraphManagement",
    path: ROUTERS.ADMIN_PARAGRAPHS,
    roles: ["ADMIN"],
  },
  {
    icon: Home,
    label: "sidebar.home",
    path: ROUTERS.HOME,
    roles: ["USER"],
  },
  {
    icon: Bell,
    label: "sidebar.notifications",
    path: ROUTERS.NOTIFICATIONS,
    roles: ["USER"],
  },
  {
    icon: Book,
    label: "sidebar.study",
    path: ROUTERS.LEARN,
    roles: ["USER"],
  },
  {
    icon: CheckCheck,
    label: "sidebar.checkGrammar",
    path: ROUTERS.CHECK_GRAMMAR,
    roles: ["USER"],
  },
  {
    icon: ListTodo,
    label: "sidebar.progress",
    path: ROUTERS.PROGRESS,
    roles: ["USER"],
  },
  {
    icon: User2,
    label: "sidebar.profile",
    path: ROUTERS.USER_PROFILE,
    roles: ["USER", "ADMIN"],
  },
  
];

export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English", flag: "/app/images/front/flag-en.svg" },
  { value: "ja", label: "日本語", flag: "/app/images/front/flag-jp.svg" },
  { value: "vi", label: "Tiếng Việt", flag: "/app/images/front/flag-vi.svg" },
];
