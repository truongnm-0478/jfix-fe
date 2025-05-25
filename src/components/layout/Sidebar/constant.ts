import { ROUTERS } from "@/constant";
import {
  AudioLines,
  Bell,
  Book,
  BookA,
  BookType,
  CheckCheck,
  ListTodo,
  MicVocal,
  ScrollText,
  Shield,
  SquareKanban,
  User2,
  Users,
  WrapText
} from "lucide-react";

export const MENU_ITEMS = [
  {
    icon: SquareKanban,
    label: "sidebar.dashboard",
    path: ROUTERS.ADMIN_DASHBOARD,
    roles: ["ADMIN"],
    mobile: false,
  },
  {
    icon: Bell,
    label: "sidebar.notifications",
    path: ROUTERS.ADMIN_NOTIFICATIONS,
    roles: ["ADMIN"],
    mobile: false,
  },
  {
    icon: Users,
    label: "sidebar.userManagement",
    path: ROUTERS.ADMIN_USERS,
    roles: ["ADMIN"],
    mobile: false,
  },
  {
    icon: BookA,
    label: "sidebar.vocabularyManagement",
    path: ROUTERS.ADMIN_VOCABULARY,
    roles: ["ADMIN"],
    mobile: false,
  },
  {
    icon: BookType,
    label: "sidebar.grammarManagement",
    path: ROUTERS.ADMIN_GRAMMAR,
    roles: ["ADMIN"],
    mobile: false,
  },
  {
    icon: AudioLines,
    label: "sidebar.freeTopicManagement",
    path: ROUTERS.ADMIN_FREE_TOPICS,
    roles: ["ADMIN"],
    mobile: false,
  },
  {
    icon: MicVocal,
    label: "sidebar.questionManagement",
    path: ROUTERS.ADMIN_QUESTIONS,
    roles: ["ADMIN"],
    mobile: false,
  },
  {
    icon: WrapText,
    label: "sidebar.sentenceManagement",
    path: ROUTERS.ADMIN_SENTENCES,
    roles: ["ADMIN"],
    mobile: false,
  },
  {
    icon: ScrollText,
    label: "sidebar.paragraphManagement",
    path: ROUTERS.ADMIN_PARAGRAPHS,
    roles: ["ADMIN"],
    mobile: false,
  },
  {
    icon: Book,
    label: "sidebar.learningResources",
    path: ROUTERS.LEARNING_RESOURCES,
    roles: ["USER"],
    mobile: true,
    isLearningGoal: false
  },
  {
    icon: Book,
    label: "sidebar.study",
    path: ROUTERS.LEARN,
    roles: ["USER"],
    mobile: true,
  },
  {
    icon: CheckCheck,
    label: "sidebar.checkGrammar",
    path: ROUTERS.CHECK_GRAMMAR,
    roles: ["USER"],
    mobile: true,
  },
  {
    icon: Shield,
    label: "sidebar.userRanking",
    path: ROUTERS.USER_RANKING,
    roles: ["USER"],
    mobile: true,
  },
  {
    icon: ListTodo,
    label: "sidebar.progress",
    path: ROUTERS.PROGRESS,
    roles: ["USER"],
    mobile: true,
  },
  {
    icon: User2,
    label: "sidebar.profile",
    path: ROUTERS.USER_SETTING + "/" + ROUTERS.USER_PROFILE,
    roles: ["USER"],
    mobile: true,
  },
  {
    icon: User2,
    label: "sidebar.adminProfile",
    path: ROUTERS.ADMIN_USER_SETTING + "/" + ROUTERS.USER_PROFILE,
    roles: ["ADMIN"],
    mobile: true,
  },
  
];

export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English", flag: "/app/images/front/flag-en.svg" },
  { value: "ja", label: "日本語", flag: "/app/images/front/flag-jp.svg" },
  { value: "vi", label: "Tiếng Việt", flag: "/app/images/front/flag-vi.svg" },
];
