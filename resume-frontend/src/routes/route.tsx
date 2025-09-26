import { RouteObject } from 'react-router-dom';

// --- Core App Pages ---
import { Home } from './home/home';
import { CV } from './cv-builder/CV';
import SettingsPage from './cv-builder/components/settings/settings';

// --- Authentication Pages ---
import { authRoutes } from './auth/routes';

// --- Helper Components ---
import { ProtectedRoute } from 'core/components/protected-route';

export const routes: RouteObject[] = [
  // --- Public Routes ---
  {
    path: '/',
    element: <Home />,
  },

  // --- Protected Routes (User must be logged in) ---
  {
    path: '/create-cv',
    element: (
      <ProtectedRoute>
        <CV /> {/* CV component now internally includes DashboardLayout */}
      </ProtectedRoute>
    ),
  },
  {
    path: '/create-cv/settings',
    element: (
      <ProtectedRoute>
        <SettingsPage />{' '}
        {/* SettingsPage now internally includes DashboardLayout */}
      </ProtectedRoute>
    ),
  },

  // --- Authentication Routes (Login, Signup, Reset Password, etc.) ---
  ...authRoutes,
];
