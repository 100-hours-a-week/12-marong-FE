import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import MainLayout from "@/components/layout/MainLayout";
import ManittoPage from "@/pages/manitto/ManittoPage";
import RecommendPage from "@/pages/recommend/RecommendPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import LoginPage from "@/pages/login/LoginPage";
import SurveyPage from "@/pages/survey/SurveyPage";
import FeedCreatePage from "@/pages/feed/FeedCreate";
import HistoryPage from "@/pages/history/HistoryPage";

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        path: "/auth",
        Component: LoginPage,
      },
      {
        path: "/survey",
        Component: SurveyPage,
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
        path: "/history",
        Component: HistoryPage,
      },
      {
        path: "/recommend",
        Component: RecommendPage,
      },
      {
        path: "/profile",
        Component: ProfilePage,
      },
      {
        path: "/home/feed/create",
        Component: FeedCreatePage,
      },
      {
        path: "*",
        element: React.createElement(Navigate, { to: "/home", replace: true }),
      },
    ],
  },
]);
