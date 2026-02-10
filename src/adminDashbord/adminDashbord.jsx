import { useState } from "react";
import { Navbar } from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sidebar width for desktop (UNCHANGED LOGIC)
  const sidebarWidth = collapsed ? 56 : 180;
  const navbarHeight = 56;

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 text-slate-800">

      {/* ================= NAVBAR ================= */}
      <div
        className="
          fixed top-0 z-50 h-14
          w-full left-0
          transition-all duration-300
          md:left-[var(--sidebar-width)]
          md:w-[calc(100%-var(--sidebar-width))]
          backdrop-blur-xl bg-white/70
          border-b border-slate-200
          shadow-sm
        "
        style={{ "--sidebar-width": `${sidebarWidth}px` }}
      >
        <Navbar onMenuClick={() => setMobileSidebarOpen(true)} />
      </div>

      {/* ================= SIDEBAR ================= */}
      <div
        className={`
          fixed top-0 left-0 z-50
          h-screen
          bg-white
          border-r border-slate-200
          shadow-lg
          transition-all duration-300 ease-in-out
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        style={{ width: `${sidebarWidth}px` }}
      >
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          closeMobile={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div
        className="
          pt-14 transition-all duration-300
          md:ml-[var(--sidebar-width)]
        "
        style={{ "--sidebar-width": `${sidebarWidth}px` }}
      >
        <main className="min-h-screen p-4 sm:p-6 lg:p-8">
          <div
            className="
              min-h-[calc(100vh-3.5rem)]
              rounded-2xl
              bg-white
              shadow-md
              border border-slate-200
              p-4 sm:p-6
            "
          >
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}
