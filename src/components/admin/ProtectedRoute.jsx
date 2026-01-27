import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export function ProtectedRoute({ allowedRoles = [] }) {
  const { isAuthenticated, user, getMe, initializeAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      // First, initialize auth from localStorage
      if (!authChecked) {
        initializeAuth();
        setAuthChecked(true);
      }

      // Check if we have a token in localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      // If we have a token but no user data, fetch it
      if (token && !user) {
        try {
          await getMe();
        } catch (error) {
          console.error('Auth verification failed:', error);
        }
      }
      
      setLoading(false);
    };

    verifyAuth();
  }, [user, getMe, initializeAuth, authChecked]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c1829] via-[#1e3a5f] to-[#0c1829]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Check for token in localStorage as final check
  const token = localStorage.getItem('token');
  if (!token || !isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
