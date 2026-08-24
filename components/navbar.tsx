"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRole } from "@/lib/context/role-context";
import { UserRole } from "@/lib/types";
import { MOCK_USERS } from "@/lib/mock-data/seed-data";
import {
  Sprout,
  TrendingUp,
  Scale,
  ShoppingBag,
  Bot,
  Bell,
  CheckCircle2,
  ChevronDown,
  User,
  ShieldCheck,
  Truck,
  Building2,
  Users2,
  Sparkles,
  Menu,
  X,
  LogOut,
  LogIn,
  UserPlus,
  ArrowRight
} from "lucide-react";
import { notificationService } from "@/lib/services/notification-service";

const ROLE_META: Record<UserRole, { label: string; icon: any; color: string; href: string }> = {
  FARMER: { label: "Farmer", icon: Sprout, color: "text-emerald-700 bg-emerald-50 border-emerald-300", href: "/farmer/dashboard" },
  BUYER: { label: "Buyer", icon: Building2, color: "text-blue-700 bg-blue-50 border-blue-300", href: "/buyer/marketplace" },
  TRANSPORTER: { label: "Transporter", icon: Truck, color: "text-amber-700 bg-amber-50 border-amber-300", href: "/transporter/dashboard" },
  FPO: { label: "FPO / Co-op", icon: Users2, color: "text-purple-700 bg-purple-50 border-purple-300", href: "/fpo/dashboard" },
  ADMIN: { label: "Admin", icon: ShieldCheck, color: "text-slate-800 bg-slate-100 border-slate-300", href: "/admin/dashboard" }
};

interface NavbarProps {
  onOpenAiAssistant?: () => void;
}

export function Navbar({ onOpenAiAssistant }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, currentRole, currentUser, setRole, logout, unreadNotificationsCount, refreshNotifications } = useRole();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifications = notificationService.getForRole(currentRole);

  const navLinks = [
    { label: "Market Prices", href: "/market-prices", icon: TrendingUp },
    { label: "Smart Compare", href: "/compare", icon: Scale, badge: "Net Realizer" },
    { label: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  ];

  if (isAuthenticated) {
    navLinks.push({
      label: `${ROLE_META[currentRole].label} Portal`,
      href: ROLE_META[currentRole].href,
      icon: ROLE_META[currentRole].icon,
      badge: ""
    });
  }

  const handleRoleSwitch = (role: UserRole) => {
    setRole(role);
    setShowProfileMenu(false);
    // Always navigate directly to the target role's workspace dashboard!
    router.push(ROLE_META[role].href);
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    router.push("/");
  };

  const handleMarkAllRead = () => {
    notificationService.markAllAsRead(currentRole);
    refreshNotifications();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Agri<span className="text-emerald-600">Link</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Market Intelligence & Smart Selling
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all relative ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/60 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold shadow-xs tracking-tight">
                    <Sparkles className="w-2.5 h-2.5 text-emerald-200" />
                    <span>{link.badge}</span>
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Tools: AI Assistant, Notifications, Profile / Login */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Advisor Button */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold shadow-xs hover:shadow-md hover:from-emerald-700 hover:to-teal-700 transition-all active:scale-95"
            title="Open AI Market Advisor"
          >
            <Bot className="w-4 h-4 text-emerald-200" />
            <span className="hidden sm:inline">AI Advisor</span>
            <Sparkles className="w-3 h-3 text-amber-300" />
          </button>

          {/* Notifications Dropdown (when authenticated) */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 p-4 animate-in zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-emerald-600" />
                      <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                        {currentRole}
                      </span>
                    </div>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-500">
                        No notifications for {currentRole}
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`py-2.5 px-2 rounded-lg text-left transition-colors ${
                            n.isRead ? "opacity-75" : "bg-emerald-50/50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                            <span className="text-[10px] text-slate-400 shrink-0">{n.createdAt}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                          {n.actionUrl && (
                            <Link
                              href={n.actionUrl}
                              onClick={() => setShowNotifications(false)}
                              className="inline-block text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 mt-1"
                            >
                              View details →
                            </Link>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile Menu Trigger (Authenticated) OR Sign In / Register (Logged Out) */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full border border-slate-200 hover:border-emerald-500 hover:shadow-xs bg-slate-50 hover:bg-white transition-all group"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden border border-emerald-500 shadow-2xs relative shrink-0">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-left hidden lg:block max-w-[120px]">
                  <p className="font-bold text-xs text-slate-900 truncate leading-tight">{currentUser.name.split(" ")[0]}</p>
                  <p className="text-[10px] font-semibold text-emerald-700 leading-none truncate">
                    {ROLE_META[currentRole].label}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </button>

              {/* Rich User Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 p-4 space-y-4 animate-in zoom-in-95">
                  {/* User Profile Header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-12 h-12 rounded-xl object-cover border border-emerald-500 shadow-2xs"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-sm text-slate-900 truncate">{currentUser.name}</h4>
                        <span title="KYC Verified">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1 ${ROLE_META[currentRole].color}`}>
                        {ROLE_META[currentRole].label} Account
                      </span>
                    </div>
                  </div>

                  {/* Direct Dashboard Link */}
                  <Link
                    href={ROLE_META[currentRole].href}
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-between transition-colors border border-emerald-200"
                  >
                    <span>Open {ROLE_META[currentRole].label} Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                  </Link>

                  {/* Switch Account / Role Section */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                      Switch Role / Account
                    </p>
                    <div className="grid grid-cols-1 gap-1">
                      {(["FARMER", "BUYER", "TRANSPORTER", "FPO", "ADMIN"] as UserRole[]).map((role) => {
                        const meta = ROLE_META[role];
                        const Icon = meta.icon;
                        const isSelected = currentRole === role;
                        const roleUser = MOCK_USERS[role];

                        return (
                          <button
                            key={role}
                            onClick={() => handleRoleSwitch(role)}
                            className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                              isSelected
                                ? "bg-emerald-50 font-bold border border-emerald-300"
                                : "hover:bg-slate-50 text-slate-700 border border-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={roleUser.avatar}
                                alt={roleUser.name}
                                className="w-7 h-7 rounded-lg object-cover border shrink-0"
                              />
                              <div className="truncate">
                                <p className="text-xs font-semibold text-slate-900 truncate">{roleUser.name}</p>
                                <p className="text-[10px] text-slate-500">{meta.label}</p>
                              </div>
                            </div>
                            {isSelected && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                                Active
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer Log Out Action */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/auth/login"
                      onClick={() => setShowProfileMenu(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                    >
                      Manage Accounts
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4 text-emerald-600" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95 flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive ? "bg-emerald-50 text-emerald-800 font-bold" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-emerald-600" />
                  <span>{link.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
