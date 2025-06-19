import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import MainLayout from "@/components/layout/MainLayout";
import ManittoPage from "@/pages/manitto/ManittoPage";
import RecommendPage from "@/pages/recommend/RecommendPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import LoginPage from "@/pages/login/LoginPage";

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        path: "/auth",
        Component: LoginPage,
      },
      {
        path: "/home",
        Component: HomePage,
      },
      {
        path: "/manitto",
        Component: ManittoPage,
      },
      {
        path: "/recommend",
        Component: RecommendPage,
      },
      {
        path: "/profile",
        Component: ProfilePage,
      },
    ],
  },
]);
