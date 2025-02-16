import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Login } from "../pages/(auth)/Login";
import { SignUp } from "../pages/(auth)/SignUp";
import { Mypage } from "../pages/Mypage";
import { Home } from "../pages/Home";
import { useAuthContext } from "../context/useAuthContext";
import { NewsDetail } from "../pages/NewsDetail";
import { MypageSkeleton } from "../components/mypage/MypageSkeleton";

export const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const ProtectedRoute = () => {
    if (isLoading) {
      return <MypageSkeleton />;
    }
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return <Outlet />;
  };

  // 로그인 상태에서 접근 할 수 없는 페이지
  const PublicRoute = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  };
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/mypage" element={<Mypage />} />
      </Route>
      {/* Common Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/newsDetail/:id" element={<NewsDetail />} />
      {/* 추가해야함 */}
      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
