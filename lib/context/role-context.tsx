"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole } from "../types";
import { MOCK_USERS, UserProfile } from "../mock-data/seed-data";
import { notificationService } from "../services/notification-service";

interface RoleContextType {
  isAuthenticated: boolean;
  currentRole: UserRole;
  currentUser: UserProfile;
  login: (role: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  unreadNotificationsCount: number;
  refreshNotifications: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentRole, setCurrentRole] = useState<UserRole>("FARMER");
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    // Check saved auth & role preference
    const savedAuth = localStorage.getItem("agrilink_auth");
    if (savedAuth !== null) {
      setIsAuthenticated(savedAuth === "true");
    }

    const savedRole = localStorage.getItem("agrilink_role") as UserRole;
    if (savedRole && MOCK_USERS[savedRole]) {
      setCurrentRole(savedRole);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setUnreadCount(notificationService.getUnreadCount(currentRole));
    } else {
      setUnreadCount(0);
    }
  }, [currentRole, isAuthenticated]);

  const login = (role: UserRole) => {
    setIsAuthenticated(true);
    setCurrentRole(role);
    localStorage.setItem("agrilink_auth", "true");
    localStorage.setItem("agrilink_role", role);
    setUnreadCount(notificationService.getUnreadCount(role));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("agrilink_auth", "false");
  };

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
    localStorage.setItem("agrilink_auth", "true");
    localStorage.setItem("agrilink_role", role);
    setUnreadCount(notificationService.getUnreadCount(role));
  };

  const refreshNotifications = () => {
    if (isAuthenticated) {
      setUnreadCount(notificationService.getUnreadCount(currentRole));
    }
  };

  const currentUser = MOCK_USERS[currentRole] || MOCK_USERS.FARMER;

  return (
    <RoleContext.Provider
      value={{
        isAuthenticated,
        currentRole,
        currentUser,
        login,
        logout,
        setRole,
        unreadNotificationsCount: unreadCount,
        refreshNotifications,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
