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
import NotFoundPage from "./pages/NotFound";
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
