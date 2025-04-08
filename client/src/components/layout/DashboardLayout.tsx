import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
      <Sidebar open={sidebarOpen || !isMobile} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex-grow p-4 md:p-6">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default DashboardLayout;
