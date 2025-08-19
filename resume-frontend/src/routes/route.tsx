import { RouteObject } from 'react-router-dom';
import { Home } from './home/home';
import { authRoutes } from './auth/routes';
import { CV } from './cv-builder/CV';
import { ProtectedRoute } from 'core/components/protected-route';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/create-cv',
    element: (
      <ProtectedRoute>
        <CV />
      </ProtectedRoute>
    ),
  },
  ...authRoutes,
];
