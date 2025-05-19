import { AdminLayout } from "@/components/layout/AdminLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { UserLayout } from "@/components/layout/UserLayout";
import { ROUTERS } from "@/constant";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Home from "@/pages/Home";
import AddLearningGoal from "@/pages/user/AddLearningGoal";
import Learn from "@/pages/user/Learn";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminFreeTopic from "./pages/admin/FreeTopic";
import AdminFreeTopicCreate from "./pages/admin/FreeTopicCreate";
import AdminFreeTopicDetail from "./pages/admin/FreeTopicDetail";
import AdminFreeTopicUpdate from "./pages/admin/FreeTopicUpdate";
import AdminGrammar from "./pages/admin/Grammar";
import AdminGrammarCreate from "./pages/admin/GrammarCreate";
import AdminGrammarDetail from "./pages/admin/GrammarDetail";
import AdminGrammarUpdate from "./pages/admin/GrammarUpdate";
import AdminParagraph from "./pages/admin/Paragraph";
import AdminParagraphCreate from "./pages/admin/ParagraphCreate";
import AdminParagraphDetail from "./pages/admin/ParagraphDetail";
import AdminParagraphUpdate from "./pages/admin/ParagraphUpdate";
import AdminSentence from "./pages/admin/Sentence";
import AdminSentenceCreate from "./pages/admin/SentenceCreate";
import AdminSentenceDetail from "./pages/admin/SentenceDetail";
import AdminSentenceUpdate from "./pages/admin/SentenceUpdate";
import AdminSpeakingQuestion from "./pages/admin/SpeakingQuestion";
import AdminSpeakingQuestionCreate from "./pages/admin/SpeakingQuestionCreate";
import AdminSpeakingQuestionDetail from "./pages/admin/SpeakingQuestionDetail";
import AdminSpeakingQuestionUpdate from "./pages/admin/SpeakingQuestionUpdate";
import UserDetail from "./pages/admin/UserDetail";
import AdminVocabulary from "./pages/admin/Vocabulary";
import AdminVocabularyCreate from "./pages/admin/VocabularyCreate";
import AdminVocabularyDetail from "./pages/admin/VocabularyDetail";
import AdminVocabularyUpdate from "./pages/admin/VocabularyUpdate";
import NotFoundPage from "./pages/NotFound";
import CheckGrammar from "./pages/user/CheckGrammar";
import LearnCommunication from "./pages/user/LearnCommunication";
import LearnCommunicationCard from "./pages/user/LearnCommunicationCard";
import LearnGrammar from "./pages/user/LearnGrammar";
import LearnGrammarCard from "./pages/user/LearnGrammarCard";
import LearnListening from "./pages/user/LearnListening";
import LearnListeningCard from "./pages/user/LearnListeningCard";
import LearnPronunciation from "./pages/user/LearnPronunciation";
import LearnPronunciationCard from "./pages/user/LearnPronunciationCard";
import LearnQuestion from "./pages/user/LearnQuestion";
import LearnQuestionCard from "./pages/user/LearnQuestionCard";
import LearnVocabulary from "./pages/user/LearnVocabulary";
import LearnVocabularyCard from "./pages/user/LearnVocabularyCard";
import StreakDay from "./pages/user/StreakDay";
import UserProgress from "./pages/user/UserProgress";
import { useUserStore } from "./store/useUserStore";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  return user ? <>{children}</> : <Navigate to={ROUTERS.LOGIN} />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  return user?.role === "ADMIN" ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTERS.HOME} />
  );
};

