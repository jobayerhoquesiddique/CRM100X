import React from "react";
import { useLocation, Link } from "wouter";
import { SidebarItem } from "@/types";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  X,
  Zap,
  CalendarClock,
  PanelsTopLeft,
  Mail,
  FileText,
  Bot,
  Cable,
  TriangleAlert
} from "lucide-react";
import { assets } from "@/lib/assets";
import { NAVIGATION, ADMIN_USER, APP_INFO } from "@/lib/constants";

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const sidebarItems: SidebarItem[] = NAVIGATION.main;

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  const [location] = useLocation();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "dashboard":
        return <LayoutDashboard className="w-5 h-5" />;
      case "users":
        return <Users className="w-5 h-5" />;
      case "chart":
        return <BarChart3 className="w-5 h-5" />;
      case "settings":
        return <Settings className="w-5 h-5" />;
      case "bell":
        return <Bell className="w-5 h-5" />;
      case "calendar":
        return <CalendarClock className="w-5 h-5" />;
      case "pipeline":
        return <PanelsTopLeft className="w-5 h-5" />;
      case "mail":
        return <Mail className="w-5 h-5" />;
      case "file":
        return <FileText className="w-5 h-5" />;
      case "bot":
        return <Bot className="w-5 h-5" />;
      case "plugs":
        return <Cable className="w-5 h-5" />;
      case "alert":
        return <TriangleAlert className="w-5 h-5" />;
      default:
        return <LayoutDashboard className="w-5 h-5" />;
    }
  };

  return (
    <aside 
      className={`bg-slate-800 text-white w-full md:w-64 md:fixed md:h-full transition-all duration-300 z-10 
        ${open ? "block" : "hidden md:block"}`}
    >
      <div className="p-4 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-blue-500" />
          <h1 className="font-bold text-lg">{APP_INFO.name}</h1>
        </div>
        <button 
          className="md:hidden text-gray-300 hover:text-white" 
          onClick={toggleSidebar}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="py-4">
        <div className="px-4 mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src={assets.profile.admin} 
              alt={`${ADMIN_USER.name} profile`} 
              className="h-8 w-8 rounded-full object-cover" 
            />
            <div>
              <p className="text-sm font-medium">{ADMIN_USER.name}</p>
              <p className="text-xs text-gray-400">{ADMIN_USER.role}</p>
            </div>
          </div>
        </div>
        
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.path}
                className={`flex items-center px-4 py-2 text-gray-300 hover:bg-slate-700 ${
                  location === item.path ? "bg-slate-700" : ""
                }`}
              >
                <div className="w-5 mr-3">
                  {getIcon(item.icon)}
                </div>
                <span>{item.name}</span>
                {item.badge && (
                  <span className="ml-auto bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
