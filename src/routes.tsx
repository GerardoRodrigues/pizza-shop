import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { SignIn } from "./pages/auth/sign-in/sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children:[
      {
        path: "/",
        element: <Dashboard />
      }
    ]
  },
  {
    path: "/sing-in",
    element: <AuthLayout />,
    children:[
      {
        path: "/sing-in",
        element: <SignIn />
      }
    ]
  }
]);
