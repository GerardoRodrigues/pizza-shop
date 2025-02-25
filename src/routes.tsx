import { createBrowserRouter } from "react-router-dom";

import { Dashboard } from "./pages/app/dashboard/dashboard";
import { SignIn } from "./pages/auth/sign-in/sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/sing-in",
    element: <SignIn />
  }
]);
