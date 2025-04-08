import React, { useState, useEffect } from "react";
import { Search, Bell, Settings, User, ChevronDown, Menu, LogOut, X } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { assets } from "@/lib/assets";
import { ADMIN_USER } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  toggleSidebar: () => void;
}

// Notification interface
interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'New lead added',
      description: 'A new lead from TechGiant Inc. has been added to your pipeline.',
      time: '5 min ago',
      isRead: false,
      type: 'info'
    },
    {
      id: '2',
      title: 'Meeting reminder',
      description: 'You have a meeting with the sales team in 30 minutes.',
      time: '25 min ago',
      isRead: false,
      type: 'warning'
    },
    {
      id: '3',
      title: 'Task completed',
      description: 'Sarah completed the "Quarterly Review" task.',
      time: '1 hour ago',
      isRead: true,
      type: 'success'
    },
    {
      id: '4',
      title: 'System update',
      description: 'CRM system will be updated tonight at 2:00 AM.',
      time: '3 hours ago',
      isRead: true,
      type: 'info'
    }
  ]);

  // Get the count of unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Function to handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast({
        title: "Search Results",
        description: `Searching for "${searchQuery}"`,
      });
    }
  };

  // Function to mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast({
      title: "Notifications Updated",
      description: "All notifications marked as read",
    });
  };

  // Function to clear notifications
  const clearNotifications = () => {
    setNotifications([]);
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been cleared",
    });
  };

  // Function to handle logout
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    setLocation('/auth');
  };

  // Function to get notification icon color
  const getNotificationIconColor = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-amber-500';
      case 'error': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="relative w-full max-w-xs mx-4 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-3 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[340px] sm:w-[400px]">
              <SheetHeader className="mb-4">
                <SheetTitle className="text-left">Notifications</SheetTitle>
                <div className="flex justify-between mt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    Mark all as read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearNotifications}
                    disabled={notifications.length === 0}
                  >
                    Clear all
                  </Button>
                </div>
              </SheetHeader>
              
              {notifications.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <Bell className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[calc(100vh-150px)] overflow-y-auto pr-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${
                        notification.isRead ? 'bg-white' : 'bg-blue-50 border-blue-200'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className={`font-medium ${notification.isRead ? 'text-gray-900' : 'text-blue-800'}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </SheetContent>
          </Sheet>
          
          {/* Settings */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setLocation('/settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <img 
                  src={assets.profile.admin} 
                  alt={`${ADMIN_USER.name} profile`} 
                  className="h-8 w-8 rounded-full object-cover" 
                />
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                  {ADMIN_USER.name}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400 hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLocation('/settings?tab=profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
