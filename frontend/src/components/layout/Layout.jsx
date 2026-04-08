import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { BannerPopup } from "./BannerPopup";

export function Layout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BannerPopup />
    </div>
  );
}