const Router = () => {
  return (
    <Routes>
      {/* Default routes */}
      <Route element={<DefaultLayout />}>
        <Route path={ROUTERS.HOME} element={<Home />} />
      </Route>

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTERS.LOGIN} element={<Login />} />
        <Route path={ROUTERS.REGISTER} element={<Register />} />
      </Route>

      {/* Admin routes */}
      <Route
        element={
          <PrivateRoute>
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          </PrivateRoute>
        }
      >
        <Route path={ROUTERS.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        <Route path={ROUTERS.ADMIN_USERS} element={<AdminUsers />} />
        <Route path={ROUTERS.ADMIN_USER_DETAIL} element={<UserDetail />} />
        <Route path={ROUTERS.ADMIN_VOCABULARY} element={<AdminVocabulary />} />
        <Route path={ROUTERS.ADMIN_GRAMMAR} element={<AdminGrammar />} />
        <Route path={ROUTERS.ADMIN_FREE_TOPICS} element={<AdminFreeTopic />} />
        <Route path={ROUTERS.ADMIN_QUESTIONS} element={<AdminSpeakingQuestion />} />
        <Route path={ROUTERS.ADMIN_SENTENCES} element={<AdminSentence />} />
        <Route path={ROUTERS.ADMIN_PARAGRAPHS} element={<AdminParagraph />} />
        <Route path={ROUTERS.ADMIN_VOCABULARY_DETAIL} element={<AdminVocabularyDetail />} />
        <Route path={ROUTERS.ADMIN_VOCABULARY_CREATE} element={<AdminVocabularyCreate />} />
        <Route path={ROUTERS.ADMIN_VOCABULARY_EDIT} element={<AdminVocabularyUpdate />} />
        <Route path={ROUTERS.ADMIN_GRAMMAR_DETAIL} element={<AdminGrammarDetail />} />
        <Route path={ROUTERS.ADMIN_GRAMMAR_CREATE} element={<AdminGrammarCreate />} />
        <Route path={ROUTERS.ADMIN_GRAMMAR_EDIT} element={<AdminGrammarUpdate />} />
        <Route path={ROUTERS.ADMIN_FREE_TOPICS_CREATE} element={<AdminFreeTopicCreate />} />
        <Route path={ROUTERS.ADMIN_FREE_TOPICS_DETAIL} element={<AdminFreeTopicDetail />} />
        <Route path={ROUTERS.ADMIN_FREE_TOPICS_EDIT} element={<AdminFreeTopicUpdate />} />
        <Route path={ROUTERS.ADMIN_QUESTIONS_CREATE} element={<AdminSpeakingQuestionCreate />} />
        <Route path={ROUTERS.ADMIN_QUESTIONS_DETAIL} element={<AdminSpeakingQuestionDetail />} />
        <Route path={ROUTERS.ADMIN_QUESTIONS_EDIT} element={<AdminSpeakingQuestionUpdate />} />
        <Route path={ROUTERS.ADMIN_SENTENCES_CREATE} element={<AdminSentenceCreate />} />
        <Route path={ROUTERS.ADMIN_SENTENCES_DETAIL} element={<AdminSentenceDetail />} />
        <Route path={ROUTERS.ADMIN_SENTENCES_EDIT} element={<AdminSentenceUpdate />} />
        <Route path={ROUTERS.ADMIN_PARAGRAPHS_CREATE} element={<AdminParagraphCreate />} />
        <Route path={ROUTERS.ADMIN_PARAGRAPHS_DETAIL} element={<AdminParagraphDetail />} />
        <Route path={ROUTERS.ADMIN_PARAGRAPHS_EDIT} element={<AdminParagraphUpdate />} />
      </Route>

      {/* User routes */}
      <Route element={<UserLayout />}>
        {/* Public route */}
        <Route path={ROUTERS.LEARN} element={<Learn />} />
        <Route path={ROUTERS.LEARN_VOCABULARY} element={<LearnVocabulary />} />
        <Route path={ROUTERS.LEARN_GRAMMAR} element={<LearnGrammar />} />
        <Route path={ROUTERS.LEARN_COMMUNICATION} element={<LearnCommunication />} />
        <Route path={ROUTERS.LEARN_LISTENING} element={<LearnListening />} />
        <Route path={ROUTERS.LEARN_PRONUNCIATION} element={<LearnPronunciation />} />
        <Route path={ROUTERS.LEARN_QUESTION} element={<LearnQuestion />} />
        <Route path={ROUTERS.VOCABULARY_FLASHCARD} element={<LearnVocabularyCard />} />
        <Route path={ROUTERS.GRAMMAR_FLASHCARD} element={<LearnGrammarCard />} />
        <Route path={ROUTERS.PRONUNCIATION_FLASHCARD} element={<LearnPronunciationCard />} />
        <Route path={ROUTERS.LISTENING_FLASHCARD} element={<LearnListeningCard />} />
        <Route path={ROUTERS.COMMUNICATION_FLASHCARD} element={<LearnCommunicationCard />} />
        <Route path={ROUTERS.QUESTION_FLASHCARD} element={<LearnQuestionCard />} />
        <Route path={ROUTERS.ACHIEVEMENT} element={<>achievement</>} />
        <Route path={ROUTERS.PROGRESS} element={<UserProgress />} />
        <Route path={ROUTERS.CHECK_GRAMMAR} element={<CheckGrammar />} />
        {/* Protected user routes */}
        <Route
          element={
            <PrivateRoute>
              <Route path={ROUTERS.USER_PROFILE} element={<Home />} />
              <Route path={ROUTERS.USER_SETTINGS} element={<Home />} />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path={ROUTERS.LEARNING_GOAL} element={<AddLearningGoal />} />
      <Route path={ROUTERS.STREAK_DAY} element={<StreakDay />} />

      {/* 404 Routes */}
      <Route path={ROUTERS.NOT_FOUND} element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />


    </Routes>
  );
};

export default Router;
