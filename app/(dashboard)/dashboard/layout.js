"use client";
import DHeader from "@/dComponents/d-header/DHeader";
import DSidebar from "@/dComponents/d-sidebar/DSidebar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className={`d-wrapper ${isSidebarOpen ? "" : "hide"}`}>
    <ToastContainer toastStyle={{ width: '430px' }} />
      <DSidebar />
      <DHeader onToggle={handleToggle} />
      <main className="p-4">{children}</main>
    </div>
  );
}
