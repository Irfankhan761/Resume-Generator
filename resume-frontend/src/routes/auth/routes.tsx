import { RouteObject } from 'react-router-dom';

import SignupPage from './components/signup/signup';
import LoginPage from './components/login/Login';
import ForgotPasswordPage from './components/forgot-password/forgot-password';
import ResetPasswordPage from './components/rest-password/reset-password';

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
