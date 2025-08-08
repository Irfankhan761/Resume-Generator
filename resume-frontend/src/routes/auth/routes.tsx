import { RouteObject } from "react-router-dom";

import SignupPage from "./components/signup/signup";
import LoginPage from "./components/login/Login";

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
];
