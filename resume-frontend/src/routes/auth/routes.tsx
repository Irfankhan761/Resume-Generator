import { RouteObject } from 'react-router-dom';

import SignupPage from './auth-pages/signup';
import LoginPage from './auth-pages/Login';
import ForgotPasswordPage from './auth-pages/forgot-password';
import ResetPasswordPage from './auth-pages/reset-password';

export const authRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },

  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
];
