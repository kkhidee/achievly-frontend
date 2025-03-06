import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { RoutesEnum } from "@/app/constants/core";

import { CoreLayout, Loader } from "@/shared/ui";

const AuthPage = lazy(() => import("@/pages/auth"));
const GoalsDashboardPage = lazy(() => import("@/pages/goals-dashboard"));
const GoalsCalendarPage = lazy(() => import("@/pages/goals-calendar"));
const GoalsPublicPage = lazy(() => import("@/pages/goals-public"));
const GoalsStatisticsPage = lazy(() => import("@/pages/goals-statistics"));

export const routes = createBrowserRouter([
  {
    path: RoutesEnum.Auth,
    element: (
      <Suspense fallback={<Loader />}>
        <AuthPage />
      </Suspense>
    ),
  },
  {
    element: <CoreLayout />,
    children: [
      {
        path: RoutesEnum.Home,
        element: <Navigate to={RoutesEnum.GoalsDashboard} />,
      },
      {
        path: RoutesEnum.GoalsDashboard,
        element: (
          <Suspense fallback={<Loader />}>
            <GoalsDashboardPage />
          </Suspense>
        ),
      },
      {
        path: RoutesEnum.GoalsCalendar,
        element: (
          <Suspense fallback={<Loader />}>
            <GoalsCalendarPage />
          </Suspense>
        ),
      },
      {
        path: RoutesEnum.GoalsPublic,
        element: (
          <Suspense fallback={<Loader />}>
            <GoalsPublicPage />
          </Suspense>
        ),
      },
      {
        path: RoutesEnum.GoalsStatistics,
        element: (
          <Suspense fallback={<Loader />}>
            <GoalsStatisticsPage />
          </Suspense>
        ),
      },
    ],
  },
]);
