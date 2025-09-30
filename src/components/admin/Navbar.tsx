"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Leave Requests", href: "/admin/leave-requests" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-xl font-bold">Admin Panel</div>

          {/* Nav Items */}
          <div className="flex space-x-4 items-center relative">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === link.href ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Employees Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsEmployeeOpen(!isEmployeeOpen);
                  setIsReportsOpen(false);
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${
                  pathname.startsWith("/admin/employees") ? "bg-blue-800" : ""
                }`}
              >
                Employees ▾
              </button>
              {isEmployeeOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                  <Link
                    href="/admin/employees"
                    className="block px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={() => setIsEmployeeOpen(false)}
                  >
                    Employee List
                  </Link>
                  <Link
                    href="/admin/employees/add"
                    className="block px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={() => setIsEmployeeOpen(false)}
                  >
                    Add Employee
                  </Link>
                </div>
              )}
            </div>

            {/* Reports Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsReportsOpen(!isReportsOpen);
                  setIsEmployeeOpen(false);
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${
                  pathname.startsWith("/admin/reports") ? "bg-blue-800" : ""
                }`}
              >
                Reports ▾
              </button>
              {isReportsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-md shadow-lg z-50">
                  <Link
                    href="/admin/reports/today"
                    className="block px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={() => setIsReportsOpen(false)}
                  >
                    Today Report
                  </Link>
                  <Link
                    href="/admin/reports/monthly"
                    className="block px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={() => setIsReportsOpen(false)}
                  >
                    Monthly Report
                  </Link>
                  <Link
                    href="/admin/reports/period"
                    className="block px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={() => setIsReportsOpen(false)}
                  >
                    Period Wise Report
                  </Link>
                </div>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
