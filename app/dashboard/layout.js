"use client";

import DashboardSidebar from "../../components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="min-h-screen flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
