import React, { createContext, useContext, useState } from "react";
import { NotificationType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

interface NotificationContextType {
  notifications: NotificationType[];
  addNotification: (notification: Omit<NotificationType, "id">) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { toast } = useToast();

  const addNotification = (notification: Omit<NotificationType, "id">) => {
    const id = uuidv4();
    const newNotification = { ...notification, id };
    
    setNotifications((prev) => [...prev, newNotification]);
    
    // Also show toast
    toast({
      title: notification.message,
      description: notification.description,
      variant: notification.type === "error" ? "destructive" : "default",
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
