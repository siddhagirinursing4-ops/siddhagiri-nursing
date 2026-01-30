import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { initSessionTimeout } from '../../lib/security';
import toast from 'react-hot-toast';

export function ProtectedRoute({ allowedRoles = [] }) {
  const { isAuthenticated, user, getMe, initializeAuth, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [showSessionWarning, setShowSessionWarning] = useState(false);

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

  // Setup session timeout
  useEffect(() => {
    if (isAuthenticated) {
      const cleanup = initSessionTimeout(
        () => {
          // On timeout
          toast.error('Session expired. Please login again.');
          logout();
        },
        () => {
          // On warning (5 minutes before timeout)
          setShowSessionWarning(true);
          toast('Your session will expire in 5 minutes', {
            icon: '⚠️',
            duration: 10000
          });
        },
        30 // 30 minutes timeout
      );

      return cleanup;
    }
  }, [isAuthenticated, logout]);

  // Extend session on user activity
  const extendSession = () => {
    setShowSessionWarning(false);
  };

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

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      <Outlet />
      {showSessionWarning && (
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-6 py-4 rounded-lg shadow-lg z-50">
          <p className="font-semibold">Session Expiring Soon</p>
          <p className="text-sm">Your session will expire in 5 minutes</p>
          <button
            onClick={extendSession}
            className="mt-2 px-4 py-1 bg-white text-yellow-600 rounded hover:bg-yellow-50 text-sm font-medium"
          >
            Stay Logged In
          </button>
        </div>
      )}
    </>
  );
}

