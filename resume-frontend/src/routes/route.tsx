import { RouteObject } from "react-router-dom";
import { Home } from "./home/home";
import { CV } from "./cv-builder/CV";
import { authRoutes } from "./auth/routes";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create-cv",
    element: <CV />,
  },
  ...authRoutes,
];
