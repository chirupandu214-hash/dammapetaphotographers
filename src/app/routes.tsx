import { createBrowserRouter } from "react-router-dom";

import { adminResources } from "@/config/resources";

import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ResourcePage } from "@/components/crud/ResourcePage";

import LoginPage from "@/pages/auth/LoginPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ChangePasswordPage } from "@/pages/auth/ChangePasswordPage";

import { DashboardPage } from "@/pages/dashboard/DashboardPage";

import { MyProfilePage } from "@/pages/members/MyProfilePage";
import { MemberCardPage } from "@/pages/members/MemberCardPage";

import { ReportsPage } from "@/pages/reports/ReportsPage";

import { SettingsPage } from "@/pages/settings/SettingsPage";

import { QRVerificationPage } from "@/pages/qr/QRVerificationPage";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },

  {
    path: "/change-password",
    element: <ChangePasswordPage />,
  },

  {
    path: "/qr-verification",
    element: <QRVerificationPage />,
  },


  {
    path: "/",

    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),

    children: [

      {
        index: true,
        element: <DashboardPage />,
      },


      {
        path: "my-profile",
        element: <MyProfilePage />,
      },


      {
        path: "member-card",
        element: <MemberCardPage />,
      },


      {
        path: "reports",

        element: (
          <ProtectedRoute adminOnly>
            <ReportsPage />
          </ProtectedRoute>
        ),
      },


      {
        path: "settings",

        element: (
          <ProtectedRoute adminOnly>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },


      ...adminResources.map((resource) => ({
        path: resource.path,

        element: (
          <ProtectedRoute adminOnly>
            <ResourcePage resource={resource} />
          </ProtectedRoute>
        ),
      })),

    ],
  },
]);
