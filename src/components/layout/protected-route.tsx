import React from 'react';
import type { ReactNode } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { Navigate, useLocation } from 'react-router';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
