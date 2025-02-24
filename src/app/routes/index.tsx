import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import { RoutesEnum } from "@/app/constants/core";

import { RoutesLayout, Loader } from "@/shared/ui";

const AuthPage = lazy(() => import("@/pages/auth"));
const GoalCreatePage = lazy(() => import("@/pages/goal-create"));
const HomePage = lazy(() => import("@/pages/home"));
const ExplorePage = lazy(() => import("@/pages/explore"));
const StatisticsPage = lazy(() => import("@/pages/statistics"));
const GoalsPage = lazy(() => import("@/pages/goals"));
const GoalPage = lazy(() => import("@/pages/goal"));
const ProfilePage = lazy(() => import("@/pages/profile"));

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
    path: RoutesEnum.GoalCreate,
    element: (
      <Suspense fallback={<Loader />}>
        <GoalCreatePage />
      </Suspense>
    ),
  },
  {
    path: `${RoutesEnum.Goals}/:id`,
    element: (
      <Suspense fallback={<Loader />}>
        <GoalPage />
      </Suspense>
    ),
  },
  {
    element: <RoutesLayout />,
    children: [
      {
        path: RoutesEnum.Home,
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: RoutesEnum.Explore,
        element: (
          <Suspense fallback={<Loader />}>
            <ExplorePage />
          </Suspense>
        ),
      },
      {
        path: RoutesEnum.Statistics,
        element: (
          <Suspense fallback={<Loader />}>
            <StatisticsPage />
          </Suspense>
        ),
      },
      {
        path: RoutesEnum.Goals,
        element: (
          <Suspense fallback={<Loader />}>
            <GoalsPage />
          </Suspense>
        ),
      },
      {
        path: RoutesEnum.Profile,
        element: (
          <Suspense fallback={<Loader />}>
            <ProfilePage />
          </Suspense>
        ),
      },
    ],
  },
]);
