import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/axios';
import { 
  BookOpen, 
  FileText, 
  Image, 
  Users, 
  Calendar,
  Mail,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Activity,
  Shield,
  Type,
  GraduationCap
} from 'lucide-react';

export function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, appsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/applications?limit=5')
      ]);
      
      setStats(statsRes.data.data);
      setRecentApplications(appsRes.data.data.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Programmes',
      value: stats?.totalProgrammes || 0,
      icon: BookOpen,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
      link: '/admin/programmes',
      description: 'Active nursing programmes'
    },
    {
      name: 'Total Mandates',
      value: stats?.totalMandates || 0,
      icon: FileText,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      link: '/admin/mandates',
      description: 'Mandate documents'
    },
    {
      name: 'Gallery Items',
      value: stats?.totalGalleryItems || 0,
      icon: Image,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
      link: '/admin/gallery',
      description: 'Photos and videos'
    },
    {
      name: 'Dynamic Content',
      value: stats?.totalDynamicContent || 0,
      icon: Type,
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-50',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      link: '/admin/dynamic-content',
      description: 'Text content items'
    },
    {
      name: 'Admissions',
      value: '1',
      icon: GraduationCap,
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
      iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      link: '/admin/admissions',
      description: 'Admissions content'
    },
    {
      name: 'New Applications',
      value: stats?.pendingApplications || 0,
      icon: Mail,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-gradient-to-br from-orange-500 to-red-600',
      link: '/admin/applications',
      description: 'Pending inquiries',
      badge: stats?.pendingApplications > 0
    },
    {
      name: 'Total Applications',
      value: stats?.totalApplications || 0,
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      link: '/admin/applications',
      description: 'All contact submissions'
    },
    {
      name: 'Admin Users',
      value: stats?.totalUsers || 0,
      icon: Shield,
      color: 'from-slate-700 to-slate-900',
      bgColor: 'bg-slate-50',
      iconBg: 'bg-gradient-to-br from-slate-700 to-slate-900',
      link: '/admin/users',
      description: 'System administrators'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Premium Welcome Section */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">
              Welcome back, {user?.name || 'Administrator'}
            </h1>
            <p className="text-slate-600">Here's what's happening with your institution today.</p>
          </div>
          <div className="hidden lg:block">
            <div className="text-right">
              <p className="text-sm text-slate-500 mb-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-xs text-slate-400">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              to={stat.link}
              className="group relative bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-2">{stat.name}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`${stat.iconBg} p-3 rounded-lg relative`}>
                  <Icon className="w-5 h-5 text-white" />
                  {stat.badge && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">{stat.description}</p>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Recent Applications</h2>
                <p className="text-sm text-slate-600 mt-0.5">Latest contact form submissions</p>
              </div>
              <Link
                to="/admin/applications"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {recentApplications.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium">No applications yet</p>
                <p className="text-slate-500 text-sm mt-1">New submissions will appear here</p>
              </div>
            ) : (
              recentApplications.map((app) => (
                <div 
                  key={app._id} 
                  className="p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900 truncate">{app.name}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 truncate">{app.email}</p>
                      {app.subject && (
                        <p className="text-sm text-slate-500 mt-1 truncate">
                          <span className="font-medium">Subject:</span> {app.subject}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(app.createdAt).toLocaleDateString()} at {new Date(app.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <Link
                      to="/admin/applications"
                      className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              to="/admin/programmes"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Manage Programmes</p>
                <p className="text-xs text-slate-500">Add or edit courses</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              to="/admin/mandates"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Upload Mandates</p>
                <p className="text-xs text-slate-500">Add PDF documents</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              to="/admin/gallery"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Image className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Manage Gallery</p>
                <p className="text-xs text-slate-500">Add photos & videos</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              to="/admin/dynamic-content"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Type className="w-5 h-5 text-cyan-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Dynamic Content</p>
                <p className="text-xs text-slate-500">Manage text content</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              to="/admin/admissions"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Admissions</p>
                <p className="text-xs text-slate-500">Manage admissions page</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              to="/admin/applications"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">View Applications</p>
                <p className="text-xs text-slate-500">Check inquiries</p>
              </div>
              {stats?.pendingApplications > 0 && (
                <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-semibold rounded-full">
                  {stats.pendingApplications}
                </span>
              )}
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              to="/admin/users"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-slate-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Admin Users</p>
                <p className="text-xs text-slate-500">Manage accounts</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
