import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Image,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  UserCircle,
  Home,
  Type
} from 'lucide-react';
import toast from 'react-hot-toast';

export function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Programmes', href: '/admin/programmes', icon: BookOpen },
    { name: 'Mandates', href: '/admin/mandates', icon: FileText },
    { name: 'Gallery', href: '/admin/gallery', icon: Image },
    { name: 'Dynamic Content', href: '/admin/dynamic-content', icon: Type },
    { name: 'Applications', href: '/admin/applications', icon: Users },
  ];

  if (user?.role === 'superadmin') {
    navigation.push({ name: 'Admin Users', href: '/admin/users', icon: Settings });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Professional Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-28 px-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png"
              alt="SNIK" 
              className="h-20 w-20 object-contain" 
            />
            <div>
              <h1 className="text-sm font-bold text-slate-900">Admin Panel</h1>
              <p className="text-xs text-slate-500">SNIK</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 font-medium'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
              <UserCircle className="w-5 h-5 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`lg:pl-64 transition-all duration-300`}>
        {/* Professional Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6 sticky top-0 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">Siddhagiri Nursing Institute</p>
                <p className="text-xs text-slate-500">Admin Control Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                to="/"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
              >
                <Home className="w-4 h-4" />
                Visit Site
              </Link>
              {user?.lastLogin && (
                <span className="text-xs text-slate-500 hidden lg:block">
                  {new Date(user.lastLogin).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 min-h-[calc(100vh-8rem)]">{children}</main>

        {/* Professional Footer */}
        <footer className="bg-white border-t border-slate-200 py-4 px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <p>© 2026 Siddhagiri Nursing Institute. All rights reserved.</p>
            <p>Admin Panel v1.0</p>
          </div>
        </footer>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
