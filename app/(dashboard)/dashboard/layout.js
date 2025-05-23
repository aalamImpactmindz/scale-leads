"use client";
import DHeader from "@/dComponents/d-header/DHeader";
import DSidebar from "@/dComponents/d-sidebar/DSidebar";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className={`d-wrapper ${isSidebarOpen ? "" : "hide"}`}>
      <DSidebar />
      <DHeader onToggle={handleToggle} />
      <main className="p-4">{children}</main>
    </div>
  );
}
