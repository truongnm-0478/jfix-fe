import { AdminLayout } from "@/components/layout/AdminLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { UserLayout } from "@/components/layout/UserLayout";
import { ROUTERS } from "@/constant";
import AdminDashboard from "@/pages/admin/Dashboard";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Home from "@/pages/Home";
import AddLearningGoal from "@/pages/user/AddLearningGoal";
import Learn from "@/pages/user/Learn";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFound";
import LearnGrammar from "./pages/user/LearnGrammar";
import LearnPronunciation from "./pages/user/LearnPronunciation";
import LearnQuestion from "./pages/user/LearnQuestion";
import LearnVocabulary from "./pages/user/LearnVocabulary";
import { StreakDay } from "./pages/user/StreakDay";
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
      </Route>

      {/* User routes */}
      <Route element={<UserLayout />}>
        {/* Public route */}
        <Route path={ROUTERS.LEARN} element={<Learn />} />
        <Route path={ROUTERS.LEARN_VOCABULARY} element={<LearnVocabulary />} />
        <Route path={ROUTERS.LEARN_GRAMMAR} element={<LearnGrammar />} />
        <Route path={ROUTERS.LEARN_COMMUNICATION} element={<>learn communication</>} />
        <Route path={ROUTERS.LEARN_LISTENING} element={<>learn listening</>} />
        <Route path={ROUTERS.LEARN_PRONUNCIATION} element={<LearnPronunciation />} />
        <Route path={ROUTERS.LEARN_QUESTION} element={<LearnQuestion />} />

        <Route path={ROUTERS.ACHIEVEMENT} element={<>achievement</>} />

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
