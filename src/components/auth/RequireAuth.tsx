import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const hasCompletedSurvey = localStorage.getItem("hasCompletedSurvey");
  const location = useLocation();

  if (!token && !refreshToken && location.pathname !== "/auth") {
    return <Navigate to="/auth" replace />;
  }

  if (
    location.pathname !== "/survey" &&
    location.pathname !== "/auth" &&
    hasCompletedSurvey === "false"
  ) {
    return <Navigate to="/survey" replace />;
  }

  return children;
};

export default RequireAuth;
