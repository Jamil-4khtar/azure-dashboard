"use client";

import {
  HiOutlineDocument,
  HiOutlineUsers,
  HiOutlinePhotograph,
  HiOutlineEye,
  HiOutlineClock,
} from "react-icons/hi";
import { useAuth } from "@/features/Auth/components/AuthGuard";
import StatsCard from "./component/StatsCard";
import QuickActions from "./component/QuickActions";
import RecentPages from "./component/RecentPages";
import RecentActivity from "./component/RecentActivity";
import SystemStatus from "./component/SystemStatus";
import DashboardHeader from "../../components/layout/DashboardHeader";

export default function AdminPage() {
  const { user } = useAuth();

  // Placeholder data - replace with API calls later
  const dashboardStats = [
    {
      title: "Total Pages",
      value: "24",
      change: "+3",
      changeType: "positive",
      icon: HiOutlineDocument,
      color: "blue",
    },
    {
      title: "Active Users",
      value: "8",
      change: "+2",
      changeType: "positive",
      icon: HiOutlineUsers,
      color: "green",
    },
    {
      title: "Media Files",
      value: "156",
      change: "+12",
      changeType: "positive",
      icon: HiOutlinePhotograph,
      color: "purple",
    },
    {
      title: "Page Views",
      value: "2.4k",
      change: "+18%",
      changeType: "positive",
      icon: HiOutlineEye,
      color: "orange",
    },
  ];

  const quickActions = [
    {
      title: "Create New Page",
      description: "Add a new page to your site",
      href: "/admin/pages/new",
      icon: HiOutlineDocument,
      color: "blue",
    },
    {
      title: "Upload Media",
      description: "Add images, videos, or documents",
      href: "/admin/media/upload",
      icon: HiOutlinePhotograph,
      color: "purple",
    },
    {
      title: "Invite User",
      description: "Add a new team member",
      href: "/admin/users?action=invite",
      icon: HiOutlineUsers,
      color: "green",
    },
    {
      title: "Site Settings",
      description: "Configure your website",
      href: "/admin/settings",
      icon: HiOutlineClock,
      color: "gray",
    },
  ];

  const recentPages = [
    {
      id: 1,
      title: "About Us",
      slug: "/about",
      status: "published",
      lastModified: "2 hours ago",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Contact Page",
      slug: "/contact",
      status: "draft",
      lastModified: "1 day ago",
      author: "Jane Smith",
    },
    {
      id: 3,
      title: "Services Overview",
      slug: "/services",
      status: "published",
      lastModified: "3 days ago",
      author: "Mike Johnson",
    },
    {
      id: 4,
      title: "Privacy Policy",
      slug: "/privacy",
      status: "published",
      lastModified: "1 week ago",
      author: "Admin",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "page_created",
      message: "New page 'Contact' was created",
      user: "Jane Smith",
      timestamp: "2 hours ago",
      icon: HiOutlineDocument,
    },
    {
      id: 2,
      type: "user_invited",
      message: "Invited new user john@example.com",
      user: "Admin",
      timestamp: "5 hours ago",
      icon: HiOutlineUsers,
    },
    {
      id: 3,
      type: "media_uploaded",
      message: "Uploaded 3 new images to gallery",
      user: "Mike Johnson",
      timestamp: "1 day ago",
      icon: HiOutlinePhotograph,
    },
    {
      id: 4,
      type: "page_updated",
      message: "Updated 'About Us' page content",
      user: "John Doe",
      timestamp: "2 days ago",
      icon: HiOutlineDocument,
    },
  ];

  const systemStatus = [
    {
      name: "Backend API",
      status: "healthy",
      responseTime: "120ms",
    },
    {
      name: "Database",
      status: "healthy",
      responseTime: "45ms",
    },
    {
      name: "Media Storage",
      status: "healthy",
      responseTime: "89ms",
    },
    {
      name: "Email Service",
      status: "warning",
      responseTime: "340ms",
    },
  ];

  return (
    <div
      className="min-h-screen"
      // style={{ backgroundColor: 'var(--bg)' }}
    >
      <DashboardHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Welcome Section */}
        <div className="mb-6 md:mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: "var(--text)" }}
          >
            Welcome back, {user?.name?.split(" ")[0] || "Admin"}! 👋
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            Here's what's happening with your website today.
          </p>
        </div>

        {/* Rest of the components remain the same */}
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {dashboardStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="lg:col-span-1">
            <QuickActions actions={quickActions} />
          </div>
          <div className="lg:col-span-2">
            <RecentPages pages={recentPages} />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <RecentActivity activities={recentActivities} />
          <SystemStatus services={systemStatus} />
        </div>
      </main>
    </div>
  );
}
