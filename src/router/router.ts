import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import MainLayout from "@/components/layout/MainLayout";
import ManittoPage from "@/pages/manitto/ManittoPage";
import RecommendPage from "@/pages/recommend/RecommendPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import { navItems } from "@/constants/navItems";

const pageComponents: Record<string, React.ComponentType> = {
  "/home": HomePage,
  "/manitto": ManittoPage,
  "/recommend": RecommendPage,
  "/profile": ProfilePage,
};

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: navItems.map((item) => ({
      path: item.href,
      Component: pageComponents[item.href],
    })),
  },
]);
