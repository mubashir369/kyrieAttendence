"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Lock, User } from "lucide-react";

export default function EmployeeNavbar() {
  // Dummy employee data for now
  const employee = {
    name: "Muhammed Mubashir",
    employeeId: "EMP-002",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Logout function
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" }); // Redirect to login page after logout
  };

  // Reset password modal submit
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("/api/employee/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: employee.employeeId, password: newPassword }),
      });

      if (!res.ok) throw new Error("Failed to reset password");

      alert("Password updated successfully!");
      setIsModalOpen(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

    const { data: session } = useSession();
  

  return (
    <>
      <nav className="w-full bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
        {/* Left side: Employee Info */}
        <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
          <User className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-sm font-semibold">{session?.user?.name}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              EMAIL: {session?.user?.email}
            </p>
          </div>
        </div>

        {/* Right side: Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={true}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            <Lock className="w-4 h-4" />
            Reset Password
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      {/* Reset Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Reset Password
            </h2>

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
