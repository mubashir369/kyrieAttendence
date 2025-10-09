"use client";

import {  useState } from "react";
import { FiMenu } from "react-icons/fi";

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Employees", href: "/admin/employees" },
    { name: "Leave Requests", href: "/admin/leave-requests" },
    { name: "Reports", href: "/admin/reports" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-blue-700 to-blue-500 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:bg-blue-600 px-4 py-2 rounded transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        {/* Top navbar with menu icon */}
        <div className="flex items-center justify-between bg-blue-600 text-white p-4 shadow-md">
          <h2 className="font-bold text-xl">Admin Panel</h2>
          <button onClick={() => setMobileSidebarOpen(true)}>
            <FiMenu size={28} />
          </button>
        </div>

        {/* Sidebar overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Sidebar container */}
            <div className="w-1/2 bg-gradient-to-b from-blue-700 to-blue-500 text-white p-6 animate-slide-in shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-xl">Menu</h2>
                <button
                  className="text-2xl"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  ✕
                </button>
              </div>
              <nav className="flex flex-col space-y-4">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg hover:bg-blue-600 px-3 py-2 rounded transition-colors duration-300"
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Overlay to close sidebar */}
            <div
              className="flex-1 bg-black bg-opacity-30"
              onClick={() => setMobileSidebarOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
