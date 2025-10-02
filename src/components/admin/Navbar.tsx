"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import MarkAttendanceModal from "./modals/MarkAttendanceModal";
import PremiumOptionsModal from "../modals/PremiumOptionsModal";
import { Crown } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
  premium?: boolean;
  submenu?: NavLink[];
}

export default function AdminNavbar() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

 const navLinks: NavLink[] = [
  { name: "Dashboard", href: "/dashboard", premium: false, submenu: [] },
  {
    name: "Leave Requests",
    href: "#",
    premium: false,
    submenu: [
      { name: "Pending Requests", href: "/admin/leave-requests/pending",premium: true },
      { name: "Approved Requests", href: "/admin/leave-requests/approved" ,premium: true},
    ],
  },
  {
    name: "Salary",
    href: "#",
    premium: false,
    submenu: [
      { name: "Salary List", href: "/admin/salary/list" ,premium: true},
      { name: "Add Salary", href: "/admin/salary/add" ,premium: true},
      { name: "Calculate Salary", href: "/admin/salary/calculate" ,premium: true},
      { name: "OT Salary", href: "/admin/salary/ot" ,premium: true},
      { name: "Incentives", href: "/admin/salary/incentives" ,premium: true},
    ],
  },
  {
    name: "Payroll",
    href: "#",
    premium: false,
    submenu: [
      { name: "Generate Payroll", href: "/admin/payroll/generate" ,premium: true},
      { name: "Payroll History", href: "/admin/payroll/history" ,premium: true},
      { name: "Deductions", href: "/admin/payroll/deductions" ,premium: true},
      { name: "Bonuses", href: "/admin/payroll/bonuses" ,premium: true},
    ],
  },
  {
    name: "Employees",
    href: "#",
    premium: false,
    submenu: [
      { name: "Employee List", href: "/employees" },
      { name: "Add Employee", href: "/employees/add" },
    ],
  },
  {
    name: "Reports",
    href: "#",
    premium: false,
    submenu: [
      { name: "Today Report", href: "/reports/today", premium: true },
      { name: "Monthly Report", href: "/reports/monthly", premium: true },
      { name: "Period Wise Report", href: "/reports/period" },
    ],
  },
];



  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleLinkClick = (link: NavLink, e?: React.MouseEvent) => {
    if (link.premium) {
      e?.preventDefault();
      setIsPremiumOpen(true);
    }
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">

          <div className="text-xl font-bold">Admin Panel</div>

    
          <div className="flex space-x-4 items-center relative" ref={dropdownRef}>
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.submenu && link.submenu.length > 0 ? (
                  <>
                    <button
                      onClick={() => handleDropdown(link.name)}
                      className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${
                        pathname.startsWith(link.href) ? "bg-blue-800" : ""
                      }`}
                    >
                      {link.name} ▾
                    </button>
                    {activeDropdown === link.name && (
                      <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-md shadow-lg z-50">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href || "#"}
                            className="flex justify-between block w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                            onClick={(e) => handleLinkClick(sub, e)}
                          >
                             <span>{sub.name}</span>
                             {" "}
                            {sub.premium && (
                              <Crown className="inline w-4 h-4 ml-2 text-yellow-500" />
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${
                      pathname === link.href ? "bg-blue-800" : ""
                    }`}
                  >
                    {link.name}
                    
                  </Link>
                )}
              </div>
            ))}

            {/* Logout */}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-red-500 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Logout
            </button>

            {/* Mark Attendance */}
            <button
              onClick={() => setIsAttendanceOpen(true)}
              className="px-4 py-2 rounded-md text-sm font-medium bg-green-500 hover:bg-green-600 animate-pulse shadow-lg transition-all duration-300 hover:scale-105"
            >
              Mark Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isAttendanceOpen && (
        <MarkAttendanceModal onClose={() => setIsAttendanceOpen(false)} />
      )}
      {isPremiumOpen && (
        <PremiumOptionsModal onClose={() => setIsPremiumOpen(false)} />
      )}
    </nav>
  );
}
