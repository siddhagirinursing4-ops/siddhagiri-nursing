import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProgramsPage } from "./pages/ProgramsPage";
import { BscNursingPage } from "./pages/BscNursingPage";
import { GnmPage } from "./pages/GnmPage";
import { PbbscNursingPage } from "./pages/PbbscNursingPage";
import { MscNursingPage } from "./pages/MscNursingPage";
import { FacilitiesPage } from "./pages/FacilitiesPage";
import { AdmissionsPage } from "./pages/AdmissionPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ContactPage } from "./pages/ContactPage";
import { MandatesPage } from "./pages/MandatesPage";
import { LoginPage } from "./pages/admin/LoginPage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { GalleryManagementPage } from "./pages/admin/GalleryManagementPage";
import { MandateManagementPage } from "./pages/admin/MandateManagementPage";
import { ProgrammeManagementPage } from "./pages/admin/ProgrammeManagementPage";
import { DynamicContentPage } from "./pages/admin/DynamicContentPage";
import { ApplicationsPage } from "./pages/admin/ApplicationsPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdmissionsManagementPage } from "./pages/admin/AdmissionsManagementPage";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { useAuthStore } from "./store/authStore";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // Initialize auth on app mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="programs/bsc-nursing" element={<BscNursingPage />} />
          <Route path="programs/gnm" element={<GnmPage />} />
          <Route path="programs/pbbsc-nursing" element={<PbbscNursingPage />} />
          <Route path="programs/msc-nursing" element={<MscNursingPage />} />
          <Route path="facilities" element={<FacilitiesPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="mandates" element={<MandatesPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/gallery" element={<GalleryManagementPage />} />
          <Route path="/admin/mandates" element={<MandateManagementPage />} />
          <Route path="/admin/programmes" element={<ProgrammeManagementPage />} />
          <Route path="/admin/dynamic-content" element={<DynamicContentPage />} />
          <Route path="/admin/applications" element={<ApplicationsPage />} />
          <Route path="/admin/admissions" element={<AdmissionsManagementPage />} />
        </Route>
        
        {/* Superadmin Only Routes */}
        <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
    </>
  );
}
